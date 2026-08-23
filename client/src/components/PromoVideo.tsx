import { ArrowDownLeft, MessageCircle, PlayCircle, Sparkles } from "lucide-react";
import { openWhatsApp } from "@/lib/site-data";

const VIDEO_URL = "/manus-storage/msb-media-ad_02e5c76b.mp4";

export default function PromoVideo({ compact = false }: { compact?: boolean }) {
  return <section className={`promo-video ${compact ? "promo-video-compact" : ""}`}>
    <div className="promo-video-copy">
      <span className="eyebrow"><Sparkles className="h-4 w-4" />إعلان MSB Media</span>
      <h2>{compact ? "شاهد الإعلان وخذ أول خطوة" : "شاهد الفكرة وهي تتحول إلى حضور أقوى"}</h2>
      <p>اضغط تشغيل واكتشف كيف نرتّب المحتوى والإعلانات والذكاء الاصطناعي داخل مسار واحد يخدم هدف مشروعك.</p>
      <small><PlayCircle className="h-4 w-4" />يعمل الفيديو داخل الموقع</small>
    </div>
    <div className="promo-video-frame">
      <video controls playsInline preload="metadata" aria-label="إعلان MSB Media القابل للتشغيل">
        <source src={VIDEO_URL} type="video/mp4" />
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
      <button onClick={() => openWhatsApp("شاهدت إعلان MSB Media وأريد معرفة الخدمة المناسبة لمشروعي")} className="promo-video-whatsapp"><ArrowDownLeft className="promo-arrow h-5 w-5" /><span>تواصل عبر واتساب</span><MessageCircle className="h-4 w-4 text-[#128C4A]" /></button>
    </div>
  </section>;
}
