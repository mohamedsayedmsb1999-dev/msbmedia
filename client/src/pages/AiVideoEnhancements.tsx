import WhatsAppIcon from "@/components/WhatsAppIcon";
import { openWhatsApp } from "@/lib/site-data";
import { CirclePlay, ImagePlus, MessageCircleMore, Pause, Send, ShieldCheck, Sparkles } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

type Locale = "ar" | "en";
type ChatMessage = { role: "user" | "assistant"; content: string; images?: string[] };

const AI_VIDEO_LOGO_URL = "/manus-storage/msb-ai-video-logo-mark_9943aa3f.png";
const previewSamples = [
  { id: "creator", src: "/manus-storage/msb-demo-guidance-vertical_89387343.mp4", poster: "/manus-storage/creator_be5e205f.jpg", ratio: "vertical", ar: "إرشادات لصانع المحتوى", en: "Creator guidance" },
  { id: "product", src: "/manus-storage/msb-demo-product-horizontal_a1b8f29e.mp4", poster: "/manus-storage/ai_3af8700b.jpg", ratio: "horizontal", ar: "فيديو منتج بأسلوب UGC", en: "UGC product video" },
  { id: "ai", src: "/manus-storage/msb-demo-ai-video-vertical_632965f8.mp4", poster: "/manus-storage/product_468d587a.jpg", ratio: "vertical", ar: "إعلان AI Video", en: "AI Video ad" },
] as const;

const words = {
  ar: {
    preview: "نماذج فيديو من فريق MSB",
    title: "MSB AI Video",
    videoCopy: "ثلاثة نماذج مقدمة من فريق MSB لعرض أسلوب الفيديو العمودي والعرضي. تُشغل يدويًا داخل المعاينة ولا تتاح للتنزيل.",
    trial: "تجربة مجانية واحدة كل 30 يومًا من تاريخ التسجيل",
    trialCopy: "هذه القاعدة معروضة في المعاينة الآن، وتُطبّق على الحساب المسجل فقط عند تشغيل النظام الحقيقي.",
    play: "تشغيل النموذج",
    pause: "إيقاف النموذج",
    samples: "اختر نموذج فيديو",
    chatTitle: "خلّينا نرتّب فكرة فيديوك",
    start: "أهلًا بيك. قول لي بتقدم إيه وإيه النتيجة اللي عايز توصل لها من الفيديو، وفريقنا هيساعدك نرتّب البداية.",
    placeholder: "اكتب فكرتك أو هدفك من الفيديو…",
    attach: "إرفاق صور",
    send: "إرسال",
    error: "حصل تأخير بسيط. اكتب هدف الفيديو والجمهور، وسنرشدك للخطوة المناسبة.",
    support: "تواصل مع الدعم عبر WhatsApp",
  },
  en: {
    preview: "MSB video samples",
    title: "MSB AI Video",
    videoCopy: "Three samples provided by the MSB team show vertical and horizontal video styles. They play manually in preview and are not downloadable.",
    trial: "One free trial every 30 days from registration",
    trialCopy: "This rule is shown in the preview and applies only to the registered account after the real system is enabled.",
    play: "Play sample",
    pause: "Pause sample",
    samples: "Choose a video sample",
    chatTitle: "Let’s shape your video idea",
    start: "Welcome. Tell us what you offer and what outcome you want from the video, and our team will help you shape a clear starting point.",
    placeholder: "Describe your idea or video goal…",
    attach: "Attach images",
    send: "Send",
    error: "There was a brief delay. Share the video goal and audience and we will guide you to the next step.",
    support: "Contact support via WhatsApp",
  },
} as const;

