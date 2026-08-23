import { ChevronDown, CircleHelp, MessageCircle, UsersRound } from "lucide-react";
import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import { BRAND_IMAGE, FOUNDER_IMAGE, openWhatsApp } from "@/lib/site-data";

const faqs = [
  { question: "هل لكل خدمة سعر ثابت؟", answer: "لا، معظم الخدمات يتحدد سعرها بعد معرفة نطاق العمل والمخرج المطلوب. الاستثناء هو باقات Gemini PRO الظاهرة بسعرها داخل صفحة الخدمات." },
  { question: "هل يمكن البدء بخدمة واحدة؟", answer: "نعم، يمكن البدء بالخدمة الأقرب لهدفك الحالي ثم توسيع المسار عندما تحتاج ذلك." },
  { question: "كيف أتواصل قبل البدء؟", answer: "يمكنك حجز استشارة أو إرسال نتيجة التدقيق التسويقي إلى واتساب، وسيتابع الفريق معك التفاصيل." },
  { question: "كيف يتم الدفع؟", answer: "تجد Vodafone Cash وBinance Pay في صفحة طرق الدفع، ثم يتم تأكيد التحويل حسب التعليمات المعروضة." },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <SiteShell>
    <section className="page-hero"><div className="site-container"><span className="eyebrow"><UsersRound className="h-4 w-4" />عن MSB Media</span><h1>نحن نبني حضورًا يُفهم ويُقاس</h1><p>هنا تجد تعريف الوكالة وفريق العمل والأسئلة الشائعة، بعيدًا عن الرئيسية حتى تبقى كل صفحة مخصصة لمحتواها.</p></div></section>
    <section className="site-container py-16 sm:py-20"><div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#08102a]"><div className="grid lg:grid-cols-[1.05fr_.95fr]"><div className="p-8 sm:p-12"><span className="eyebrow">فريق MSB Media</span><h2 className="section-title">من خطة مترابطة إلى تنفيذ واضح</h2><p className="mt-5 leading-8 text-slate-300">فريق خبراؤنا يترجم احتياجك إلى خطة رقمية مترابطة بدل خدمات متفرقة. نبدأ بالفهم، ثم ننتج، ثم نراجع الأثر.</p><div className="mt-8 border-t border-white/10 pt-6"><p className="font-serif text-xl tracking-wide text-white">Founded &amp; Directed by Mohamed Sayed</p><p className="mt-2 text-sm text-slate-400">Founder &amp; agency visual</p></div></div><div className="grid grid-cols-2 gap-3 p-4"><figure className="overflow-hidden rounded-2xl border border-white/10"><img src={FOUNDER_IMAGE} alt="Founder Mohamed Sayed" className="h-72 w-full object-cover" /><figcaption className="bg-[#050a1c] px-3 py-2 text-xs font-bold text-slate-300">Founder visual</figcaption></figure><figure className="overflow-hidden rounded-2xl border border-white/10"><img src={BRAND_IMAGE} alt="MSB Media agency visual" className="h-72 w-full object-cover object-[50%_42%]" /><figcaption className="bg-[#050a1c] px-3 py-2 text-xs font-bold text-slate-300">Agency visual</figcaption></figure></div></div></div>
      <div className="mt-14 grid gap-8 lg:grid-cols-[.82fr_1.18fr]"><div><span className="eyebrow"><CircleHelp className="h-4 w-4" />معلومات قبل البداية</span><h2 className="section-title">أسئلة تساعدك تختار بهدوء</h2><p className="mt-4 max-w-sm leading-8 text-slate-300">إجابات مباشرة عن طريقة العمل والأسعار والتواصل، قبل أن تبدأ الاستشارة.</p><button onClick={() => openWhatsApp("لدي سؤال عن خدمات MSB Media")} className="blue-button mt-7"><MessageCircle className="h-4 w-4 text-[#25D366]" />واتساب</button></div><div className="space-y-3">{faqs.map((faq, index) => <article key={faq.question} className="overflow-hidden rounded-2xl border border-white/10 bg-[#07133c]"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 p-5 text-right font-black text-white"><ChevronDown className={`h-5 w-5 shrink-0 text-[#ffd400] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />{faq.question}</button>{openFaq === index && <p className="border-t border-white/10 px-5 py-4 leading-8 text-slate-300">{faq.answer}</p>}</article>)}</div></div>
    </section>
  </SiteShell>;
}
