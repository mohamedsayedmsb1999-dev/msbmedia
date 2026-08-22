import { Bot, Clapperboard, Globe2, Headphones, Megaphone, Sparkles } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/201092794169";
export const BRAND_IMAGE = "/manus-storage/msb-brand-founder_c9e9ea0f.png";
export const FOUNDER_IMAGE = "/manus-storage/msb-founder-city_626ec76d.jpg";
export const UGC_VIDEO = "/manus-storage/msb-ugc-sample_6e071991.mp4";

export const services = [
  { title: "Facebook & Instagram Ads", copy: "حملات محسوبة توصل الرسالة للناس المناسبة وتراقب كل نتيجة.", icon: Megaphone, tone: "blue" },
  { title: "Video Editing & Production", copy: "مونتاج وإنتاج سريع الإيقاع يناسب الإعلانات والمحتوى القصير.", icon: Clapperboard, tone: "violet" },
  { title: "AI UGC Content Creation", copy: "أفكار وتنفيذ UGC مرن للمنصات، من الخطاف حتى الدعوة للإجراء.", icon: Sparkles, tone: "yellow" },
  { title: "Voice Noise Reduction & Subtitling", copy: "تنقية صوت، ترجمة، ومزامنة دقيقة حتى تظل الرسالة مفهومة.", icon: Headphones, tone: "cyan" },
  { title: "Web, Platforms & Landing Pages", copy: "واجهات ويب وصفحات هبوط ومنصات تعليمية تتعامل مع هدف التحويل بوضوح.", icon: Globe2, tone: "green" },
  { title: "All-in-One AI Suite", copy: "Gemini PRO (Family Plan)، Google Flow، Veo 3، Nano Banana + Cloud Storage.", icon: Bot, tone: "ai", price: "300 جنيه شهرياً" },
];

export const openWhatsApp = (message: string) => {
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(`مرحبًا MSB Media، ${message}`)}`, "_blank", "noopener,noreferrer");
};