function localGuideReply(content: string, locale: Locale) {
  const value = content.toLowerCase().trim();
  const isArabic = /[\u0600-\u06ff]/.test(content);
  const technical = /(كود|برمجة|api|مفتاح|سيرفر|hack|exploit|prompt system|source code)/i.test(value);
  const purchase = /(سعر|باقة|شراء|دفع|رصيد|price|plan|buy|pay|credit)/i.test(value);
  const create = /(ابدأ|اعمل فيديو|إنشاء|انشئ|فيديو|video|create|generate)/i.test(value);
  const support = /(دعم|مساعدة|واتساب|support|help|whatsapp)/i.test(value);
  const greeting = /^(اهلا|أهلا|هاي|hello|hi\b|السلام)/i.test(value);
  const objective = /(مبيعات|رسائل|مشاهدات|متابعين|طلبات|sales|messages|views|followers|leads)/i.test(value);
  const product = /(منتج|خدمة|متجر|ملابس|عقار|مطعم|كورس|product|service|store|clothes|real estate|restaurant|course)/i.test(value);
  if (technical) return { answer: isArabic ? "أفهم سؤالك، لكن هنا نركز على الفكرة والنتيجة التي تريدها من الفيديو، وليس تفاصيل التشغيل الداخلية. قل لي فقط: الفيديو لمنتج ولا لخدمة؟" : "I understand the question, but this space focuses on the video idea and outcome rather than internal operation details. Is your video for a product or a service?", suggestedAction: "none" as const };
  if (greeting) return { answer: isArabic ? "أهلًا بيك، نورتنا. احكي لي عن نشاطك براحتك: بتقدم إيه، وعايز العميل يعمل إيه بعد ما يشوف الفيديو؟" : "Welcome — glad you are here. Tell us about your business: what do you offer, and what should viewers do after they watch?", suggestedAction: "none" as const };
  if (purchase) return { answer: isArabic ? "اختيار الباقة يعتمد على عدد الفيديوهات والمدة التي تحتاجها. سنجل 50 رصيد بـ300 جنيه، متوسط 150 بـ900، وPro 500 بـ3000؛ تحب نرتب احتياجك الأول قبل ما تختار؟" : "The right plan depends on your number and duration of videos. Single is 50 credits for 300 EGP, Medium is 150 for 900, and Pro is 500 for 3,000. Would you like to map your first need before choosing?", suggestedAction: "purchase" as const };
  if (support) return { answer: isArabic ? "طبعًا، فريقنا موجود يساعدك. اكتب لنا نوع الفيديو أو أي نقطة واقفة معك، ولو تحب تكمل على واتساب هتلاقي الزر موجود دائمًا." : "Of course — our team is here to help. Tell us the video type or what is holding you back, and you can always continue on WhatsApp using the support button.", suggestedAction: "support" as const };
  if (create) return { answer: isArabic ? "ممتاز، نبدأ صح. اكتب اسم البراند والعرض والجمهور، وبعدها اختَر المقاس والشخصية والموسيقى بحيث الفيديو يطلع قريب من هدفك." : "Great — let’s start properly. Add the brand, offer, and audience, then choose the format, presenter, and music to match your goal.", suggestedAction: "create" as const };
  if (objective && product) return { answer: isArabic ? "فكرتك واضحة، وده بداية كويسة جدًا. نقدر نبني هوك سريع يلفت الانتباه ثم نعرض الفائدة وننهي بخطوة بسيطة للعميل؛ تفضّل الفيديو يكون طولي للسوشيال ولا عرضي؟" : "Your idea is clear, which is a strong start. We can build a fast hook, show the benefit, then end with a simple next step; would you prefer vertical for social or horizontal?", suggestedAction: "none" as const };
  if (objective) return { answer: isArabic ? "حلو، خلّينا نخلي الهدف هو البوصلة. ما المنتج أو الخدمة التي تريد أن يركز عليها الفيديو في أول ثانيتين؟" : "Great — let the outcome guide the video. What product or service should the first two seconds focus on?", suggestedAction: "none" as const };
  return { answer: isArabic ? "فهمت عليك. عشان نطلع بفكرة تشبه شغلك فعلًا، قل لي من هم الناس الذين تريد الوصول لهم وما أهم فائدة تريدهم يتذكروها؟" : "Got it. To make the idea truly fit your business, who do you want to reach and what is the most important benefit they should remember?", suggestedAction: "none" as const };
}

