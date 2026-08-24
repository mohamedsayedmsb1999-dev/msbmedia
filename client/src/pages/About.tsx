import { ChevronDown, CircleHelp, MessageCircle, UsersRound } from "lucide-react";
import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import { BRAND_IMAGE, FOUNDER_AI_IDENTITY_IMAGE, FOUNDER_CONTEXT_IMAGE, FOUNDER_IMAGE, openWhatsApp } from "@/lib/site-data";

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
    <section className="site-container py-16 sm:py-20">
      <section className="about-identity-feature"><img src={FOUNDER_AI_IDENTITY_IMAGE} alt="Mohamed Sayed ضمن هوية رقمية لخدمات MSB Media" /><div><span className="eyebrow">رؤية رقمية متكاملة</span><h2>من الإعلانات والمحتوى إلى المواقع وحلول الذكاء الاصطناعي</h2><p>نستخدم هذه المجالات والأدوات لتصميم مسار يناسب هدفك. ظهور أسماء المنصات هنا للتعريف بمجالات العمل والأدوات، وليس إعلانًا عن شراكة رسمية.</p></div></section>
      <div className="founder-panel mt-10"><div className="grid lg:grid-cols-[1.03fr_.97fr]"><div className="p-8 sm:p-12"><span className="eyebrow">مؤسس MSB Media</span><h2 className="section-title text-[#071b48]">Mohamed Sayed<br /><span className="text-[#165ac4]">خبرة تركز على النتيجة أولًا</span></h2><p className="mt-5 leading-8 text-slate-700">Mohamed Sayed هو مؤسس MSB Media، بخبرة تتجاوز 15 سنة في العمل عبر الإنترنت، والإعلانات، والمونتاج، وتصميم المواقع وصفحات الهبوط، والدروبشيبنج، والتجارة الإلكترونية، وصناعة المحتوى.</p><div className="founder-skills"><span>إعلانات رقمية</span><span>مونتاج ومحتوى</span><span>مواقع وصفحات هبوط</span><span>تجارة إلكترونية</span></div><div className="mt-8 border-t border-blue-100 pt-6"><p className="font-serif text-xl tracking-wide text-[#071b48]">Founded &amp; Directed by Mohamed Sayed</p><p className="mt-2 text-sm text-slate-600">مؤسس الوكالة وقائد توجهها الإبداعي والرقمي.</p></div></div><div className="founder-media"><figure className="founder-portrait"><img src={FOUNDER_IMAGE} alt="Mohamed Sayed، مؤسس MSB Media" /><figcaption><strong>Mohamed Sayed</strong><span>Founder · MSB Media</span></figcaption></figure><figure className="agency-visual"><img src={FOUNDER_CONTEXT_IMAGE} alt="Mohamed Sayed ضمن هوية MSB Media" /><figcaption><img src={BRAND_IMAGE} alt="شعار MSB Media" /><span>MSB Media Agency</span></figcaption></figure></div></div></div>
      <div className="mt-14 grid gap-8 lg:grid-cols-[.82fr_1.18fr]"><div><span className="eyebrow"><CircleHelp className="h-4 w-4" />معلومات قبل البداية</span><h2 className="section-title text-[#071b48]">أسئلة تساعدك تختار بهدوء</h2><p className="mt-4 max-w-sm leading-8 text-slate-600">إجابات مباشرة عن طريقة العمل والأسعار والتواصل، قبل أن تبدأ الاستشارة.</p><button onClick={() => openWhatsApp("لدي سؤال عن خدمات MSB Media")} className="blue-button mt-7"><MessageCircle className="h-4 w-4 text-[#25D366]" />واتساب</button></div><div className="space-y-3">{faqs.map((faq, index) => <article key={faq.question} className="overflow-hidden rounded-2xl border border-white/10 bg-[#07133c]"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 p-5 text-right font-black text-white"><ChevronDown className={`h-5 w-5 shrink-0 text-[#ffd400] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />{faq.question}</button>{openFaq === index && <p className="border-t border-white/10 px-5 py-4 leading-8 text-slate-300">{faq.answer}</p>}</article>)}</div></div>
    </section>
  </SiteShell>;
}
