import { MessageCircle, PlayCircle, Sparkles } from "lucide-react";
import { openWhatsApp } from "@/lib/site-data";

const VIDEO_URL = "/manus-storage/msb-media-ad_02e5c76b.mp4";

export default function PromoVideo({ compact = false }: { compact?: boolean }) {
  return <section className={`promo-video ${compact ? "promo-video-compact" : ""}`}>
    <div className="promo-video-copy">
      <span className="eyebrow"><Sparkles className="h-4 w-4" />إعلان MSB Media</span>
      <h2>{compact ? "شاهد الإعلان وخذ أول خطوة" : "شاهد الفكرة وهي تتحول إلى حضور أقوى"}</h2>
      <p>اضغط تشغيل واكتشف كيف نرتّب المحتوى والإعلانات والذكاء الاصطناعي داخل مسار واحد يخدم هدف مشروعك.</p>
      <button onClick={() => openWhatsApp("شاهدت إعلان MSB Media وأريد معرفة الخدمة المناسبة لمشروعي")} className="yellow-button"><MessageCircle className="h-4 w-4" />تواصل عبر واتساب</button>
      <small><PlayCircle className="h-4 w-4" />يعمل الفيديو داخل الموقع</small>
    </div>
    <div className="promo-video-frame">
      <video controls playsInline preload="metadata" aria-label="إعلان MSB Media القابل للتشغيل">
        <source src={VIDEO_URL} type="video/mp4" />
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
    </div>
  </section>;
}
