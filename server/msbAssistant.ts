import { invokeLLM, listLLMModels, type MessageContent, type TextContent } from "./_core/llm";

export type AssistantHistoryItem = { role: "user" | "assistant"; content: string };
export type SalesStage = "discover" | "analyze" | "qualify" | "close";
export type SalesAssistantReply = { answer: string; stage: SalesStage; handoffToWhatsApp: boolean };

const genericFallback = "تمام، خلّيني أفهم احتياجك أكتر. إيه هدفك الأساسي من الخدمة؟";

const businessKnowledge = `
أنت خبير مبيعات واستشارات في MSB Media، وكالة عربية تستخدم صيغة «نحن» و«فريق خبرائنا».

معلومات الوكالة المعتمدة:
- الخدمات: فيديوهات UGC بالذكاء الاصطناعي؛ تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية؛ اعلانات ممولة فيسبوك & انستجرام؛ اشتراك Gemini PRO؛ Veo 3؛ Google flow؛ Nano 🍌؛ مونتاج و تنقية الصوت وإزالة الضوضاء و ترجمة للفيديوهات.
- سعر اشتراك Gemini PRO مع أدوات الذكاء الاصطناعي المعروضة هو 300 جنيه شهرياً.
- طرق الدفع: Vodafone Cash إلى 01105697412 أو 01092794169، وBinance Pay ID 454798991. رفع الإيصال متاح من صفحة طرق الدفع، ويلزم رقم هاتف لتأكيد تحويل Binance Pay.
- الدعم: يمكن فتح طلب دعم من صفحة الدعم الفني، مع مسار بريد مباشر إلى mohamedsayedmsb1999@gmail.com.

منهج خبير المبيعات:
1. مرحلة الاستماع (discover): ابدأ بفهم النشاط والهدف أو المشكلة. اعترف بما قاله العميل، ثم اسأل سؤال تأهيل واحد فقط.
2. مرحلة التحليل (analyze): اربط ما قاله العميل بخدمة أو مسار مناسب من خدماتنا. اشرح السبب ببساطة، ولا تدّعِ نتائج مضمونة.
3. مرحلة التأهيل (qualify): ثبّت المعلومة الناقصة الأهم: المنصة، الجمهور، نوع المخرج المطلوب، أو توقيت البدء. لخّص ما فهمته عندما تتوفر معلومات كافية.
4. مرحلة الإغلاق (close): لا تعرض التحويل إلى واتساب إلا بعد أن يوضح العميل هدفه وخدمته المناسبة ويبدو جاهزاً للبدء، أو عندما يطلب عرضاً/سعراً/بدءاً/دفعاً. وقتها لخّص الاحتياج في سطر وادعُه بلطف لاستخدام زر «ابدأ محادثة واتساب مع الفريق».

قواعد الرد:
1. افهم لغة العميل وأجب باللغة نفسها. عند العربية استخدم المصرية البسيطة باحتراف، مثل: «تمام، نقدر نساعدك» من دون مبالغة أو ضغط.
2. كن موجزاً: من 2 إلى 5 جمل غالباً. اسأل سؤالاً واحداً في كل دور، ولا تستجوب العميل أو تكرر سؤالاً أجاب عنه.
3. لا تخترع أسعاراً أو عروضاً أو نتائج أو مراجعات أو مدد تنفيذ غير موجودة في المعرفة أعلاه.
4. لا تطلب كلمات مرور أو بطاقات أو أكواد تحقق أو بيانات حساسة. لا تقدم نصائح قانونية أو طبية أو مالية متخصصة.
5. إذا كان السؤال خارج خدمات الوكالة، وضّح بلطف أن نطاقك هو MSB Media ثم أعد توجيه العميل إلى خدمة مناسبة.
6. اجعل handoffToWhatsApp=false في مراحل discover/analyze/qualify، واجعله true فقط في مرحلة close.
`;

export function buildAssistantPrompt(): string { return businessKnowledge.trim(); }

function toText(content: MessageContent | MessageContent[]): string {
  if (typeof content === "string") return content;
  const parts = Array.isArray(content) ? content : [content];
  return parts.filter((part): part is TextContent => typeof part !== "string" && part.type === "text").map(part => part.text).join("\n").trim();
}

export function parseSalesAssistantReply(content: string): SalesAssistantReply {
  const fallback: SalesAssistantReply = { answer: genericFallback, stage: "discover", handoffToWhatsApp: false };
  const cleanContent = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try {
    const candidate = JSON.parse(cleanContent) as Partial<SalesAssistantReply>;
    const stages: SalesStage[] = ["discover", "analyze", "qualify", "close"];
    if (!candidate.answer || typeof candidate.answer !== "string" || !stages.includes(candidate.stage as SalesStage)) return fallback;
    const stage = candidate.stage as SalesStage;
    return { answer: candidate.answer.trim().slice(0, 1800), stage, handoffToWhatsApp: stage === "close" && candidate.handoffToWhatsApp === true };
  } catch { return fallback; }
}

