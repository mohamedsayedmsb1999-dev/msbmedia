import { Bot, Clapperboard, Globe2, Headphones, Megaphone, Sparkles } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/201092794169";
export const BRAND_IMAGE = "/manus-storage/msb-growth-logo_027767c7.jpg";
export const AGENCY_IMAGE = "/manus-storage/msb-media-studio_6114d64c.jpg";
export const FOUNDER_IMAGE = "/manus-storage/mohamed-sayed-founder_6a9073d7.jpg";
export const FOUNDER_CONTEXT_IMAGE = "/manus-storage/mohamed-sayed-context_4e1b43cd.jpg";
export const FOUNDER_AI_IDENTITY_IMAGE = "/manus-storage/msb-founder-ai-identity_90f38285.jpg";
export const UGC_VIDEO = "/manus-storage/ugc-service-5s_80b00fd0.mp4";
export const GEMINI_PRO_OFFER_IMAGE = "/manus-storage/gemini-pro-offer_c98bbe02.jpeg";

const serviceVisuals = {
  ugc: "/manus-storage/service-ugc-storyboard_ff83d037.png",
  web: "/manus-storage/service-web-product_8c9ec553.png",
  campaign: "/manus-storage/service-campaign-planning_6d31911b.png",
  editing: "/manus-storage/service-video-audio-editing_8c0b7739.png",
  content: "/manus-storage/service-content-system_98b43c3b.png",
};

declare global {
  interface Window {
    fbq?: (action: "track", eventName: string, parameters?: Record<string, string | number | boolean>) => void;
  }
}

export const trackMetaEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, parameters);
  }
};

export const services = [
  { title: "فيديوهات UGC بالذكاء الاصطناعي", copy: "للصُنّاع الذين يريدون مشاهدات ومتابعين، ولمقدمي المنتجات أو الخدمات الذين يريدون فيديو يعرض القيمة ويقود إلى خطوة طلب أو تواصل.", benefit: "ابدأ بهوك جذاب، ثم اعرض القيمة، ثم وجّه المشاهد إلى الإجراء المناسب.", icon: Sparkles, tone: "yellow", offer: "الخدمة الأكثر طلبًا", featured: true, visual: serviceVisuals.ugc },
  { title: "تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية", copy: "نبني وجهة رقمية مرتبة تجعل الخطوة التالية واضحة للزائر بدل أن يضيع بين المعلومات.", benefit: "النتيجة: تجربة أوضح تقود للتواصل أو التسجيل.", icon: Globe2, tone: "green", visual: serviceVisuals.web },
  { title: "اعلانات ممولة فيسبوك & انستجرام", copy: "نرتب الرسالة والمحتوى والجمهور المستهدف داخل خطة قابلة للمراجعة قبل بدء الحملة.", benefit: "النتيجة: حملة أكثر تنظيمًا قبل الإطلاق.", icon: Megaphone, tone: "blue", visual: serviceVisuals.campaign },
  { title: "عرض Gemini PRO + Veo 3 + Google Flow + Nano 🍌 لمدة 6 شهور", copy: "عرض خاص لفترة 6 شهور يجمع أدوات الذكاء الاصطناعي التي تساعدك على المحتوى والإنتاج في مسار واحد واضح.", benefit: "النتيجة: استمرارية أدواتك ضمن باقة واحدة بسعر عرض.", icon: Bot, tone: "ai", price: "450 جنيه فقط", offer: "عرض 6 شهور", visual: GEMINI_PRO_OFFER_IMAGE },
  { title: "مونتاج وترجمة نصية وتنقية صوت للفيديوهات", copy: "نرتب المشاهد والصوت والنص ليصبح الفيديو أوضح وأسهل في المتابعة، حتى في المشاهدة الصامتة.", benefit: "النتيجة: رسالة أنظف ومفهومة في مواقف مشاهدة أكثر.", icon: Headphones, tone: "cyan", price: "الترجمة وإزالة الضوضاء: 100 جنيه للفيديو", offer: "سعر الخدمة", visual: serviceVisuals.editing },
];

export const openWhatsApp = (message: string) => {
  trackMetaEvent("Contact", { content_name: "WhatsApp consultation", content_category: "Lead" });
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(`مرحبًا MSB Media، ${message}`)}`, "_blank", "noopener,noreferrer");
};
