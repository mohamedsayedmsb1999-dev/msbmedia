import SiteShell from "@/components/SiteShell";
import AiVideoEnhancements from "./AiVideoEnhancements";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Check, ChevronLeft, CirclePlay, Clock3, ImagePlus, LockKeyhole, Music2, RefreshCcw, Sparkles, UserRound, Video, X } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { openWhatsApp } from "@/lib/site-data";
import { hasCustomerSession } from "@/lib/msbDataApi";

type Locale = "ar" | "en";
type Stage = "brief" | "scripts" | "render";
type PaymentMethod = "vodafone" | "etisalat" | "binance";

const plans = [
  { id: "50", credits: 50, egp: "300 جنيه", usd: "≈ $6", ar: "سنجل", en: "Single" },
  { id: "150", credits: 150, egp: "900 جنيه", usd: "≈ $18", ar: "متوسط", en: "Medium" },
  { id: "500", credits: 500, egp: "3,000 جنيه", usd: "≈ $60", ar: "احترافي Pro", en: "Pro" },
] as const;

const durations = [
  { value: "15", credits: 15, reroll: 5 },
  { value: "25", credits: 25, reroll: 8 },
  { value: "40", credits: 40, reroll: 13 },
] as const;

const copy = {
  ar: {
    demo: "نسخة تجريبية خاصة بالمعاينة",
    title: "MSB AI Video",
    subtitle: "من تفاصيل الخدمة إلى مسار UGC منظم: اختَر الشكل والشخصية، ثم راجع السيناريو قبل التوليد الفعلي.",
    notice: "هذه تجربة واجهة فقط: لا يتم رفع صور أو حفظ بيانات أو خصم رصيد أو إرسال بريد.",
    language: "English",
    demoModels: "حالة المعاينة الحالية",
    demoModelsCopy: "المقطع المعروض مثال حركة من صور مرجعية فقط لاختبار التصميم والمشغّل؛ ليس فيديو أفاتار ناطقًا أو نموذج خدمة نهائيًا.",
    planExplainer: "كيف تعمل الباقات؟",
    planExplainerCopy: "تشتري رصيدًا، ثم تستخدم رصيدًا مساويًا لمدة الفيديو. إعادة نفس الفكرة بسعر مخفّض ظاهر أمامك.",
    brief: "بيانات الفيديو",
    scripts: "اختيار السيناريو",
    render: "محاكاة التوليد",
    formTitle: "ابدأ بمعلومات الإعلان",
    formCopy: "اكتب الفكرة الأساسية، واضبط شكل الفيديو قبل أن ننظمها في 3 زوايا UGC تجريبية.",
    brand: "اسم البراند أو الخدمة",
    offer: "المنتج أو العرض الذي تريد تقديمه",
    audience: "الجمهور المستهدف",
    tone: "نبرة الفيديو",
    ratio: "أبعاد الفيديو",
    character: "الموديل / الشخصية المتحدثة",
    music: "الموسيقى الخلفية",
    duration: "مدة الفيديو",
    images: "صور المنتج أو الخدمة",
    imagesHelp: "تظهر أسماء الملفات هنا فقط؛ لن يتم رفعها في التجربة.",
    chooseImages: "اختيار صور للتجربة",
    generate: "إنشاء 3 سيناريوهات تجريبية",
    required: "اكتب اسم البراند والعرض والجمهور المستهدف أولًا.",
    scriptsTitle: "اختر الزاوية الأقرب لرسالتك",
    scriptsCopy: "هذه محاكاة للرحلة فقط. عند التشغيل الفعلي سيولد الذكاء الاصطناعي نصوصًا خاصة بكل طلب.",
    select: "اختيار هذا السيناريو",
    selected: "تم الاختيار",
    custom: "أو اكتب توجيهك الخاص",
    customPlaceholder: "مثال: ابدأ بمشكلة واضحة ثم اذكر العرض مع دعوة تواصل هادئة.",
    next: "التالي: محاكاة التوليد",
    back: "تعديل البيانات",
    planTitle: "الباقات والرصيد",
    planCopy: "الرصيد المعروض توضيحي فقط ولن يخصم منه شيء الآن.",
    credits: "رصيد",
    priceNote: "السعر بالجنيه المصري؛ مقابل الدولار تقريبي للعرض فقط.",
    buy: "شراء الخطة",
    durationCost: "تكلفة مدة الفيديو",
    reroll: "إعادة التوليد لنفس الفكرة",
    simulate: "ابدأ محاكاة التوليد",
    rendering: "جارٍ تنفيذ محاكاة آمنة...",
    ready: "اكتملت المحاكاة",
    readyCopy: "في التشغيل الفعلي هنا يظهر رابط MP4 بعد اكتمال مهمة المزود الخارجي. لا يوجد ملف فيديو أو تنزيل في النسخة التجريبية.",
    restart: "بدء تجربة جديدة",
    accountTitle: "الحساب والحفظ لاحقًا",
    accountCopy: "في مرحلة التشغيل فقط: الحساب الشخصي، السجل، الرصيد والدفعات المعلّقة ستكون محمية لكل عميل.",
    paymentTitle: "شراء خطة — تجربة واجهة",
    paymentCopy: "تحقق من التدفق قبل تشغيل الدفع الفعلي. لا يتم إرسال النموذج أو حفظه أو رفع الإيصال الآن.",
    name: "الاسم بالكامل",
    paymentRef: "رقم الهاتف أو TXID / عنوان محفظة Binance",
    method: "طريقة الدفع",
    receipt: "إيصال التحويل",
    receiptHelp: "اختيار الملف هنا للتجربة فقط؛ لا يخرج من جهازك.",
    chooseReceipt: "اختيار لقطة شاشة",
    recipient: "بيانات التحويل",
    recipientName: "Coach Mohamed Sayed",
    paymentRequired: "اكتب الاسم وبيان التحويل واختر صورة الإيصال لتجربة التأكيد.",
    close: "إغلاق",
    support: "تواصل مع الدعم عبر WhatsApp",
    confirmation: "جاري مراجعة التحويل وتفعيل الكريدت في حسابك خلال دقائق",
    confirmationNote: "هذه رسالة تجربة فقط؛ لم يتم إنشاء طلب دفع أو إرسال بريد أو إضافة رصيد.",
    returnTool: "العودة إلى الأداة",
    missingEtisalat: "رقم محفظة اتصالات غير محفوظ بعد في الإعدادات؛ أضفه قبل تشغيل الدفع الحقيقي.",
    accountRequired: "أنشئ حسابًا أو سجّل دخولك أولًا لتستخدم أدوات MSB AI Video.",
    accountCta: "تسجيل / دخول لاستخدام الأداة",
  },
  en: {
    demo: "Preview-only demo",
    title: "MSB AI Video",
    subtitle: "From service details to an organized UGC flow: choose the format and presenter, then review the script before real generation.",
    notice: "Interface demo only: it does not upload images, save data, deduct credits, or send email.",
    language: "العربية",
    demoModels: "Current preview status",
    demoModelsCopy: "The clip shown is a reference-image motion example for testing the design and player only; it is not a speaking avatar or final service sample.",
    planExplainer: "How plans work",
    planExplainerCopy: "Purchase credits, then use credits equal to the video duration. The discounted re-roll cost appears clearly in the tool.",
    brief: "Video brief",
    scripts: "Choose script",
    render: "Generation demo",
    formTitle: "Start with ad details",
    formCopy: "Share the core idea and set the video format before shaping it into three demo UGC angles.",
    brand: "Brand or service name",
    offer: "Product or offer to feature",
    audience: "Target audience",
    tone: "Video tone",
    ratio: "Video ratio",
    character: "Speaking character",
    music: "Background music",
    duration: "Video duration",
    images: "Product or service images",
    imagesHelp: "Only file names appear here; nothing is uploaded in this demo.",
    chooseImages: "Choose demo images",
    generate: "Create 3 demo scripts",
    required: "Enter the brand, offer, and target audience first.",
    scriptsTitle: "Choose the angle closest to your message",
    scriptsCopy: "This is a journey simulation only. In production, AI will create scripts tailored to each request.",
    select: "Choose this script",
    selected: "Selected",
    custom: "Or add your own direction",
    customPlaceholder: "Example: Start with a clear pain point, introduce the offer, and end with a calm CTA.",
    next: "Next: simulate generation",
    back: "Edit brief",
    planTitle: "Plans and credits",
    planCopy: "The displayed balance is illustrative only; no credits are deducted now.",
    credits: "credits",
    priceNote: "EGP is the listed price; USD is approximate for display only.",
    buy: "Buy plan",
    durationCost: "Video duration cost",
    reroll: "Re-roll for the same idea",
    simulate: "Start generation simulation",
    rendering: "Running a safe simulation...",
    ready: "Simulation complete",
    readyCopy: "In production, this area will show an MP4 link once the external provider job finishes. No video or download exists in this demo.",
    restart: "Start a new demo",
    accountTitle: "Account and history later",
    accountCopy: "Only in the next stage: each client will have protected account history, balance, and pending payments.",
    paymentTitle: "Buy plan — interface demo",
    paymentCopy: "Review the flow before real payments are enabled. No form, receipt, or data is sent or stored here.",
    name: "Full name",
    paymentRef: "Phone number or Binance TXID / wallet address",
    method: "Payment method",
    receipt: "Transfer receipt",
    receiptHelp: "Choosing a file is for testing only; it never leaves your device.",
    chooseReceipt: "Choose screenshot",
    recipient: "Transfer details",
    recipientName: "Coach Mohamed Sayed",
    paymentRequired: "Enter the name, payment reference, and choose a receipt to test the confirmation.",
    close: "Close",
    support: "Contact support via WhatsApp",
    confirmation: "Your transfer is being reviewed; credits will be activated in your account within minutes",
    confirmationNote: "Demo message only: no payment request, email, or credits were created.",
    returnTool: "Return to tool",
    missingEtisalat: "An Etisalat Cash wallet number is not yet saved in settings; add it before enabling real payments.",
    accountRequired: "Create an account or sign in first to use MSB AI Video tools.",
    accountCta: "Sign in to use the tool",
  },
} as const;

