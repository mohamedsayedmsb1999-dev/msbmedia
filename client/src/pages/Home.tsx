import { ArrowLeft, MessageCircle, UsersRound } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { BRAND_IMAGE, openWhatsApp } from "@/lib/site-data";

export default function Home() {
  return <SiteShell>
    <section className="hero-grid relative overflow-hidden">
      <div className="site-container grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <span className="eyebrow"><UsersRound className="h-4 w-4" />فريق خبراء لنمو علامتك</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.25] sm:text-6xl">هدفنا الرئيسي <span className="text-[#4a74ff]">نجاحك</span> وموجودين هنا عشانك</h1>
          <p className="mt-6 max-w-xl text-base leading-9 text-slate-300 sm:text-lg">هذه الصفحة الرئيسية فقط. استخدم الشريط الجانبي للانتقال إلى صفحة الخدمات أو الأعمال أو الدفع أو الدعم أو التعريف بالفريق؛ كل محتوى موجود في صفحة مستقلة حتى تكون التجربة أوضح.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="/services" className="yellow-button">اذهب إلى خدماتنا <ArrowLeft className="h-4 w-4" /></a><button onClick={() => openWhatsApp("أريد حجز استشارة تسويقية")} className="blue-button"><MessageCircle className="h-4 w-4 text-[#25D366]" />واتساب</button></div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">{[["8,151+", "عميل"], ["76+", "مجال"], ["6", "صفحات مستقلة"]].map(([number, label]) => <div key={label} className="stat-card"><strong>{number}</strong><span>{label}</span></div>)}</div>
        </div>
        <div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-8 rounded-full bg-[#5d35ff]/20 blur-3xl"></div><div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07133c] p-5 shadow-2xl"><img src={BRAND_IMAGE} alt="هوية MSB Media" className="h-[340px] w-full rounded-[1.4rem] object-cover object-[50%_43%]" /><div className="absolute bottom-7 right-9 left-9 rounded-2xl border border-white/10 bg-[#020615]/85 px-3 py-2.5 backdrop-blur"><p className="text-[9px] font-black tracking-[.12em] text-[#ffd400]">MSB GROWTH SYSTEM</p><p className="mt-1 text-[11px] font-bold leading-4 sm:text-xs">اختر الصفحة المناسبة من القائمة الجانبية وابدأ بخطوة واضحة</p></div></div></div>
      </div>
    </section>
  </SiteShell>;
}
