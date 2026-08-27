import { ArrowLeft, Check, CheckCircle2, Route, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import PromoVideo from "@/components/PromoVideo";
import ScrollReveal from "@/components/ScrollReveal";
import { mediaUrl, openWhatsApp, services } from "@/lib/site-data";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import MediaPlatformRail from "@/components/MediaPlatformRail";
import { Link } from "wouter";

const quiz = [
  { question: "ما هدفك الأول في الفترة الجاية؟", options: ["زيادة المبيعات", "انتشار أكبر للعلامة", "إطلاق خدمة جديدة", "تطوير المحتوى"] },
  { question: "أي قناة تهمك أكثر؟", options: ["إعلانات السوشيال", "فيديوهات قصيرة", "صفحة هبوط", "حلول AI"] },
  { question: "ما المدة المناسبة للانطلاق؟", options: ["هذا الأسبوع", "خلال شهر", "أخطط للربع القادم", "أحتاج مراجعة أولًا"] },
];

const verifiedConversations = [
  { image: mediaUrl("whatsapp-academy-feedback-2_14c75cc0.jpg"), label: "تواصل ومتابعة مباشرة" },
  { image: mediaUrl("whatsapp-video-feedback_fc1c8b59.jpg"), label: "ملاحظات على محتوى فيديو" },
];

const serviceIdByTitle: Record<string, string> = {
  "فيديوهات UGC بالذكاء الاصطناعي": "ugc-ai-video",
  "تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية": "web-design-platforms",
  "اعلانات ممولة فيسبوك & انستجرام": "paid-social-ads",
  "عرض Gemini PRO + Veo 3 + Google Flow + Nano 🍌 لمدة سنة": "ai-subscriptions",
  "مونتاج وترجمة نصية وتنقية صوت للفيديوهات": "video-editing",
};

function recommendService(answers: string[]) {
  const primaryGoal = answers[0] ?? "";
  const channel = answers[1] ?? "";
  if (primaryGoal === "زيادة المبيعات" || primaryGoal === "انتشار أكبر للعلامة" || channel === "إعلانات السوشيال") return { title: "اعلانات ممولة فيسبوك & انستجرام", href: "/campaign-request" };
  if (channel === "فيديوهات قصيرة" || primaryGoal === "تطوير المحتوى") return { title: "فيديوهات UGC بالذكاء الاصطناعي", href: "/services#ugc-ai-video" };
  if (channel === "حلول AI") return { title: "عرض Gemini PRO + Veo 3 + Google Flow + Nano 🍌 لمدة سنة", href: "/services#ai-subscriptions" };
  if (channel === "صفحة هبوط" || primaryGoal === "إطلاق خدمة جديدة") return { title: "تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية", href: "/services#web-design-platforms" };
  return { title: "مونتاج وترجمة نصية وتنقية صوت للفيديوهات", href: "/services#video-editing" };
}

export default function Services() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = answers.length === quiz.length;
  const recommendation = done ? recommendService(answers) : null;
  const answer = (value: string) => {
    const next = [...answers, value];
    setAnswers(next);
    if (step < quiz.length - 1) setStep(step + 1);
  };

  return <SiteShell>
    <section className="page-hero"><div className="site-container"><span className="eyebrow"><Sparkles className="h-4 w-4" />خدماتنا</span><h1>حلول متصلة، لا مهام منفصلة</h1><p>نحن نرتّب الأدوات والإبداع والأداء داخل مسار يناسب هدف مشروعك. ستجد الخدمات والتجارب الموثقة والتدقيق التسويقي في صفحة مستقلة وواضحة.</p></div></section>
    <section className="site-container py-16">
      <ScrollReveal><div className="services-showcase-heading"><div><span className="eyebrow"><Sparkles className="h-4 w-4" />اختَر مسارًا مناسبًا</span><h2>خدمات واضحة، في بطاقات تليق بعرض الوكالة</h2></div><p>اسحب بين الخدمات، واقرأ الفكرة والنتيجة والخطوة التالية في بطاقة واحدة مرتبة.</p></div><div className="service-strip service-editorial-strip" aria-label="اسحب لاستعراض خدمات MSB Media">{services.map((service, index) => { const Icon = service.icon; const isCampaignService = service.title === "اعلانات ممولة فيسبوك & انستجرام"; return <article id={serviceIdByTitle[service.title]} key={service.title} className={`service-card service-editorial-card ${service.tone} ${service.featured ? "service-card-featured" : ""}`}><figure className="service-visual"><img src={service.visual} loading="eager" decoding="async" alt={`مشهد توضيحي لخدمة ${service.title}`} /></figure><div className="service-editorial-content"><div className="service-editorial-top"><span className="service-number">0{index + 1}</span>{service.offer && <span className="service-offer-label">{service.offer}</span>}<span className="icon-box"><Icon className="h-4 w-4" /></span></div><h2>{service.title}</h2><p className="service-editorial-copy">{service.copy}</p><p className="service-benefit">{service.benefit}</p>{service.tone === "ai" && <div className="service-editorial-tags">{["Gemini PRO", "Google Flow", "Veo 3", "Nano Banana"].map(item => <span key={item}>{item}</span>)}</div>}<div className="service-editorial-footer">{service.price ? <span className="price-badge">{service.price}</span> : <span className="service-step">فكرة واضحة · تنفيذ منظم</span>}{service.featured ? <Link href="/ugc-video" className="service-editorial-action" aria-label="اذهب لتفاصيل خدمة فيديوهات UGC بالذكاء الاصطناعي">اذهب لتفاصيل الخدمة <ArrowLeft className="h-4 w-4" /></Link> : isCampaignService ? <Link href="/campaign-request" className="service-editorial-action">قدّم طلب الحملة <ArrowLeft className="h-4 w-4" /></Link> : <button onClick={() => openWhatsApp(`أريد البدء في خدمة ${service.title}`)} className="service-editorial-action">ابدأ على واتساب <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /><ArrowLeft className="h-4 w-4" /></button>}</div></div></article>; })}</div></ScrollReveal>
      <MediaPlatformRail />
      <ScrollReveal delay={90}><div className="mt-10"><PromoVideo compact /></div></ScrollReveal>
      <ScrollReveal delay={120}><section className="mt-10 rounded-[1.75rem] border border-white/10 bg-[#07133c] p-7 sm:p-9"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow"><Route className="h-4 w-4" />نظام عمل واضح</span><h2 className="mt-4 text-2xl font-black">من أول رسالة إلى خطوة تالية مفهومة</h2></div><p className="max-w-md leading-8 text-slate-300">لا نرمي عليك خدمات كثيرة. نرتب نقطة البداية ثم نحدد ما يساعد مشروعك فعلًا.</p></div><div className="mt-7 grid gap-4 md:grid-cols-3">{["نختار القناة المناسبة للهدف", "ننفذ ونراجع كل خطوة", "نحوّل التعلم إلى قرار تالي"].map(item => <div className="mini-process" key={item}><CheckCircle2 className="h-5 w-5 text-[#ffd400]" />{item}</div>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3"><div className="mini-process">✓ نحدد نطاق العمل قبل عرض السعر</div><div className="mini-process">✓ التواصل يبدأ من واتساب مباشرة</div><div className="mini-process">✓ لا نعرض مراجعات إلا بعد التوثيق</div></div></section></ScrollReveal>
      <ScrollReveal delay={150}><section className="mt-10 grid gap-8 rounded-[1.75rem] border border-white/10 bg-[#020615] p-7 sm:p-9 lg:grid-cols-[.9fr_1.1fr]"><div><span className="eyebrow">تدقيق تسويقي سريع</span><h2 className="mt-4 text-2xl font-black">ثلاث إجابات، ونقطة بداية أوضح</h2><p className="mt-4 leading-8 text-slate-300">اختر إجابة واحدة في كل خطوة لنقترح عليك الخدمة الأقرب لهدف مشروعك.</p><div className="mt-8 flex items-center gap-3 text-sm font-black"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffd400] text-[#020615]">{done ? quiz.length : step + 1}</span><span>الخطوة {done ? quiz.length : step + 1} من {quiz.length}</span></div></div><div className="rounded-[1.25rem] border border-white/10 bg-[#07133c] p-6">{!done ? <><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#ffd400] transition-all duration-200" style={{ width: `${((step + 1) / quiz.length) * 100}%` }} /></div><h3 className="mt-7 text-xl font-black">{quiz[step].question}</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{quiz[step].options.map(option => <button key={option} onClick={() => answer(option)} className="option-button">{option}<ArrowLeft className="h-4 w-4" /></button>)}</div></> : <div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#4a74ff]"><Check className="h-6 w-6" /></span><h3 className="mt-5 text-2xl font-black">تدقيقك التسويقي المبدئي جاهز</h3><p className="mt-3 leading-8 text-slate-300">بناءً على إجاباتك، نوصي أن تبدأ بخدمة <strong className="text-[#ffd400]">{recommendation?.title}</strong>.</p><Link href={recommendation?.href ?? "/services"} className="yellow-button mt-6">ابدأ بـ {recommendation?.title} <ArrowLeft className="h-4 w-4" /></Link><button onClick={() => { setStep(0); setAnswers([]); }} className="mr-4 mt-5 text-sm font-bold text-blue-300">إعادة التدقيق</button></div>}</div></section></ScrollReveal>
      <ScrollReveal delay={180}><section className="mt-10 rounded-[1.75rem] border border-white/10 bg-[#07133c] p-7 sm:p-9"><div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]"><div><span className="eyebrow"><ShieldCheck className="h-4 w-4" />تجارب عملاء موثقة</span><h2 className="mt-4 text-2xl font-black">لقطات حقيقية من متابعة العملاء</h2><p className="mt-3 leading-8 text-slate-300">نعرض هذه اللقطات الحقيقية التي وفرها مالك الوكالة لتوضيح أسلوب المتابعة والمراجعة، مع مراعاة الخصوصية قدر الإمكان.</p><button onClick={() => openWhatsApp("أريد معرفة طريقة العمل والمتابعة في MSB Media")} className="blue-button mt-6"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />تواصل معنا</button></div><div className="services-feedback-grid">{verifiedConversations.map(item => <figure className="services-feedback-card" key={item.image}><img src={item.image} loading="lazy" decoding="async" alt={item.label} /><figcaption><ShieldCheck className="h-3.5 w-3.5" />{item.label}</figcaption></figure>)}</div></div></section></ScrollReveal>
    </section>
  </SiteShell>;
}
