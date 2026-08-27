import SiteShell from "@/components/SiteShell";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import MediaPlatformRail from "@/components/MediaPlatformRail";
import { mediaUrl, openWhatsApp } from "@/lib/site-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { AudioLines, Check, CirclePlay, Clapperboard, FileText, MessageCircle, Sparkles, WandSparkles } from "lucide-react";
import "./ugc-color-polish.css";
import "./ugc-pricing-final.css";
import "./ugc-yellow-pricing.css";

const packageContent = {
  ar: [
  {
    name: "Single",
    label: "سنجل",
    price: "1,000 جنيه",
    summary: "3 فيديوهات UGC بالذكاء الاصطناعي",
    popular: false,
    features: ["3 فيديوهات UGC بالذكاء الاصطناعي", "سكريبت احترافي لكل فيديو", "تعديلان مجانيان", "توليد صوت وشخصيات AI واقعية تناسب مجالك", "مدة الفيديو حتى 25 ثانية"],
  },
  {
    name: "Growth",
    label: "Growth",
    price: "1,800 جنيه",
    summary: "الباقة الأكثر طلبًا للحملات التي تحتاج تنوعًا أكبر",
    popular: true,
    features: ["كل مميزات باقة Single", "تنوع في الشخصيات: ذكور / إناث", "لهجات مختلفة حسب اختيارك", "سكريبت احترافي وتعديلان مجانيان", "توليد صوت وشخصيات AI واقعية تناسب مجالك"],
  },
  {
    name: "Pro",
    label: "Pro",
    price: "3,400 جنيه",
    summary: "12 فيديو UGC بالذكاء الاصطناعي",
    popular: false,
    features: ["12 فيديو UGC بالذكاء الاصطناعي", "سكريبت احترافي لكل فيديو", "تعديلان مجانيان", "تنوع في الشخصيات: ذكور / إناث", "لهجات مختلفة حسب اختيارك", "توليد صوت وشخصيات AI واقعية تناسب مجالك", "مدة الفيديو حتى 40 ثانية"],
  },
  ],
  en: [
    { name: "Single", label: "Single", price: "EGP 1,000", summary: "3 AI-generated UGC videos", popular: false, features: ["3 AI-generated UGC videos", "A professional script for every video", "Two free revisions", "AI voice and realistic characters matched to your niche", "Up to 25 seconds per video"] },
    { name: "Growth", label: "Growth", price: "EGP 1,800", summary: "Our most requested package for campaigns needing more variety", popular: true, features: ["All Single package features", "Character variety: male / female", "Different accents to match your choice", "Professional scripts and two free revisions", "AI voice and realistic characters matched to your niche"] },
    { name: "Pro", label: "Pro", price: "EGP 3,400", summary: "12 AI-generated UGC videos", popular: false, features: ["12 AI-generated UGC videos", "A professional script for every video", "Two free revisions", "Character variety: male / female", "Different accents to match your choice", "AI voice and realistic characters matched to your niche", "Up to 40 seconds per video"] },
  ],
} as const;

const sampleContent = {
  ar: [
  {
    title: "إرشادات لصانع المحتوى",
    description: "نموذج عمودي يعرض إيقاع الفيديو القصير للمحتوى والسوشيال.",
    src: mediaUrl("msb-demo-guidance-vertical_89387343.mp4"),
    poster: mediaUrl("creator_be5e205f.jpg"),
    ratio: "عمودي 9:16",
  },
  {
    title: "فيديو منتج بأسلوب UGC",
    description: "نموذج عرضي يوضح طريقة تقديم منتج أو خدمة بلقطات مركزة.",
    src: mediaUrl("msb-demo-product-horizontal_a1b8f29e.mp4"),
    poster: mediaUrl("ai_3af8700b.jpg"),
    ratio: "عرضي 16:9",
  },
  ],
  en: [
    { title: "Creator guidance", description: "A vertical example that shows the fast pace used for short-form and social content.", src: mediaUrl("msb-demo-guidance-vertical_89387343.mp4"), poster: mediaUrl("creator_be5e205f.jpg"), ratio: "Vertical 9:16" },
    { title: "UGC product video", description: "A horizontal example of presenting a product or service through focused shots.", src: mediaUrl("msb-demo-product-horizontal_a1b8f29e.mp4"), poster: mediaUrl("ai_3af8700b.jpg"), ratio: "Horizontal 16:9" },
  ],
} as const;

