import { Bot, Clapperboard, Globe2, Headphones, Megaphone, Sparkles } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/201092794169";
const PUBLIC_ASSET_ORIGIN = "https://msbmedia-fddqd6ca.manus.space";
export const mediaUrl = (fileName: string) => `${PUBLIC_ASSET_ORIGIN}/manus-storage/${fileName}`;
export const BRAND_IMAGE = mediaUrl("msb-growth-logo_027767c7.jpg");
export const AGENCY_IMAGE = mediaUrl("msb-media-studio_6114d64c.jpg");
export const FOUNDER_IMAGE = mediaUrl("mohamed-sayed-founder_6a9073d7.jpg");
export const FOUNDER_CONTEXT_IMAGE = mediaUrl("mohamed-sayed-context_4e1b43cd.jpg");
export const FOUNDER_AI_IDENTITY_IMAGE = mediaUrl("msb-founder-ai-identity_90f38285.jpg");
export const UGC_VIDEO = mediaUrl("ugc-service-5s_80b00fd0.mp4");
export const GEMINI_PRO_OFFER_IMAGE = mediaUrl("gemini-pro-offer_c98bbe02.jpeg");

const serviceVisuals = {
  ugc: mediaUrl("msb-ai-video-ugc-studio-3d_c62a0b66.png"),
  web: mediaUrl("service-web-product_8c9ec553.png"),
  campaign: mediaUrl("service-campaign-planning_6d31911b.png"),
  editing: mediaUrl("service-video-audio-editing_8c0b7739.png"),
  content: mediaUrl("service-content-system_98b43c3b.png"),
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
  { title: "فيديوهات UGC بالذكاء الاصطناعي", copy: "نحوّل فكرتك إلى رسالة قصيرة تبدأ بهوك، وتعرض القيمة، وتنتهي بإجراء واضح يناسب منتجك أو خدمتك.", benefit: "النتيجة: إعلان مركز يسهل فهمه ومشاركته.", icon: Sparkles, tone: "yellow", offer: "الخدمة الأكثر طلبًا", featured: true, visual: serviceVisuals.ugc },
  { title: "تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية", copy: "نصمم تجربة مرتبة توضح العرض وتجمع التسجيلات أو الطلبات في خطوات مريحة على الهاتف والكمبيوتر.", benefit: "النتيجة: واجهة مهنية تقود الزائر للخطوة التالية.", icon: Globe2, tone: "green", visual: serviceVisuals.web },
  { title: "اعلانات ممولة فيسبوك & انستجرام", copy: "نرتب الرسالة والمحتوى والجمهور والهدف في مسار حملة واضح، لتبدأ بقرار محسوب ومتابعة منظمة.", benefit: "النتيجة: حملة واضحة الهدف قبل الإطلاق.", icon: Megaphone, tone: "blue", visual: serviceVisuals.campaign },
  { title: "عرض Gemini PRO + Veo 3 + Google Flow + Nano 🍌 لمدة سنة", copy: "باقة أدوات موحدة تساعدك على تنظيم الأفكار وتجربة صناعة المحتوى ضمن مدة وعرض واضحين.", benefit: "النتيجة: أدواتك الأساسية في باقة واحدة مع 1000 كريدت.", icon: Bot, tone: "ai", price: "400 جنيه فقط · 1000 كريدت", offer: "عرض سنوي", visual: GEMINI_PRO_OFFER_IMAGE },
  { title: "مونتاج وترجمة نصية وتنقية صوت للفيديوهات", copy: "نرتب اللقطات، ننقي الصوت، ونضيف الترجمة النصية لتصل الفكرة بوضوح حتى عند المشاهدة بلا صوت.", benefit: "النتيجة: فيديو أنظف وأسهل في المتابعة.", icon: Headphones, tone: "cyan", price: "الترجمة وإزالة الضوضاء: 100 جنيه للفيديو", offer: "سعر الخدمة", visual: serviceVisuals.editing },
];

export const openWhatsApp = (message: string) => {
  trackMetaEvent("Contact", { content_name: "WhatsApp consultation", content_category: "Lead" });
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(`مرحبًا MSB Media، ${message}`)}`, "_blank", "noopener,noreferrer");
};
