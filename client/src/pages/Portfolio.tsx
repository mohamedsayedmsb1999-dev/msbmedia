import SiteShell from "@/components/SiteShell";
import { BarChart3, Layers3, MonitorSmartphone, Sparkles } from "lucide-react";
import { BRAND_IMAGE } from "@/lib/site-data";

const achievements = [
  {
    title: "منظومة محتوى UGC بالذكاء الاصطناعي",
    text: "مسار بصري من الفكرة والسكريبت إلى نسخ متعددة تناسب الإعلان والمحتوى القصير.",
    icon: Sparkles,
    type: "ugc",
    labels: ["SCRIPT", "HOOK", "SHORT FORM"],
  },
  {
    title: "هيكل حملة إعلانية منظم",
    text: "لوحة تخطيط توضح كيف يرتّب فريقنا الرسائل والمواد وأولويات الاختبار.",
    icon: BarChart3,
    type: "campaign",
    labels: ["AUDIENCE", "CREATIVE", "OPTIMIZE"],
  },
  {
    title: "مساحة اشتراكات الذكاء الاصطناعي",
    text: "تنظيم واضح للأدوات التي نستخدمها ضمن اشتراك Gemini PRO وخدمات الإنتاج الذكي.",
    icon: Layers3,
    type: "suite",
    labels: ["Gemini PRO", "Veo 3", "Google flow", "Nano 🍌"],
  },
];

export default function Portfolio() {
  return <SiteShell>
    <section className="page-hero">
      <div className="site-container">
        <span className="eyebrow"><MonitorSmartphone className="h-4 w-4" />سابقة الأعمال · Portfolio</span>
        <h1>لوحات تعرض طريقة عملنا باحتراف</h1>
        <p>ثلاث لوحات توضيحية تعكس بيئة العمل في MSB Media والخدمات التي يبنيها فريق خبرائنا.</p>
      </div>
    </section>
    <section className="site-container py-16 sm:py-20">
      <div className="achievement-grid">
        {achievements.map(item => {
          const Icon = item.icon;
          return <article className={`achievement-card ${item.type}`} key={item.title}>
            <div className="achievement-top"><span className="achievement-icon"><Icon className="h-5 w-5" /></span><img src={BRAND_IMAGE} alt="MSB Media" /></div>
            <div className="achievement-art" aria-hidden="true">
              {item.type === "ugc" && <><div className="phone-frame"><div className="phone-crop"></div><div className="phone-lines"><i></i><i></i><i></i></div></div><div className="script-sheet"><span></span><span></span><span></span><span></span></div></>}
              {item.type === "campaign" && <><div className="campaign-grid"><span className="campaign-a"></span><span className="campaign-b"></span><span className="campaign-c"></span><span className="campaign-d"></span></div><div className="campaign-bars"><i></i><i></i><i></i><i></i><i></i></div></>}
              {item.type === "suite" && <div className="tool-orbs"><span>G</span><span>V3</span><span>F</span><span>🍌</span></div>}
            </div>
            <div className="achievement-content"><div className="achievement-labels">{item.labels.map(label => <span key={label}>{label}</span>)}</div><h2>{item.title}</h2><p>{item.text}</p></div>
            <small>لوحة توضيحية لخدمات MSB Media</small>
          </article>;
        })}
      </div>
    </section>
  </SiteShell>;
}