function createScripts(locale: Locale, brand: string, offer: string, audience: string, tone: string, ratio: string, character: string, music: string) {
  const productionNote = locale === "ar" ? `بتصوير ${ratio} وشخصية ${character} وموسيقى ${music}.` : `in ${ratio} format, with a ${character} presenter and ${music} music.`;
  if (locale === "en") return [
    { title: "Problem → proof → action", text: `Open with the moment ${audience} notices the problem. Show how ${offer} from ${brand} solves it in a natural ${tone} voice, then close with one direct action — ${productionNote}` },
    { title: "Creator-style discovery", text: `Frame ${brand} as a quick discovery. Let the presenter show the strongest detail of ${offer}, explain why it matters to ${audience}, and finish with a simple invitation to learn more — ${productionNote}` },
    { title: "Result-first hook", text: `Start with the benefit ${audience} wants most. Reveal ${offer} as the route to it, add one believable use moment, and end with a focused call to message or order — ${productionNote}` },
  ];
  return [
    { title: "مشكلة ثم إثبات ثم إجراء", text: `نبدأ بلحظة يتعرف فيها ${audience} على المشكلة، ثم نوضح كيف يقدم ${brand} من خلال ${offer} حلًا عمليًا بنبرة ${tone}، وننهي بدعوة واحدة واضحة للتواصل، ${productionNote}` },
    { title: "اكتشاف صانع محتوى", text: `نقدم ${brand} كاكتشاف سريع، ونظهر أقوى نقطة في ${offer}، ونوضح لماذا تهم ${audience}، ثم نفتح باب معرفة التفاصيل، ${productionNote}` },
    { title: "هوك يبدأ بالنتيجة", text: `نبدأ بالنتيجة التي يبحث عنها ${audience}، ثم نربطها بـ ${offer}، ونضيف لقطة استخدام واقعية، وننهي بإجراء محدد: رسالة أو طلب، ${productionNote}` },
  ];
}

