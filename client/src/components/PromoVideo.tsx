import { ArrowDownLeft, PlayCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { openWhatsApp } from "@/lib/site-data";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const VIDEO_URL = "/manus-storage/ugc-service-5s_80b00fd0.mp4";
const VIDEO_POSTER = "/manus-storage/service-ugc-storyboard_ff83d037.png";

export default function PromoVideo({ compact = false }: { compact?: boolean }) {
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  return <section className={`promo-video ${compact ? "promo-video-compact" : ""}`}>
    <div className="promo-video-copy">
      <span className="eyebrow"><Sparkles className="h-4 w-4" />تجربة UGC سريعة</span>
      <h2>{compact ? "خمس ثوانٍ تشد الانتباه" : "فكرة سريعة تفتح الطريق إلى خطوة أوضح"}</h2>
      <p>لقطات سريعة وموسيقى حماسية تشرح شكل محتوى UGC الجذاب، ثم تترك لك خطوة تواصل واضحة.</p>
      <small><PlayCircle className="h-4 w-4" />الفيديو يعمل من داخل الموقع</small>
    </div>
    <div className="promo-video-frame">
      {!videoUnavailable ? <video controls playsInline preload="auto" poster={VIDEO_POSTER} onPlay={() => setShowWhatsApp(false)} onEnded={() => setShowWhatsApp(true)} onError={() => setVideoUnavailable(true)} aria-label="تجربة UGC قصيرة قابلة للتشغيل"><source src={VIDEO_URL} type="video/mp4" />متصفحك لا يدعم تشغيل الفيديو.</video> : <div className="promo-video-fallback"><PlayCircle className="h-10 w-10" /><strong>تعذر تحميل الفيديو الآن</strong><span>يمكنك التواصل معنا لمعرفة الخدمة المناسبة.</span></div>}
      <div className="promo-video-status"><span>UGC · 5s</span><span>MSB Media</span></div>
      {showWhatsApp && <button onClick={() => openWhatsApp("شاهدت تجربة UGC وأريد معرفة الخدمة المناسبة لمشروعي")} className="promo-video-whatsapp"><ArrowDownLeft className="promo-arrow h-5 w-5" /><span>ابدأ على واتساب</span><WhatsAppIcon className="h-4 w-4 text-[#25D366]" /></button>}
    </div>
  </section>;
}
