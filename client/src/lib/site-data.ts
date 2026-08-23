import { Bot, Clapperboard, Globe2, Headphones, Megaphone, Sparkles } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/201092794169";
export const BRAND_IMAGE = "https://msbmedia-fddqd6ca.manus.space/manus-storage/msb-brand-founder_d46d751b.png";
export const FOUNDER_IMAGE = "/manus-storage/msb-founder-city_626ec76d.jpg";
export const UGC_VIDEO = "/manus-storage/msb-ugc-sample_6e071991.mp4";

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
  { title: "فيديوهات UGC بالذكاء الاصطناعي", copy: "فيديوهات UGC بالذكاء الاصطناعي", icon: Sparkles, tone: "yellow" },
  { title: "تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية", copy: "تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية", icon: Globe2, tone: "green" },
  { title: "اعلانات ممولة فيسبوك & انستجرام", copy: "اعلانات ممولة فيسبوك & انستجرام", icon: Megaphone, tone: "blue" },
  { title: "اشتراك Gemini PRO", copy: "Veo 3 · Google flow · Nano 🍌", icon: Bot, tone: "ai", price: "300 جنيه شهرياً" },
  { title: "اشتراك Gemini PRO Veo 3 Google flow nano 🍌 لمدة 6 شهور", copy: "باقة أدوات ذكاء اصطناعي لفترة 6 شهور، تجمع الاستخدامات التي تساعدك على المحتوى والإنتاج داخل مسار واحد.", icon: Bot, tone: "ai", price: "450 جنيه فقط" },
  { title: "مونتاج و تنقية الصوت وإزالة الضوضاء و ترجمة للفيديوهات", copy: "مونتاج و تنقية الصوت وإزالة الضوضاء و ترجمة للفيديوهات", icon: Headphones, tone: "cyan" },
  { title: "الترجمة النصية وإزالة الضوضاء للصوت", copy: "ترجمة نصية أوضح وتنقية للصوت تساعد الفيديو على الوصول برسالة أنظف ومباشرة.", icon: Clapperboard, tone: "yellow", price: "100 EGB للفيديو الواحد" },
];

export const openWhatsApp = (message: string) => {
  trackMetaEvent("Contact", { content_name: "WhatsApp consultation", content_category: "Lead" });
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(`مرحبًا MSB Media، ${message}`)}`, "_blank", "noopener,noreferrer");
};