export default function AiVideoPreview() {
  const [locale] = useState<Locale>("ar");
  const [stage, setStage] = useState<Stage>("brief");
  const [brief, setBrief] = useState({ brand: "", offer: "", audience: "", tone: "جذابة وواثقة", duration: "15", ratio: "طولي 9:16", character: "فتاة", music: "موسيقى حماسية" });
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[number]["id"]>("50");
  const [selectedScript, setSelectedScript] = useState<number | null>(null);
  const [customScript, setCustomScript] = useState("");
  const [notice, setNotice] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vodafone");
  const [paymentFields, setPaymentFields] = useState({ name: "", reference: "", receiptName: "" });
  const [hasAccount, setHasAccount] = useState(() => hasCustomerSession());
  const text = copy[locale];
  const selectedDuration = durations.find((item) => item.value === brief.duration) ?? durations[0];
  const selectedPlanData = plans.find((item) => item.id === selectedPlan) ?? plans[0];
  const scripts = useMemo(() => createScripts(locale, brief.brand || (locale === "ar" ? "براندك" : "your brand"), brief.offer || (locale === "ar" ? "عرضك" : "your offer"), brief.audience || (locale === "ar" ? "جمهورك" : "your audience"), brief.tone, brief.ratio, brief.character, brief.music), [brief, locale]);

  useEffect(() => {
    const refreshAccount = () => setHasAccount(hasCustomerSession());
    window.addEventListener("msb:customer-authenticated", refreshAccount);
    return () => window.removeEventListener("msb:customer-authenticated", refreshAccount);
  }, []);

  const updateBrief = (key: keyof typeof brief, value: string) => setBrief((current) => ({ ...current, [key]: value }));
  const chooseImages = (event: ChangeEvent<HTMLInputElement>) => setImageNames(Array.from(event.target.files ?? []).slice(0, 5).map((file) => file.name));
  const chooseReceipt = (event: ChangeEvent<HTMLInputElement>) => setPaymentFields((current) => ({ ...current, receiptName: event.target.files?.[0]?.name ?? "" }));
  const requireAccount = (work: () => void) => {
    if (hasAccount) return work();
    setNotice(text.accountRequired);
    window.dispatchEvent(new Event("msb:open-auth"));
  };
  const moveToScripts = () => {
    if (!hasAccount) return requireAccount(() => undefined);
    if (!brief.brand.trim() || !brief.offer.trim() || !brief.audience.trim()) return setNotice(text.required);
    setNotice(""); setStage("scripts");
  };
  const runSimulation = () => {
    if (!hasAccount) return requireAccount(() => undefined);
    if (selectedScript === null && !customScript.trim()) return setNotice(locale === "ar" ? "اختر سيناريو واحدًا أو اكتب توجيهك الخاص أولًا." : "Choose a script or add your own direction first.");
    setNotice(""); setSimulating(true);
    window.setTimeout(() => { setSimulating(false); setSimulationComplete(true); }, 750);
  };
  const restart = () => { setStage("brief"); setSelectedScript(null); setCustomScript(""); setNotice(""); setSimulationComplete(false); };
  const openPurchase = (planId: (typeof plans)[number]["id"]) => requireAccount(() => { setSelectedPlan(planId); setPaymentComplete(false); setPaymentOpen(true); });
  const confirmDemoPayment = () => {
    if (!hasAccount) return requireAccount(() => undefined);
    if (!paymentFields.name.trim() || !paymentFields.reference.trim() || !paymentFields.receiptName) return setNotice(text.paymentRequired);
    setNotice(""); setPaymentComplete(true);
  };
  const paymentButton = paymentMethod === "vodafone" ? (locale === "ar" ? "تم الدفع عبر فودافون كاش" : "Paid via Vodafone Cash") : paymentMethod === "etisalat" ? (locale === "ar" ? "تم الدفع عبر اتصالات كاش" : "Paid via Etisalat Cash") : (locale === "ar" ? "تم الدفع عبر Binance USDT" : "Paid via Binance USDT");
  const transferDetails = paymentMethod === "vodafone" ? ["01092794169"] : paymentMethod === "etisalat" ? ["01105697412"] : ["Binance Pay ID: 454798991"];
  const stages = [{ id: "brief", label: text.brief }, { id: "scripts", label: text.scripts }, { id: "render", label: text.render }] as const;

  return <SiteShell><div className="ai-video-preview" dir={locale === "ar" ? "rtl" : "ltr"}>
    <section className="ai-video-hero"><div className="site-container"><div className="ai-video-hero-top"><span className="ai-video-demo"><Sparkles className="h-4 w-4" />{text.demo}</span></div><div className="ai-video-hero-grid"><div><p className="ai-video-kicker"><Video className="h-4 w-4" />MSB AI VIDEO</p><h1 className="ai-video-tool-title">{text.title}</h1><p>{text.subtitle}</p></div><div className="ai-video-security"><LockKeyhole className="h-5 w-5" /><span>{text.notice}</span></div></div></div></section>

    <main className="site-container ai-video-main">{!hasAccount && <section className="ai-video-account-gate"><LockKeyhole className="h-5 w-5" /><p>{text.accountRequired}</p><button type="button" onClick={() => requireAccount(() => undefined)}>{text.accountCta}</button></section>}

      <div className="ai-video-stepper" aria-label="Video creation steps">{stages.map((item, index) => <div key={item.id} className={`ai-video-step ${stage === item.id ? "is-active" : ""} ${stages.findIndex((step) => step.id === stage) > index ? "is-done" : ""}`}><span>{stages.findIndex((step) => step.id === stage) > index ? <Check className="h-4 w-4" /> : index + 1}</span><b>{item.label}</b></div>)}</div>
      <div className="ai-video-layout"><section className="ai-video-panel ai-video-workspace">
        {stage === "brief" && <><div className="ai-video-panel-heading"><div><span>{text.brief}</span><h2>{text.formTitle}</h2><p>{text.formCopy}</p></div><CirclePlay className="ai-video-heading-icon" /></div><div className="ai-video-form-grid"><label>{text.brand}<input className="ai-video-input" value={brief.brand} onChange={(event) => updateBrief("brand", event.target.value)} placeholder={locale === "ar" ? "مثال: MSB Media" : "Example: MSB Media"} /></label><label>{text.offer}<input className="ai-video-input" value={brief.offer} onChange={(event) => updateBrief("offer", event.target.value)} placeholder={locale === "ar" ? "مثال: فيديو UGC لخدمة جديدة" : "Example: UGC video for a new service"} /></label><label>{text.audience}<input className="ai-video-input" value={brief.audience} onChange={(event) => updateBrief("audience", event.target.value)} placeholder={locale === "ar" ? "مثال: صناع المحتوى ومقدمو الخدمات" : "Example: creators and service providers"} /></label><label>{text.tone}<select className="ai-video-input" value={brief.tone} onChange={(event) => updateBrief("tone", event.target.value)}><option>{locale === "ar" ? "جذابة وواثقة" : "Confident and engaging"}</option><option>{locale === "ar" ? "هادئة واحترافية" : "Calm and professional"}</option><option>{locale === "ar" ? "سريعة وحماسية" : "Fast and energetic"}</option></select></label></div><div className="ai-video-settings-grid"><fieldset><legend>{text.ratio}</legend><div className="ai-video-choice-list">{[["طولي 9:16", "9:16 Vertical"], ["عرضي 16:9", "16:9 Horizontal"]].map(([ar, en]) => <button type="button" onClick={() => updateBrief("ratio", locale === "ar" ? ar : en)} className={brief.ratio === (locale === "ar" ? ar : en) ? "is-selected" : ""} key={ar}><Video className="h-4 w-4" />{locale === "ar" ? ar : en}</button>)}</div></fieldset><fieldset><legend>{text.character}</legend><div className="ai-video-choice-list">{[["شاب", "Young man"], ["فتاة", "Young woman"], ["رجل ناضج", "Mature man"], ["سيدة", "Woman"]].map(([ar, en]) => <button type="button" onClick={() => updateBrief("character", locale === "ar" ? ar : en)} className={brief.character === (locale === "ar" ? ar : en) ? "is-selected" : ""} key={ar}><UserRound className="h-4 w-4" />{locale === "ar" ? ar : en}</button>)}</div></fieldset><fieldset><legend>{text.music}</legend><div className="ai-video-choice-list">{[["بدون موسيقى", "No music"], ["موسيقى حماسية", "Energetic music"], ["موسيقى هادئة/بيزنس", "Calm business music"]].map(([ar, en]) => <button type="button" onClick={() => updateBrief("music", locale === "ar" ? ar : en)} className={brief.music === (locale === "ar" ? ar : en) ? "is-selected" : ""} key={ar}><Music2 className="h-4 w-4" />{locale === "ar" ? ar : en}</button>)}</div></fieldset></div><div className="ai-video-brief-bottom"><div><label className="ai-video-label">{text.duration}</label><div className="ai-video-duration-list">{durations.map((item) => <button key={item.value} type="button" onClick={() => updateBrief("duration", item.value)} className={`ai-video-duration ${brief.duration === item.value ? "is-selected" : ""}`}><Clock3 className="h-4 w-4" />{item.value}s <small>{item.credits} {text.credits}</small></button>)}</div></div><div><label className="ai-video-label">{text.images}</label><label className="ai-video-upload"><ImagePlus className="h-5 w-5" /><span>{text.chooseImages}</span><input type="file" accept="image/*" multiple onChange={chooseImages} /></label><small>{imageNames.length ? imageNames.join(" · ") : text.imagesHelp}</small></div></div><button className="yellow-button ai-video-primary" onClick={moveToScripts}>{text.generate}<ChevronLeft className="h-4 w-4" /></button></>}
        {stage === "scripts" && <><div className="ai-video-panel-heading"><div><span>{text.scripts}</span><h2>{text.scriptsTitle}</h2><p>{text.scriptsCopy}</p></div><Sparkles className="ai-video-heading-icon" /></div><div className="ai-video-script-list">{scripts.map((script, index) => <article className={`ai-video-script ${selectedScript === index ? "is-selected" : ""}`} key={script.title}><div><span>{index + 1}</span><h3>{script.title}</h3></div><p>{script.text}</p><button type="button" onClick={() => { setSelectedScript(index); setNotice(""); }} className="ai-video-select-script">{selectedScript === index ? <><Check className="h-4 w-4" />{text.selected}</> : text.select}</button></article>)}</div><label className="ai-video-custom-script">{text.custom}<textarea className="ai-video-input" value={customScript} onChange={(event) => { setCustomScript(event.target.value); setNotice(""); }} placeholder={text.customPlaceholder} rows={3} /></label><div className="ai-video-actions"><button className="ai-video-secondary" onClick={() => setStage("brief")}>{text.back}</button><button className="yellow-button" onClick={() => { if (selectedScript !== null || customScript.trim()) { setNotice(""); setStage("render"); } else setNotice(locale === "ar" ? "اختر سيناريو أو اكتب توجيهك الخاص أولًا." : "Choose a script or add your own direction first."); }}>{text.next}<ChevronLeft className="h-4 w-4" /></button></div></>}
        {stage === "render" && <><div className="ai-video-panel-heading"><div><span>{text.render}</span><h2>{simulationComplete ? text.ready : text.simulate}</h2><p>{simulationComplete ? text.readyCopy : text.planCopy}</p></div><RefreshCcw className="ai-video-heading-icon" /></div><div className={`ai-video-render-state ${simulationComplete ? "is-ready" : ""}`}><Video className="h-9 w-9" /><strong>{simulating ? text.rendering : simulationComplete ? text.ready : `${selectedDuration.value}s · ${selectedDuration.credits} ${text.credits}`}</strong><span>{simulationComplete ? text.readyCopy : locale === "ar" ? "هذه الشاشة تحاكي حالة المهمة في الخلفية، ولا تتصل بأي مزود فيديو الآن." : "This screen simulates a background job and does not connect to a video provider yet."}</span></div><div className="ai-video-actions"><button className="ai-video-secondary" onClick={() => setStage("scripts")}>{text.back}</button>{simulationComplete ? <button className="yellow-button" onClick={restart}>{text.restart}<RefreshCcw className="h-4 w-4" /></button> : <button className="yellow-button" disabled={simulating} onClick={runSimulation}>{simulating ? text.rendering : text.simulate}<CirclePlay className="h-4 w-4" /></button>}</div></>}
        {notice && <p className="ai-video-notice" role="status">{notice}</p>}
      </section>
      <aside className="ai-video-panel ai-video-credit-panel"><div><span className="ai-video-side-label">{text.planTitle}</span><h2>{selectedPlanData[locale]}</h2><p>{text.planCopy}</p></div><div className="ai-video-plan-list">{plans.map((plan) => <article key={plan.id} className={`ai-video-plan ${selectedPlan === plan.id ? "is-selected" : ""}`}><button type="button" onClick={() => setSelectedPlan(plan.id)}><span>{plan[locale]}</span><strong>{plan.credits} {text.credits}</strong></button><div className="ai-video-plan-prices"><span><small>EGP</small><b>{plan.egp}</b></span><span><small>USD</small><b dir="ltr">{plan.usd}</b></span></div><button type="button" onClick={() => openPurchase(plan.id)} className="ai-video-buy-plan">{text.buy}</button></article>)}</div><p className="ai-video-currency-note">{text.priceNote}</p><dl className="ai-video-cost-list"><div><dt>{text.durationCost}</dt><dd>{selectedDuration.credits} {text.credits}</dd></div><div><dt>{text.reroll}</dt><dd>{selectedDuration.reroll} {text.credits}</dd></div></dl><div className="ai-video-account-note"><LockKeyhole className="h-4 w-4" /><div><b>{text.accountTitle}</b><p>{text.accountCopy}</p></div></div></aside>
      </div></main>
    <AiVideoEnhancements locale={locale} onCreate={() => requireAccount(() => setStage("brief"))} canUseActions={hasAccount} onRequireAccount={() => requireAccount(() => undefined)} />
    <button className="ai-video-support" onClick={() => openWhatsApp("أحتاج مساعدة بخصوص أداة MSB AI Video")}><WhatsAppIcon className="h-5 w-5 text-[#25D366]" />{text.support}</button>
    {paymentOpen && <div className="ai-video-modal-backdrop" role="presentation"><section className="ai-video-payment-modal" role="dialog" aria-modal="true" aria-labelledby="ai-video-payment-title"><button className="ai-video-modal-close" onClick={() => setPaymentOpen(false)} aria-label={text.close}><X className="h-5 w-5" /></button>{paymentComplete ? <div className="ai-video-payment-confirmation"><span><Check className="h-7 w-7" /></span><h2>{text.confirmation}</h2><p>{text.confirmationNote}</p><button className="yellow-button" onClick={() => setPaymentOpen(false)}>{text.returnTool}</button></div> : <><span className="ai-video-side-label">{text.demo}</span><h2 id="ai-video-payment-title">{text.paymentTitle}</h2><p>{text.paymentCopy}</p><div className="ai-video-payment-plan"><span>{selectedPlanData[locale]}</span><b>{selectedPlanData.credits} {text.credits}</b><strong>{selectedPlanData.egp} <em dir="ltr">{selectedPlanData.usd}</em></strong></div><div className="ai-video-payment-fields"><label>{text.name}<input className="ai-video-input" value={paymentFields.name} onChange={(event) => setPaymentFields((current) => ({ ...current, name: event.target.value }))} /></label><label>{text.paymentRef}<input className="ai-video-input" value={paymentFields.reference} onChange={(event) => setPaymentFields((current) => ({ ...current, reference: event.target.value }))} /></label></div><fieldset className="ai-video-payment-methods"><legend>{text.method}</legend>{(["vodafone", "etisalat", "binance"] as const).map((method) => <button type="button" onClick={() => setPaymentMethod(method)} className={paymentMethod === method ? "is-selected" : ""} key={method}>{method === "vodafone" ? "Vodafone Cash" : method === "etisalat" ? "Etisalat Cash" : "Binance USDT"}</button>)}</fieldset><div className="ai-video-transfer-details"><span>{text.recipient} · {text.recipientName}</span>{transferDetails.length ? transferDetails.map((detail) => <b key={detail} dir="ltr">{detail}</b>) : <p>{text.missingEtisalat}</p>}</div><label className="ai-video-receipt-picker"><ImagePlus className="h-5 w-5" /><span><b>{paymentFields.receiptName || text.chooseReceipt}</b><small>{text.receiptHelp}</small></span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseReceipt} /></label><button className="yellow-button ai-video-payment-submit" onClick={confirmDemoPayment}>{paymentButton}<Check className="h-4 w-4" /></button>{notice && <p className="ai-video-notice" role="status">{notice}</p>}</>}</section></div>}
  </div></SiteShell>;
}
