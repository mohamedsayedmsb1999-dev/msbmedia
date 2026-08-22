import { Bot, Clapperboard, Globe2, Headphones, Megaphone, Sparkles } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/201092794169";
export const BRAND_IMAGE = "/manus-storage/msb-brand-founder_c9e9ea0f.png";
export const FOUNDER_IMAGE = "/manus-storage/msb-founder-city_626ec76d.jpg";
export const UGC_VIDEO = "/manus-storage/msb-ugc-sample_6e071991.mp4";

export const services = [
  { title: "فيديوهات UGC بالذكاء الاصطناعي", copy: "فيديوهات UGC بالذكاء الاصطناعي", icon: Sparkles, tone: "yellow" },
  { title: "تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية", copy: "تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية", icon: Globe2, tone: "green" },
  { title: "اعلانات ممولة فيسبوك & انستجرام", copy: "اعلانات ممولة فيسبوك & انستجرام", icon: Megaphone, tone: "blue" },
  { title: "اشتراك Gemini PRO", copy: "Veo 3 · Google flow · Nano 🍌", icon: Bot, tone: "ai", price: "300 جنيه شهرياً" },
  { title: "مونتاج و تنقية الصوت وإزالة الضوضاء و ترجمة للفيديوهات", copy: "مونتاج و تنقية الصوت وإزالة الضوضاء و ترجمة للفيديوهات", icon: Headphones, tone: "cyan" },
];

export const openWhatsApp = (message: string) => {
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(`مرحبًا MSB Media، ${message}`)}`, "_blank", "noopener,noreferrer");
};
