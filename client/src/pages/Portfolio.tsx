import { ArrowLeft, Layers3, MonitorSmartphone, Sparkles } from "lucide-react";
import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import { AGENCY_IMAGE, BRAND_IMAGE, openWhatsApp, UGC_VIDEO } from "@/lib/site-data";
import WhatsAppIcon from "@/components/WhatsAppIcon";

type Showcase = {
  title: string;
  category: string;
  image?: string;
  video?: string;
  imageAlt: string;
  summary: string;
  benefit: string;
  steps: string[];
};

const showcases: Showcase[] = [
  { title: "فيديوهات UGC جذابة للعرض القصير", category: "محتوى UGC بالذكاء الاصطناعي", video: UGC_VIDEO, imageAlt: "فيديو UGC معروض من MSB Media", summary: "نرتب الفكرة والهوك والرسالة في فيديو قصير يساعد صاحب المشروع على عرض منتجه أو خدمته بصورة أسرع وأوضح.", benefit: "الفائدة: رسالة مرئية تشد الانتباه وتشرح الفكرة بسرعة.", steps: ["Hook واضح", "رسالة مركزة", "تنسيق للمحتوى القصير"] },
  { title: "إعلانات منظمة من الرسالة إلى المراجعة", category: "إعلانات Facebook وInstagram", image: "/manus-storage/service-campaign-planning_6d31911b.png", imageAlt: "نموذج توضيحي لتخطيط حملة إعلانية", summary: "نرتب الجمهور والرسالة والمواد الإعلانية وخطوات المراجعة في لوحة واضحة قبل بداية الحملة.", benefit: "الفائدة: خطة إعلان مفهومة وقابلة للمراجعة قبل الإنفاق.", steps: ["رسالة الحملة", "اختيار الجمهور", "مواد واختبارات"] },
  { title: "مواقع وصفحات هبوط تقود لخطوة واضحة", category: "تصميم مواقع وصفحات هبوط", image: "/manus-storage/service-web-product_8c9ec553.png", imageAlt: "نموذج توضيحي لموقع وصفحة هبوط", summary: "نبني واجهة مرتبة توصل القيمة وتساعد الزائر على الوصول للتواصل أو التسجيل دون تشتت.", benefit: "الفائدة: تجربة أوضح للعميل من أول زيارة.", steps: ["هوية واضحة", "محتوى منظم", "دعوة تواصل مباشرة"] },
  { title: "منصات تعليمية تعرض المعرفة بشكل مفهوم", category: "منصات تعليمية وأكاديمية", image: "/manus-storage/service-content-system_98b43c3b.png", imageAlt: "نموذج توضيحي لتنظيم المحتوى والمنصات التعليمية", summary: "ننظم الدروس والمواد والخطوات داخل تجربة تساعد المتعلم على الوصول للمحتوى المطلوب بسهولة.", benefit: "الفائدة: رحلة تعلم أهدأ ومحتوى أسهل في المتابعة.", steps: ["هيكل دروس", "محتوى منظم", "رحلة مستخدم واضحة"] },
];

export default function Portfolio() {
  const [videoCtaIndex, setVideoCtaIndex] = useState<number | null>(null);
  return <SiteShell>
    <section className="page-hero"><div className="site-container"><span className="eyebrow"><MonitorSmartphone className="h-4 w-4" />سابقة الأعمال · Portfolio</span><h1>خدمات مرئية تشرح ما يحصل عليه مشروعك</h1><p>نعرض هنا نماذج للخدمات التي يقدمها فريق MSB Media: فيديوهات UGC وإعلانات ومواقع ومنصات تعليمية. لا ننسب نتيجة أو مشروعًا لعميل محدد إلا بدليل وموافقة على النشر.</p></div></section>
    <section className="site-container py-16 sm:py-20">
      <div className="portfolio-intro"><img src={AGENCY_IMAGE} alt="بيئة MSB Media" /><div><span className="eyebrow"><Sparkles className="h-4 w-4" />نماذج من خدماتنا</span><h2>الفائدة أولًا، ثم الخطوة التالية</h2><p>كل بطاقة تشرح نوع الخدمة وما يمكن أن تقدمه لصاحب المشروع، مع نموذج مرئي مختصر يساعد على فهم الفكرة.</p></div></div>
      <div className="case-study-list">{showcases.map((showcase, index) => <article className="case-study" key={showcase.title}><figure className="case-study-media">{showcase.video ? <video src={showcase.video} poster="/manus-storage/service-ugc-storyboard_ff83d037.png" controls playsInline preload="auto" onPlay={() => setVideoCtaIndex(null)} onEnded={() => setVideoCtaIndex(index)} /> : <img src={showcase.image} alt={showcase.imageAlt} />}{showcase.video && videoCtaIndex === index && <button onClick={() => openWhatsApp("شاهدت تجربة UGC وأريد البدء")} className="case-study-video-cta"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />ابدأ على واتساب</button>}<figcaption>{showcase.video ? "تجربة UGC مختصرة · 5 ثوانٍ" : "نموذج توضيحي للخدمة"}</figcaption></figure><div className="case-study-copy"><div className="case-study-top"><span>0{index + 1}</span><p>{showcase.category}</p></div><h2>{showcase.title}</h2><p className="case-study-summary">{showcase.summary}</p><p className="case-study-benefit">{showcase.benefit}</p><div className="case-study-steps">{showcase.steps.map(step => <span key={step}>{step}</span>)}</div><button onClick={() => openWhatsApp(`أريد مناقشة خدمة: ${showcase.category}`)} className="case-study-button">ناقش هذه الخدمة <ArrowLeft className="h-4 w-4" /></button></div><img className="case-study-brand" src={BRAND_IMAGE} alt="MSB Media" /></article>)}</div>
      <div className="portfolio-note"><Layers3 className="h-5 w-5" /><p><b>ملاحظة مهنية:</b> عند توفير لقطات أو نتائج حقيقية تملك حق عرضها، نضيفها في نفس التنسيق مع تفاصيل موثقة.</p></div>
    </section>
  </SiteShell>;
}