export default function AiVideoEnhancements({ locale, onCreate, canUseActions, onRequireAccount }: { locale: Locale; onCreate: () => void; canUseActions: boolean; onRequireAccount: () => void }) {
  const text = words[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedSampleId, setSelectedSampleId] = useState<(typeof previewSamples)[number]["id"]>("creator");
  const [playing, setPlaying] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: text.start }]);
  const [input, setInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const selectedSample = previewSamples.find(sample => sample.id === selectedSampleId) ?? previewSamples[0];

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { await video.play(); setPlaying(true); } else { video.pause(); setPlaying(false); }
  };

  const selectSample = (id: (typeof previewSamples)[number]["id"]) => {
    videoRef.current?.pause();
    setPlaying(false);
    setSelectedSampleId(id);
  };

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canUseActions) { onRequireAccount(); return; }
    const content = input.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content, images: images.length ? images : undefined }].slice(-8);
    setMessages(next); setInput(""); setImages([]); setLoading(true);
    try {
      await new Promise(resolve => window.setTimeout(resolve, 320));
      const result = localGuideReply(content, locale);
      setMessages(current => [...current, { role: "assistant", content: result.answer }]);
      if (result.suggestedAction === "create") onCreate();
      if (result.suggestedAction === "purchase") document.querySelector(".ai-video-credit-panel")?.scrollIntoView({ behavior: "auto", block: "start" });
      if (result.suggestedAction === "support") openWhatsApp("أحتاج مساعدة بخصوص MSB AI Video");
    } catch { setMessages(current => [...current, { role: "assistant", content: text.error }]); }
    finally { setLoading(false); }
  };

  return <>
     <section className="site-container ai-video-live-preview"><div className="ai-video-logo-lockup"><img src={AI_VIDEO_LOGO_URL} alt="" /><div><span><Sparkles className="h-3.5 w-3.5" />PREVIEW STUDIO</span><b>{text.title}</b></div></div><div className={`ai-video-preview-player ${selectedSample.ratio === "horizontal" ? "is-horizontal" : ""}`}><video key={selectedSample.id} ref={videoRef} src={selectedSample.src} poster={selectedSample.poster} preload="metadata" playsInline controls={false} controlsList="nodownload noremoteplayback" disablePictureInPicture onContextMenu={event => event.preventDefault()} onEnded={() => setPlaying(false)} /><div className="ai-video-watermark" aria-hidden="true">MSB AI VIDEO · PREVIEW</div><button type="button" className="ai-video-preview-play" onClick={toggleVideo}>{playing ? <Pause className="h-4 w-4" /> : <CirclePlay className="h-4 w-4" />}{playing ? text.pause : text.play}</button></div><div className="ai-video-live-copy"><span>{text.preview}</span><h2>{text.trial}</h2><p>{text.videoCopy}</p><div className="ai-video-sample-picker"><b>{text.samples}</b><div>{previewSamples.map(sample => <button key={sample.id} type="button" onClick={() => selectSample(sample.id)} className={sample.id === selectedSampleId ? "is-selected" : ""}>{sample[locale]} <small>{sample.ratio === "vertical" ? "9:16" : "16:9"}</small></button>)}</div></div><p className="ai-video-free-note"><ShieldCheck className="h-4 w-4" />{text.trialCopy}</p></div></section>
    <section className="site-container ai-video-chat-section"><div className="ai-video-chat-heading"><div><h2>{text.chatTitle}</h2></div><MessageCircleMore /></div><div className="ai-video-chat-feed" aria-live="polite">{messages.map((message, index) => <article className={`ai-video-chat-message ${message.role}`} key={`${message.role}-${index}`}><p>{message.content}</p>{message.images?.length ? <small><ImagePlus className="h-3.5 w-3.5" />{message.images.join(" · ")}</small> : null}</article>)}{loading ? <article className="ai-video-chat-message assistant"><p>...</p></article> : null}</div><form className="ai-video-chat-form" onSubmit={send}><label><ImagePlus className="h-4 w-4" /><span>{text.attach}</span><input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={event => setImages(Array.from(event.target.files ?? []).slice(0, 4).map(file => file.name))} /></label><input value={input} maxLength={600} onChange={event => setInput(event.target.value)} placeholder={text.placeholder} aria-label={text.placeholder} /><button type="submit" disabled={loading}><Send className="h-4 w-4" />{text.send}</button></form>{images.length ? <small className="ai-video-chat-note">{images.join(" · ")}</small> : null}</section>
    <button className="ai-video-support" onClick={() => openWhatsApp("أحتاج مساعدة بخصوص أداة MSB AI Video")}><WhatsAppIcon className="h-5 w-5 text-[#25D366]" />{text.support}</button>
  </>;
}