function fallbackSalesReply(history: AssistantHistoryItem[]): SalesAssistantReply {
  const userMessages = history.filter(item => item.role === "user");
  const latest = userMessages.at(-1)?.content ?? "";
  const normalized = latest.toLowerCase();
  const Arabic = /[\u0600-\u06ff]/.test(latest);
  const French = /\b(bonjour|je |besoin|site|prix|commencer)\b/i.test(latest);
  const ready = /(جاهز|ابدأ|سعر|عرض|دفع|اتفاق|ready|start|price|quote|payment|commencer|prix)/i.test(normalized) && userMessages.length >= 2;
  const stage: SalesStage = ready ? "close" : userMessages.length <= 1 ? "discover" : userMessages.length === 2 ? "analyze" : "qualify";
  if (Arabic) {
    if (stage === "discover") return { answer: "تمام، نقدر نساعدك. إيه هدفك الأساسي من الخدمة: مبيعات، انتشار، ولا تجهيز منصة أو محتوى؟", stage, handoffToWhatsApp: false };
    if (stage === "analyze") return { answer: "من كلامك، نقدر نرتب لك مسار مناسب من خدماتنا بدل حلول متفرقة. عشان أوصّيك صح: هتستخدم الخدمة على أي منصة أو قناة؟", stage, handoffToWhatsApp: false };
    if (stage === "qualify") return { answer: "كويس، كده الصورة بدأت توضح. آخر نقطة محتاجين نعرفها: تحب تبدأ إمتى أو إيه المخرج الأساسي اللي محتاجه؟", stage, handoffToWhatsApp: false };
    return { answer: "تمام، بناءً على هدفك نقدر نكمل معاك التفاصيل ونرتب الخطوة المناسبة. اضغط زر واتساب علشان فريقنا يجهز لك المسار المناسب.", stage, handoffToWhatsApp: true };
  }
  if (French) {
    if (stage === "discover") return { answer: "Très bien, nous pouvons vous aider. Quel est votre objectif principal : ventes, visibilité ou lancement d'une plateforme ?", stage, handoffToWhatsApp: false };
    if (stage === "analyze") return { answer: "D'après votre besoin, nous pouvons vous orienter vers un parcours adapté. Sur quelle plateforme souhaitez-vous vous concentrer ?", stage, handoffToWhatsApp: false };
    if (stage === "qualify") return { answer: "Parfait, nous avons une image plus claire. Quand souhaitez-vous commencer ?", stage, handoffToWhatsApp: false };
    return { answer: "Votre besoin est clair. Utilisez le bouton WhatsApp pour que notre équipe prépare la prochaine étape avec vous.", stage, handoffToWhatsApp: true };
  }
  if (stage === "discover") return { answer: "Great, we can help. What is your main goal: sales, visibility, or launching a platform?", stage, handoffToWhatsApp: false };
  if (stage === "analyze") return { answer: "Based on what you shared, we can guide you toward a suitable MSB Media path. Which platform or channel matters most to you?", stage, handoffToWhatsApp: false };
  if (stage === "qualify") return { answer: "That gives us a clearer picture. When would you like to start, or what is the main deliverable you need?", stage, handoffToWhatsApp: false };
  return { answer: "Your requirements are clear. Use the WhatsApp button so our team can prepare the next step with you.", stage, handoffToWhatsApp: true };
}

export async function answerMSBConsultation(history: AssistantHistoryItem[]): Promise<SalesAssistantReply> {
  const safeHistory = history.slice(-10).map(item => ({ role: item.role, content: item.content.trim().slice(0, 1200) }));
  const models = await listLLMModels();
  const selectedModel = models.data.find(model => model.id === "claude-haiku-4-5")?.id
    ?? models.data.find(model => model.id === "gpt-5-mini")?.id
    ?? models.data[0]?.id;
  const response = await invokeLLM({
    model: selectedModel,
    maxTokens: 800,
    messages: [{ role: "system", content: buildAssistantPrompt() }, ...safeHistory],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "msb_sales_reply",
        strict: true,
        schema: {
          type: "object",
          properties: {
            answer: { type: "string" },
            stage: { type: "string", enum: ["discover", "analyze", "qualify", "close"] },
            handoffToWhatsApp: { type: "boolean" },
          },
          required: ["answer", "stage", "handoffToWhatsApp"],
          additionalProperties: false,
        },
      },
    },
  });
  const parsed = parseSalesAssistantReply(toText(response.choices[0]?.message.content ?? ""));
  return parsed.answer === genericFallback ? fallbackSalesReply(safeHistory) : parsed;
}
