import { ArrowLeft, Check, CheckCircle2, Route, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import PromoVideo from "@/components/PromoVideo";
import ScrollReveal from "@/components/ScrollReveal";
import { BRAND_IMAGE, mediaUrl, openWhatsApp, services } from "@/lib/site-data";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const quiz = [
  { question: "ما هدفك الأول في الفترة الجاية؟", options: ["زيادة المبيعات", "انتشار أكبر للعلامة", "إطلاق خدمة جديدة", "تطوير المحتوى"] },
  { question: "أي قناة تهمك أكثر؟", options: ["إعلانات السوشيال", "فيديوهات قصيرة", "صفحة هبوط", "حلول AI"] },
  { question: "ما المدة المناسبة للانطلاق؟", options: ["هذا الأسبوع", "خلال شهر", "أخطط للربع القادم", "أحتاج مراجعة أولًا"] },
];

const verifiedConversations = [
  { image: mediaUrl("whatsapp-academy-feedback-1_38af68ba.jpg"), label: "محادثة واتساب موثقة" },
  { image: mediaUrl("whatsapp-academy-feedback-2_14c75cc0.jpg"), label: "تواصل ومتابعة مباشرة" },
  { image: mediaUrl("whatsapp-video-feedback_fc1c8b59.jpg"), label: "ملاحظات على محتوى فيديو" },
];

export default function Services() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = answers.length === quiz.length;
  const answer = (value: string) => {
    const next = [...answers, value];
    setAnswers(next);
    if (step < quiz.length - 1) setStep(step + 1);
  };

  return <SiteShell>
    <section className="page-hero"><div className="site-container"><span className="eyebrow"><Sparkles className="h-4 w-4" />خدماتنا</span><h1>حلول متصلة، لا مهام منفصلة</h1><p>نحن نرتّب الأدوات والإبداع والأداء داخل مسار يناسب هدف مشروعك. ستجد الخدمات والتجارب الموثقة والتدقيق التسويقي في صفحة مستقلة وواضحة.</p></div></section>
    <section className="site-container py-16">
      <ScrollReveal><div className="service-grid">{services.map(service => { const Icon = service.icon; return <article key={service.title} className={`service-card ${service.tone} ${service.featured ? "service-card-featured" : ""}`}>{service.offer && <span className="service-offer-label">{service.offer}</span>}<div className="flex items-start justify-between gap-3"><span className="icon-box"><Icon className="h-6 w-6" /></span><div className="flex items-center gap-2">{service.price && <span className="price-badge">{service.price}</span>}<img src={BRAND_IMAGE} loading="lazy" decoding="async" alt="شعار MSB Media" className="service-brand-mark" /></div></div><figure className="service-visual"><img src={service.visual} loading="lazy" decoding="async" alt={`مشهد توضيحي لخدمة ${service.title}`} /></figure><div className="mt-5 flex items-start gap-3"><span className="mt-0.5 text-[#ffd400]"><Icon className="h-5 w-5" /></span><h2 className="mt-0">{service.title}</h2></div><p className="service-benefit">{service.benefit}</p><p>{service.copy}</p>{service.tone === "ai" && <div className="mt-5 flex flex-wrap gap-2">{["Gemini PRO", "Google Flow", "Veo 3", "Nano Banana", "Cloud Storage"].map(item => <span className="ai-badge" key={item}>{item}</span>)}</div>}<button onClick={() => openWhatsApp(`أريد البدء في خدمة ${service.title}`)} className="mt-7 inline-flex items-center gap-2 text-sm font-black">ابدأ على واتساب <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /><ArrowLeft className="h-4 w-4" /></button></article>; })}</div></ScrollReveal>
      <ScrollReveal delay={90}><div className="mt-10"><PromoVideo compact /></div></ScrollReveal>
      <ScrollReveal delay={120}><section className="mt-10 rounded-[1.75rem] border border-white/10 bg-[#07133c] p-7 sm:p-9"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow"><Route className="h-4 w-4" />نظام عمل واضح</span><h2 className="mt-4 text-2xl font-black">من أول رسالة إلى خطوة تالية مفهومة</h2></div><p className="max-w-md leading-8 text-slate-300">لا نرمي عليك خدمات كثيرة. نرتب نقطة البداية ثم نحدد ما يساعد مشروعك فعلًا.</p></div><div className="mt-7 grid gap-4 md:grid-cols-3">{["نختار القناة المناسبة للهدف", "ننفذ ونراجع كل خطوة", "نحوّل التعلم إلى قرار تالي"].map(item => <div className="mini-process" key={item}><CheckCircle2 className="h-5 w-5 text-[#ffd400]" />{item}</div>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3"><div className="mini-process">✓ نحدد نطاق العمل قبل عرض السعر</div><div className="mini-process">✓ التواصل يبدأ من واتساب مباشرة</div><div className="mini-process">✓ لا نعرض مراجعات إلا بعد التوثيق</div></div></section></ScrollReveal>
      <ScrollReveal delay={150}><section className="mt-10 grid gap-8 rounded-[1.75rem] border border-white/10 bg-[#020615] p-7 sm:p-9 lg:grid-cols-[.9fr_1.1fr]"><div><span className="eyebrow">تدقيق تسويقي سريع</span><h2 className="mt-4 text-2xl font-black">ثلاث إجابات، ونقطة بداية أوضح</h2><p className="mt-4 leading-8 text-slate-300">اختر إجابة واحدة في كل خطوة لنحوّلها إلى تدقيق مبدئي يرسله فريقنا إلى محادثة واتساب.</p><div className="mt-8 flex items-center gap-3 text-sm font-black"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffd400] text-[#020615]">{done ? quiz.length : step + 1}</span><span>الخطوة {done ? quiz.length : step + 1} من {quiz.length}</span></div></div><div className="rounded-[1.25rem] border border-white/10 bg-[#07133c] p-6">{!done ? <><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#ffd400] transition-all duration-200" style={{ width: `${((step + 1) / quiz.length) * 100}%` }} /></div><h3 className="mt-7 text-xl font-black">{quiz[step].question}</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{quiz[step].options.map(option => <button key={option} onClick={() => answer(option)} className="option-button">{option}<ArrowLeft className="h-4 w-4" /></button>)}</div></> : <div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#4a74ff]"><Check className="h-6 w-6" /></span><h3 className="mt-5 text-2xl font-black">تدقيقك التسويقي المبدئي جاهز</h3><p className="mt-3 leading-8 text-slate-300">يبدو أن مشروعك يحتاج مسارًا يجمع بين <strong className="text-white">{answers[0]}</strong> و<strong className="text-white">{answers[1]}</strong>، مع خطوة تنفيذ تبدأ {answers[2]}.</p><button onClick={() => openWhatsApp(`هذه إجاباتي في التدقيق: ${answers.join(" | ")}`)} className="yellow-button mt-6">واتساب <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /></button><button onClick={() => { setStep(0); setAnswers([]); }} className="mr-4 text-sm font-bold text-blue-300">إعادة التدقيق</button></div>}</div></section></ScrollReveal>
      <ScrollReveal delay={180}><section className="mt-10 rounded-[1.75rem] border border-white/10 bg-[#07133c] p-7 sm:p-9"><div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]"><div><span className="eyebrow"><ShieldCheck className="h-4 w-4" />تجارب عملاء موثقة</span><h2 className="mt-4 text-2xl font-black">لقطات حقيقية من متابعة العملاء</h2><p className="mt-3 leading-8 text-slate-300">نعرض هذه اللقطات الحقيقية التي وفرها مالك الوكالة لتوضيح أسلوب المتابعة والمراجعة، مع مراعاة الخصوصية قدر الإمكان.</p><button onClick={() => openWhatsApp("أريد معرفة طريقة العمل والمتابعة في MSB Media")} className="blue-button mt-6"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />تواصل معنا</button></div><div className="services-feedback-grid">{verifiedConversations.map(item => <figure className="services-feedback-card" key={item.image}><img src={item.image} loading="lazy" decoding="async" alt={item.label} /><figcaption><ShieldCheck className="h-3.5 w-3.5" />{item.label}</figcaption></figure>)}</div></div></section></ScrollReveal>
    </section>
  </SiteShell>;
}
