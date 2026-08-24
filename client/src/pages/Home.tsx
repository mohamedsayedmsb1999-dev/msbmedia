import { ArrowLeft, BadgeCheck, UsersRound } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { AGENCY_IMAGE, FOUNDER_AI_IDENTITY_IMAGE, openWhatsApp } from "@/lib/site-data";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const verifiedConversations = [
  { image: "/manus-storage/whatsapp-academy-feedback-1_38af68ba.jpg", label: "محادثة واتساب موثقة" },
  { image: "/manus-storage/whatsapp-academy-feedback-2_14c75cc0.jpg", label: "تواصل ومتابعة مباشرة" },
  { image: "/manus-storage/whatsapp-video-feedback_fc1c8b59.jpg", label: "ملاحظات على محتوى فيديو" },
];

export default function Home() {
  return <SiteShell>
    <section className="hero-grid relative overflow-hidden">
      <div className="site-container grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <span className="eyebrow border-white/25 bg-white/10 text-white"><UsersRound className="h-4 w-4" />فريق خبراء لنمو علامتك</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.25] text-white sm:text-6xl">هدفنا الرئيسي <span className="text-[#ffd400]">نجاحك</span> وموجودين هنا عشانك</h1>
          <p className="mt-6 max-w-xl text-base leading-9 text-slate-100 sm:text-lg">نصنع مسارًا واضحًا للمحتوى والإعلانات والمواقع، حتى تنتقل فكرتك من البداية إلى تواصل أو طلب منظم بثقة.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="/services" className="yellow-button">اذهب إلى خدماتنا <ArrowLeft className="h-4 w-4" /></a><button onClick={() => openWhatsApp("أريد حجز استشارة تسويقية")} className="blue-button"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />واتساب</button></div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">{[["8,151+", "عميل"], ["76+", "مجال"], ["6", "صفحات مستقلة"]].map(([number, label]) => <div key={label} className="stat-card"><strong>{number}</strong><span>{label}</span></div>)}</div>
        </div>
        <div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-8 rounded-full bg-[#165ac4]/20 blur-3xl"></div><div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07133c] p-5 shadow-2xl"><img src={AGENCY_IMAGE} alt="هوية MSB Media" className="h-[340px] w-full rounded-[1.4rem] object-cover object-[50%_43%]" /><div className="absolute bottom-7 right-9 left-9 rounded-2xl border border-white/10 bg-[#020615]/85 px-3 py-2.5 backdrop-blur"><p className="text-[9px] font-black tracking-[.12em] text-[#ffd400]">MSB MEDIA</p><p className="mt-1 text-[11px] font-bold leading-4 sm:text-xs">خدمات رقمية ومحتوى وإعلانات ضمن مسار واضح</p></div></div></div>
      </div>
    </section>
    <section className="site-container py-14 sm:py-16"><div className="verified-feedback"><div className="verified-feedback-copy"><span className="eyebrow"><BadgeCheck className="h-4 w-4" />تجارب عملاء موثقة</span><h2>لقطات حقيقية من تواصلنا مع العملاء</h2><p>نعرض هنا أمثلة حقيقية من محادثات أرسلها مالك الوكالة، لتوضيح أسلوب المتابعة والمراجعة أثناء تنفيذ المحتوى والخدمات.</p><button onClick={() => openWhatsApp("أريد معرفة طريقة العمل والمتابعة في MSB Media")} className="blue-button mt-6"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />تواصل معنا</button></div><div className="verified-feedback-grid">{verifiedConversations.map(item => <figure className="verified-feedback-card" key={item.image}><img src={item.image} alt={item.label} /><figcaption><BadgeCheck className="h-3.5 w-3.5" />{item.label}</figcaption></figure>)}</div></div><section className="home-identity-mini"><img src={FOUNDER_AI_IDENTITY_IMAGE} alt="هوية MSB Media الرقمية" /><div><span>مجالات عملنا</span><h2>إعلانات ومحتوى ومواقع وحلول ذكاء اصطناعي</h2><p>نعمل عبر هذه المجالات والأدوات لبناء مسار مناسب لهدفك، وليست هذه شعارات شراكات رسمية.</p><a className="yellow-button" href="/about">اعرف أكثر عن MSB Media <ArrowLeft className="h-4 w-4" /></a></div></section></section>
  </SiteShell>;
}
