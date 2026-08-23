import SiteShell from "@/components/SiteShell";
import PromoVideo from "@/components/PromoVideo";
import ScrollReveal from "@/components/ScrollReveal";
import { openWhatsApp, services } from "@/lib/site-data";
import { ArrowLeft, CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

export default function Services() {
  return <SiteShell>
    <section className="page-hero"><div className="site-container"><span className="eyebrow"><Sparkles className="h-4 w-4" />خدماتنا</span><h1>حلول متصلة، لا مهام منفصلة</h1><p>نحن نرتّب الأدوات والإبداع والأداء داخل مسار يناسب هدف مشروعك.</p></div></section>
    <section className="site-container py-16">
      <ScrollReveal><div className="service-grid">{services.map(service => { const Icon = service.icon; return <article key={service.title} className={`service-card ${service.tone}`}><div className="flex items-start justify-between gap-3"><span className="icon-box"><Icon className="h-6 w-6" /></span>{service.price && <span className="price-badge">{service.price}</span>}</div><div className="mt-6 flex items-start gap-3"><span className="mt-0.5 text-[#ffd400]"><Icon className="h-5 w-5" /></span><h2 className="mt-0">{service.title}</h2></div><p>{service.copy}</p>{service.tone === "ai" && <div className="mt-5 flex flex-wrap gap-2">{["Gemini PRO", "Google Flow", "Veo 3", "Nano Banana", "Cloud Storage"].map(item => <span className="ai-badge" key={item}>{item}</span>)}</div>}<button onClick={() => openWhatsApp(`أريد البدء في خدمة ${service.title}`)} className="mt-7 inline-flex items-center gap-2 text-sm font-black">ابدأ <ArrowLeft className="h-4 w-4" /></button></article>; })}</div></ScrollReveal>
      <ScrollReveal delay={90}><div className="mt-10"><PromoVideo compact /></div></ScrollReveal>
      <ScrollReveal delay={140}><div className="mt-8 grid gap-4 md:grid-cols-3">{["نختار القناة المناسبة للهدف", "ننفذ ونراجع كل خطوة", "نحوّل التعلم إلى قرار تالي"].map(item => <div className="mini-process" key={item}><CheckCircle2 className="h-5 w-5 text-[#ffd400]" />{item}</div>)}</div></ScrollReveal>
      <ScrollReveal delay={180}><section className="mt-14 rounded-[1.75rem] border border-white/10 bg-[#07133c] p-7 sm:p-9"><div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]"><div><span className="eyebrow"><ShieldCheck className="h-4 w-4" />مراجعات العملاء</span><h2 className="mt-4 text-2xl font-black">رأيك الحقيقي له مكانه هنا</h2><p className="mt-3 leading-8 text-slate-300">نعرض مراجعات العملاء الحقيقية فقط بعد التحقق من مصدرها وموافقة صاحبها على النشر.</p><button onClick={() => openWhatsApp("أريد مشاركة مراجعتي الموثقة مع MSB Media")} className="blue-button mt-6"><MessageCircle className="h-4 w-4 text-[#25D366]" />تواصل معنا</button></div><div className="flex min-h-48 items-center rounded-2xl border border-dashed border-white/20 bg-[#020615]/55 p-6"><div><p className="font-black text-white">مساحة للمراجعات المعتمدة</p><p className="mt-2 text-sm leading-7 text-slate-400">لن يتم إنشاء تعليقات أو تقييمات تجريبية هنا. أضف لاحقًا آراء عملاء حقيقية مع اسم أو وصف معتمد وموافقة على النشر.</p></div></div></div></section></ScrollReveal>
    </section>
  </SiteShell>;
}