export default function UgcVideoService() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const packages = packageContent[language];
  const samples = sampleContent[language];
  return <SiteShell>
    <main className="ugc-details-page">
      <section className="ugc-details-hero">
        <div className="site-container ugc-details-hero-grid">
          <div className="ugc-details-hero-copy">
            <span className="ugc-details-kicker"><Sparkles className="h-4 w-4" />{isArabic ? "خدمة محتوى وإعلانات" : "Content & advertising service"}</span>
            <h1>{isArabic ? <>فيديوهات <em>UGC</em> بالذكاء الاصطناعي</> : <><em>AI UGC</em> video production</>}</h1>
            <p>{isArabic ? "نحوّل فكرتك إلى فيديو قصير يبدأ بخطاف واضح، يشرح الفائدة، ويقود العميل إلى الخطوة المناسبة لمنتجك أو خدمتك." : "We turn your idea into a short video with a clear hook, a focused benefit, and a next step for your product or service."}</p>
            <div className="ugc-details-hero-actions">
              <a href="#ugc-packages" className="yellow-button">{isArabic ? "شاهد الباقات" : "View packages"} <WandSparkles className="h-4 w-4" /></a>
              <button onClick={() => openWhatsApp(isArabic ? "أريد معرفة تفاصيل خدمة فيديوهات UGC بالذكاء الاصطناعي لمجالي." : "I would like details about AI UGC video production for my niche.")} className="ugc-details-outline-action"><WhatsAppIcon className="h-4 w-4" />{isArabic ? "اسأل فريقنا على واتساب" : "Ask our team on WhatsApp"}</button>
            </div>
            <div className="ugc-details-trust-row"><span>{isArabic ? "سكريبت احترافي" : "Professional script"}</span><span>{isArabic ? "تعديلات منظمة" : "Structured revisions"}</span><span>{isArabic ? "صوت وشخصيات مناسبة لمجالك" : "Voice and characters for your niche"}</span></div>
          </div>
          <div className="ugc-details-hero-media ugc-hero-studio-art" aria-label="تصميم بصري لاستوديو إنتاج فيديوهات UGC">
            <div className="ugc-hero-art-reel"><Clapperboard className="h-10 w-10" /><b>UGC</b><i /></div>
            <div className="ugc-hero-art-script"><FileText className="h-8 w-8" /><i /><i /><i /></div>
            <div className="ugc-hero-art-sound"><AudioLines className="h-8 w-8" /><span /><span /><span /><span /></div>
            <span><CirclePlay className="h-4 w-4" />UGC CONTENT STUDIO</span>
          </div>
        </div>
      </section>

      <section className="site-container"><MediaPlatformRail /></section>
      <section id="ugc-packages" className="site-container ugc-package-section">
          <div className="ugc-section-heading"><span className="eyebrow">{isArabic ? "باقات الفيديوهات" : "Video packages"}</span><h2>{isArabic ? "اختر الباقة التي تناسب احتياجك" : "Choose the package that fits your needs"}</h2><p>{isArabic ? "اضغط على الباقة التي تريدها ليُفتح واتساب برسالة واضحة باسم الباقة وخدمة فيديوهات UGC." : "Choose a package to open WhatsApp with a clear message containing the package name and UGC service."}</p></div>
        <div className="ugc-package-grid">{packages.map(plan => <article className={`ugc-package-card ${plan.popular ? "is-popular" : ""}`} key={plan.name}>
          {plan.popular ? <span className="ugc-popular-badge">{isArabic ? "الأكثر طلبًا" : "Most requested"}</span> : null}
          <div className="ugc-package-art" aria-hidden="true"><div className="ugc-package-art-reel"><Clapperboard className="h-7 w-7" /><b>UGC</b></div><div className="ugc-package-art-script"><FileText className="h-7 w-7" /><i /><i /><i /></div><div className="ugc-package-art-sound"><AudioLines className="h-7 w-7" /><span /><span /><span /></div></div>
          <div className="ugc-package-heading"><span>{plan.label}</span><strong>{plan.name}</strong></div>
          <p className="ugc-package-price">{plan.price}</p>
          <p className="ugc-package-summary">{plan.summary}</p>
          <div className="ugc-package-indicators" aria-label={isArabic ? "مؤشرات مميزات الباقة" : "Package feature indicators"}><span><Clapperboard className="h-3.5 w-3.5" />{isArabic ? "فيديو" : "Video"}</span><span><FileText className="h-3.5 w-3.5" />{isArabic ? "سكريبت" : "Script"}</span><span><AudioLines className="h-3.5 w-3.5" />{isArabic ? "صوت" : "Voice"}</span></div>
          <ul>{plan.features.map(feature => <li key={feature}><Check className="h-4 w-4" />{feature}</li>)}</ul>
          <button onClick={() => openWhatsApp(isArabic ? `أرغب في باقة ${plan.name} لخدمة فيديوهات UGC بالذكاء الاصطناعي بسعر ${plan.price}. أحتاج معرفة الخطوة التالية.` : `I am interested in the ${plan.name} AI UGC package at ${plan.price}. Please tell me the next step.`)} className="ugc-package-cta"><WhatsAppIcon className="h-4 w-4" />{isArabic ? `اختر باقة ${plan.name}` : `Choose ${plan.name}`}</button>
        </article>)}</div>
      </section>

      <section className="ugc-sample-section">
        <div className="site-container"><div className="ugc-section-heading"><span className="eyebrow">{isArabic ? "نماذج توضيحية" : "Examples"}</span><h2>{isArabic ? "شاهد أسلوب الفيديو قبل التواصل" : "See the video style before you contact us"}</h2><p>{isArabic ? "هذه نماذج مقدمة من فريق MSB للتوضيح، وتعمل يدويًا من داخل الصفحة دون تشغيل تلقائي." : "These examples are provided by the MSB team and play manually without autoplay."}</p></div><div className="ugc-sample-grid">{samples.map(sample => <figure className="ugc-sample-card" key={sample.title}><div className="ugc-sample-video"><video controls playsInline preload="metadata" poster={sample.poster} controlsList="nodownload noremoteplayback" disablePictureInPicture onContextMenu={event => event.preventDefault()}><source src={sample.src} type="video/mp4" />{isArabic ? "متصفحك لا يدعم تشغيل الفيديو." : "Your browser does not support video playback."}</video><span>{sample.ratio}</span></div><figcaption><h3>{sample.title}</h3><p>{sample.description}</p></figcaption></figure>)}</div></div>
      </section>

      <section className="site-container ugc-details-final"><div><span className="eyebrow"><MessageCircle className="h-4 w-4" />{isArabic ? "خطوة البداية" : "First step"}</span><h2>{isArabic ? "جاهز نرتّب فيديوهاتك حسب مجالك؟" : "Ready to plan your videos around your niche?"}</h2><p>{isArabic ? "أرسل اسم الباقة وفكرة منتجك أو خدمتك، وفريقنا يتابع معك التفاصيل المناسبة." : "Send your package name and your product or service idea, and our team will guide you through the details."}</p></div><img className="ugc-details-final-image" src={mediaUrl("service-video-audio-editing_8c0b7739.png")} loading="lazy" decoding="async" alt={isArabic ? "تصور بصري لصناعة محتوى UGC" : "Visual for UGC content production"} /><button onClick={() => openWhatsApp(isArabic ? "أريد بدء طلب فيديوهات UGC بالذكاء الاصطناعي." : "I would like to start an AI UGC video request.")} className="yellow-button"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />{isArabic ? "ابدأ على واتساب" : "Start on WhatsApp"}</button></section>
    </main>
  </SiteShell>;
}
