import { ChevronDown, CircleHelp, MessageCircle, UsersRound } from "lucide-react";
import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import { BRAND_IMAGE, FOUNDER_AI_IDENTITY_IMAGE, FOUNDER_CONTEXT_IMAGE, FOUNDER_IMAGE, openWhatsApp } from "@/lib/site-data";
import { useLanguage } from "@/contexts/LanguageContext";

const faqContent = {
  ar: [
  { question: "ما باقات فيديوهات UGC بالذكاء الاصطناعي؟", answer: "تجد باقات Single وGrowth وPro داخل صفحة تفاصيل خدمة UGC، مع المزايا الكاملة وسعر كل باقة وزر واتساب مباشر لاختيار الأنسب لك." },
  { question: "كيف أطلب إدارة إعلان فيسبوك أو إنستجرام؟", answer: "من بطاقة الإعلانات الممولة اضغط تقديم طلب الحملة، واكتب بيانات نشاطك وهدفك والميزانية المتوقعة. يظهر تأكيد بعد حفظ الطلب ويمكنك متابعة التفاصيل على واتساب." },
  { question: "هل منصة MSB AI Video متاحة الآن؟", answer: "المنصة قيد التجهيز حاليًا وتظهر بحالة قريبًا. خدمة فيديوهات UGC بالذكاء الاصطناعي متاحة حاليًا من خلال صفحة تفاصيل الخدمة." },
  { question: "كيف أتواصل قبل البدء؟", answer: "يمكنك فتح واتساب مباشرة، أو استخدام التدقيق السريع لتظهر لك الخدمة الأقرب لهدفك ثم الانتقال إلى تفاصيلها." },
  ],
  en: [
    { question: "What AI UGC video packages are available?", answer: "You can find the Single, Growth, and Pro packages on the UGC service page, with full benefits, each package price, and a direct WhatsApp action." },
    { question: "How do I request Facebook or Instagram ad management?", answer: "Open the campaign request from the paid ads card and provide your business details, objective, and expected budget. You will receive confirmation after the request is saved and can continue the discussion on WhatsApp." },
    { question: "Is MSB AI Video available now?", answer: "The platform is currently being prepared and is marked as coming soon. AI UGC video production is available now through its service details page." },
    { question: "How can I contact the team before starting?", answer: "You can open WhatsApp directly, or use the quick audit to find the service closest to your goal and then open its details." },
  ],
} as const;

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const faqs = faqContent[language];
  return <SiteShell>
    <section className="page-hero"><div className="site-container"><span className="eyebrow"><UsersRound className="h-4 w-4" />{isArabic ? "عن MSB Media" : "About MSB Media"}</span><h1>{isArabic ? "نحن نبني حضورًا يُفهم ويُقاس" : "We build a presence people understand"}</h1><p>{isArabic ? "هنا تجد تعريف الوكالة وفريق العمل والأسئلة الشائعة، بعيدًا عن الرئيسية حتى تبقى كل صفحة مخصصة لمحتواها." : "Discover the agency, its team, and key questions in one focused page."}</p></div></section>
    <section className="site-container py-16 sm:py-20">
      <section className="about-identity-feature"><img src={FOUNDER_AI_IDENTITY_IMAGE} alt="Mohamed Sayed ضمن هوية رقمية لخدمات MSB Media" /><div><span className="eyebrow">رؤية رقمية متكاملة</span><h2>من الإعلانات والمحتوى إلى المواقع وحلول الذكاء الاصطناعي</h2><p>نستخدم هذه المجالات والأدوات لتصميم مسار يناسب هدفك. ظهور أسماء المنصات هنا للتعريف بمجالات العمل والأدوات، وليس إعلانًا عن شراكة رسمية.</p></div></section>
      <div className="founder-panel mt-10"><div className="grid lg:grid-cols-[1.03fr_.97fr]"><div className="p-8 sm:p-12"><span className="eyebrow">مؤسس MSB Media</span><h2 className="about-heading section-title">Mohamed Sayed<br /><span className="about-accent">خبرة تركز على النتيجة أولًا</span></h2><p className="about-copy mt-5 leading-8">Mohamed Sayed هو مؤسس MSB Media، بخبرة تتجاوز 15 سنة في العمل عبر الإنترنت، والإعلانات، والمونتاج، وتصميم المواقع وصفحات الهبوط، والدروبشيبنج، والتجارة الإلكترونية، وصناعة المحتوى.</p><div className="founder-skills"><span>إعلانات رقمية</span><span>مونتاج ومحتوى</span><span>مواقع وصفحات هبوط</span><span>تجارة إلكترونية</span></div><div className="about-signature mt-8 pt-6"><p className="font-serif text-xl tracking-wide">Founded &amp; Directed by Mohamed Sayed</p><p className="mt-2 text-sm">مؤسس الوكالة وقائد توجهها الإبداعي والرقمي.</p></div></div><div className="founder-media"><figure className="founder-portrait"><img src={FOUNDER_IMAGE} alt="Mohamed Sayed، مؤسس MSB Media" /><figcaption><strong>Mohamed Sayed</strong><span>Founder · MSB Media</span></figcaption></figure><figure className="agency-visual"><img src={FOUNDER_CONTEXT_IMAGE} alt="Mohamed Sayed ضمن هوية MSB Media" /><figcaption><img src={BRAND_IMAGE} alt="شعار MSB Media" /><span>MSB Media Agency</span></figcaption></figure></div></div></div>
      <div className="about-faq mt-14 grid gap-8 lg:grid-cols-[.82fr_1.18fr]"><div><span className="eyebrow"><CircleHelp className="h-4 w-4" />{isArabic ? "معلومات قبل البداية" : "Before you start"}</span><h2 className="about-heading section-title">{isArabic ? "أسئلة تساعدك تختار بهدوء" : "Questions to help you choose"}</h2><p className="about-copy mt-4 max-w-sm leading-8">{isArabic ? "إجابات مباشرة عن طريقة العمل والأسعار والتواصل، قبل أن تبدأ الاستشارة." : "Clear answers about the process, packages, and contact options before your consultation."}</p><button onClick={() => openWhatsApp(isArabic ? "لدي سؤال عن خدمات MSB Media" : "I have a question about MSB Media services")} className="blue-button mt-7"><MessageCircle className="h-4 w-4 text-[#25D366]" />WhatsApp</button></div><div className="space-y-3">{faqs.map((faq, index) => <article key={faq.question} className="faq-card overflow-hidden rounded-2xl"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 p-5 text-right font-black text-white"><ChevronDown className={`h-5 w-5 shrink-0 text-[#ffd400] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />{faq.question}</button>{openFaq === index && <p className="border-t border-white/10 px-5 py-4 leading-8 text-slate-200">{faq.answer}</p>}</article>)}</div></div>
    </section>
  </SiteShell>;
}
