import { ArrowLeft, BadgeCheck, BrainCircuit, BriefcaseBusiness, LayoutPanelTop, Sparkles, UsersRound } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import HeroStudioImage from "@/components/HeroStudioImage";
import { AGENCY_IMAGE, mediaUrl, openWhatsApp, services } from "@/lib/site-data";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import MediaPlatformRail from "@/components/MediaPlatformRail";
import { Link } from "wouter";

const verifiedConversations = [
  { image: mediaUrl("whatsapp-academy-feedback-2_14c75cc0.jpg"), label: "تواصل ومتابعة مباشرة" },
  { image: mediaUrl("whatsapp-video-feedback_fc1c8b59.jpg"), label: "ملاحظات على محتوى فيديو" },
];

const agencyAchievements = [
  { value: "8,151+", label: "عميل", Icon: UsersRound },
  { value: "76+", label: "مجال", Icon: BriefcaseBusiness },
  { value: "6", label: "صفحات مستقلة", Icon: LayoutPanelTop },
];

const agencyVisualTiles = [
  AGENCY_IMAGE,
  mediaUrl("service-campaign-planning_6d31911b.png"),
  mediaUrl("service-web-product_8c9ec553.png"),
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
          <section className="agency-achievements" aria-label="إنجازات MSB Media"><div className="achievement-label"><BadgeCheck className="h-3.5 w-3.5" />إنجازات الوكالة</div><div className="achievement-list">{agencyAchievements.map(({ value, label, Icon }) => <div key={label} className="achievement-stat"><span className="achievement-icon"><Icon className="h-3.5 w-3.5" /></span><div><strong>{value}</strong><span>{label}</span></div></div>)}</div></section>
          <section className="home-services-rail" aria-label="استكشف خدمات MSB Media"><div className="home-services-rail-heading"><span>خدماتنا</span><strong>اختَر ما يناسب هدفك</strong></div><div className="home-services-rail-list">{services.map(service => { const Icon = service.icon; const isCampaignService = service.title === "اعلانات ممولة فيسبوك & انستجرام"; return <article key={service.title} className="home-service-mini-card"><img src={service.visual} loading="lazy" decoding="async" fetchPriority="low" alt="" /><div><span><Icon className="h-3.5 w-3.5" />{service.title}</span><p>{service.benefit}</p>{service.featured ? <Link href="/ugc-video" aria-label="اذهب لتفاصيل خدمة فيديوهات UGC بالذكاء الاصطناعي">اذهب لتفاصيل الخدمة <ArrowLeft className="h-3.5 w-3.5" /></Link> : isCampaignService ? <Link href="/campaign-request">قدّم طلب الحملة <ArrowLeft className="h-3.5 w-3.5" /></Link> : <button onClick={() => openWhatsApp(`أريد معرفة تفاصيل خدمة ${service.title}`)}>اعرف التفاصيل <ArrowLeft className="h-3.5 w-3.5" /></button>}</div></article>; })}</div><div className="agency-visual-stamps" aria-label="إشارات بصرية لخدمات الوكالة">{agencyVisualTiles.map((image, index) => <img key={image} src={image} loading="lazy" decoding="async" fetchPriority="low" alt={index === 0 ? "تصور بصري لاستوديو وكالة MSB" : ""} />)}</div></section>
        </div>
        <div className="relative mx-auto w-full max-w-md"><div className="hero-media-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07133c] p-5"><HeroStudioImage src={AGENCY_IMAGE} /><div className="hero-caption absolute bottom-7 right-9 left-9 rounded-2xl border border-white/10 bg-[#020615] px-3 py-2.5"><p className="text-[9px] font-black tracking-[.12em] text-[#ffd400]">MSB MEDIA</p><p className="mt-1 text-[11px] font-bold leading-4 sm:text-xs">خدمات رقمية ومحتوى وإعلانات ضمن مسار واضح</p></div></div></div>
      </div>
    </section>
    <section className="home-content site-container pt-2 pb-8"><div className="ai-video-home-entry cursor-not-allowed opacity-85" aria-label="MSB AI Video قريبًا"><span className="ai-video-home-icon"><BrainCircuit className="h-8 w-8" /></span><span className="ai-video-home-copy"><small><Sparkles className="h-3.5 w-3.5" />خدمة جديدة — قريبًا</small><strong>MSB <em>AI</em> Video</strong><span>سيُعلن عن تفاصيل الخدمة عند جاهزيتها.</span></span><span className="rounded-full bg-[#ffd400] px-3 py-1.5 text-sm font-black text-[#020615]">قريبًا</span></div><MediaPlatformRail /></section>
    <section className="home-content site-container py-14 sm:py-16"><div className="verified-feedback"><div className="verified-feedback-copy"><span className="eyebrow"><BadgeCheck className="h-4 w-4" />تجارب عملاء موثقة</span><h2>لقطات حقيقية من تواصلنا مع العملاء</h2><p>نعرض هنا أمثلة حقيقية من محادثات أرسلها مالك الوكالة، لتوضيح أسلوب المتابعة والمراجعة أثناء تنفيذ المحتوى والخدمات.</p><button onClick={() => openWhatsApp("أريد معرفة طريقة العمل والمتابعة في MSB Media")} className="blue-button mt-6"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />تواصل معنا</button></div><div className="verified-feedback-grid">{verifiedConversations.map(item => <figure className="verified-feedback-card" key={item.image}><img src={item.image} loading="lazy" decoding="async" fetchPriority="low" alt={item.label} /><figcaption><BadgeCheck className="h-3.5 w-3.5" />{item.label}</figcaption></figure>)}</div></div></section>
  </SiteShell>;
}
