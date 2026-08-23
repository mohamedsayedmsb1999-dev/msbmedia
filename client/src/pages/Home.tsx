import { ArrowLeft, Check, ChevronDown, CircleHelp, MessageCircle, Route, Sparkles, UsersRound } from "lucide-react";
import { useState } from "react";
import SiteShell from "@/components/SiteShell";
import PromoVideo from "@/components/PromoVideo";
import { BRAND_IMAGE, FOUNDER_IMAGE, openWhatsApp, services } from "@/lib/site-data";

const quiz = [
  { question: "ما هدفك الأول في الفترة الجاية؟", options: ["زيادة المبيعات", "انتشار أكبر للعلامة", "إطلاق خدمة جديدة", "تطوير المحتوى"] },
  { question: "أي قناة تهمك أكثر؟", options: ["إعلانات السوشيال", "فيديوهات قصيرة", "صفحة هبوط", "حلول AI"] },
  { question: "كيف يبدو وضع المحتوى عندك؟", options: ["نبدأ من الصفر", "موجود ويحتاج ضبط", "عندي فريق داخلي", "أريد إدارة كاملة"] },
  { question: "ما المدة المناسبة للانطلاق؟", options: ["هذا الأسبوع", "خلال شهر", "أخطط للربع القادم", "أحتاج مراجعة أولًا"] },
];

const workflow = [
  { number: "01", title: "نفهم الهدف", copy: "نبدأ بسؤال مباشر عن نشاطك وهدفك والقناة الأهم لك." },
  { number: "02", title: "نحدد المسار", copy: "نرتب الخدمة أو الباقة المناسبة بدل حلول متفرقة لا تخدم نفس النتيجة." },
  { number: "03", title: "ننفذ ونراجع", copy: "نحوّل الخطة إلى خطوة تنفيذ واضحة ثم نراجع ما يحتاجه المسار التالي." },
];

const faqs = [
  { question: "هل لكل خدمة سعر ثابت؟", answer: "لا، معظم الخدمات يتحدد سعرها بعد معرفة نطاق العمل والمخرج المطلوب. الاستثناء هو باقة Gemini PRO الظاهرة بسعر 300 جنيه شهرياً." },
  { question: "هل يمكن البدء بخدمة واحدة؟", answer: "نعم، يمكن البدء بالخدمة الأقرب لهدفك الحالي ثم توسيع المسار عندما تحتاج ذلك." },
  { question: "كيف أتواصل قبل البدء؟", answer: "يمكنك حجز استشارة أو إرسال نتيجة التدقيق التسويقي إلى واتساب، وسيتابع الفريق معك التفاصيل." },
  { question: "كيف يتم الدفع؟", answer: "تجد Vodafone Cash وBinance Pay في صفحة طرق الدفع، ثم يتم تأكيد التحويل حسب التعليمات المعروضة." },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const done = answers.length === quiz.length;

  const answer = (value: string) => {
    const next = [...answers, value];
    setAnswers(next);
    if (step < quiz.length - 1) setStep(step + 1);
  };

  return <SiteShell>
    <section className="hero-grid relative overflow-hidden">
      <div className="site-container grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <span className="eyebrow"><UsersRound className="h-4 w-4" />فريق خبراء لنمو علامتك</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.25] sm:text-6xl">هدفنا الرئيسي <span className="text-[#4a74ff]">نجاحك</span> وموجودين هنا عشانك</h1>
          <p className="mt-6 max-w-xl text-base leading-9 text-slate-300 sm:text-lg">نحن نخطط وننتج ونقيس، لتتحرك علامتك بخطوات واضحة على السوشيال، الفيديو، الويب، والذكاء الاصطناعي.</p>
          <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => openWhatsApp("أريد حجز استشارة تسويقية")} className="blue-button"><MessageCircle className="h-4 w-4 text-[#25D366]" />احجز استشارة</button><a href="/services" className="yellow-button">خدماتنا <ArrowLeft className="h-4 w-4" /></a></div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">{[["8,151+", "عميل"], ["76+", "مجال"], ["360°", "حلول"]].map(([number, label]) => <div key={label} className="stat-card"><strong>{number}</strong><span>{label}</span></div>)}</div>
        </div>
        <div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-8 rounded-full bg-[#5d35ff]/20 blur-3xl"></div><div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07133c] p-5 shadow-2xl"><img src={BRAND_IMAGE} alt="هوية MSB Media" className="h-[340px] w-full rounded-[1.4rem] object-cover object-[50%_43%]" /><div className="absolute bottom-10 right-9 left-9 rounded-2xl border border-white/10 bg-[#020615]/85 p-4 backdrop-blur"><p className="text-xs font-black tracking-[.16em] text-[#ffd400]">MSB GROWTH SYSTEM</p><p className="mt-2 font-black">من فكرة تسويقية إلى نتيجة قابلة للقياس</p></div></div></div>
      </div>
    </section>

    <section className="site-container py-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow"><Sparkles className="h-4 w-4" />مسارات نعرفها جيدًا</span><h2 className="section-title">خدماتنا في مساحة أوضح وأسرع</h2></div><a href="/services" className="text-sm font-black text-[#ffd400]">كل الخدمات ←</a></div>
      <div className="horizontal-grid mt-9">{services.slice(0, 3).map(service => { const Icon = service.icon; return <article className="dark-card" key={service.title}><span className={`icon-box ${service.tone}`}><Icon className="h-5 w-5" /></span><h3>{service.title}</h3><p>{service.copy}</p></article>; })}</div>
    </section>

    <section className="site-container pb-20"><PromoVideo /></section>

    <section className="border-y border-white/10 bg-[#07133c] py-20">
      <div className="site-container"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow"><Route className="h-4 w-4" />نظام عمل واضح</span><h2 className="section-title">من أول رسالة إلى خطوة تالية مفهومة</h2></div><p className="max-w-md leading-8 text-slate-300">لا نرمي عليك خدمات كثيرة. نرتب نقطة البداية ثم نحدد ما يساعد مشروعك فعلًا.</p></div><div className="horizontal-grid mt-9">{workflow.map(item => <article key={item.number} className="dark-card relative overflow-hidden"><span className="text-5xl font-black text-[#4a74ff]/30">{item.number}</span><h3 className="mt-5 text-xl">{item.title}</h3><p>{item.copy}</p></article>)}</div><div className="mt-5 grid gap-3 md:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-[#020615]/70 px-5 py-4 text-sm font-bold text-slate-200">✓ نحدد نطاق العمل قبل عرض السعر</div><div className="rounded-2xl border border-white/10 bg-[#020615]/70 px-5 py-4 text-sm font-bold text-slate-200">✓ التواصل يبدأ من واتساب مباشرة</div><div className="rounded-2xl border border-white/10 bg-[#020615]/70 px-5 py-4 text-sm font-bold text-slate-200">✓ لا نعرض مراجعات إلا بعد التوثيق</div></div><div className="mt-8 flex flex-col justify-between gap-4 rounded-[1.5rem] border border-[#ffd400]/20 bg-[#020615] p-6 sm:flex-row sm:items-center"><div><p className="font-black text-white">جاهز نحدد الخطوة المناسبة لمشروعك؟</p><p className="mt-1 text-sm text-slate-400">ابدأ باستشارة قصيرة وسنعرف من أين نبدأ.</p></div><button onClick={() => openWhatsApp("أريد معرفة الخطوة المناسبة لمشروعي")} className="yellow-button shrink-0"><MessageCircle className="h-4 w-4 text-[#128C4A]" />تواصل عبر واتساب</button></div></div>
    </section>

    <section className="border-y border-white/10 bg-[#07133c] py-20">
      <div className="site-container grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div><span className="eyebrow">تدقيق تسويقي سريع</span><h2 className="section-title">أربع إجابات، ونقطة بداية أوضح</h2><p className="mt-4 max-w-md leading-8 text-slate-300">اختر إجابة واحدة في كل خطوة لنحوّلها إلى تدقيق مبدئي يرسله فريقنا إلى محادثة واتساب.</p><div className="mt-8 flex items-center gap-3 text-sm font-black"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffd400] text-[#020615]">{done ? 4 : step + 1}</span><span>الخطوة {done ? 4 : step + 1} من 4</span></div></div>
        <div className="rounded-[1.75rem] border border-white/10 bg-[#020615] p-6">{!done ? <><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#ffd400] transition-all duration-200" style={{ width: `${((step + 1) / 4) * 100}%` }} /></div><h3 className="mt-7 text-xl font-black">{quiz[step].question}</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{quiz[step].options.map(option => <button key={option} onClick={() => answer(option)} className="option-button">{option}<ArrowLeft className="h-4 w-4" /></button>)}</div></> : <div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#4a74ff]"><Check className="h-6 w-6" /></span><h3 className="mt-5 text-2xl font-black">تدقيقك التسويقي المبدئي جاهز</h3><p className="mt-3 leading-8 text-slate-300">يبدو أن مشروعك يحتاج مسارًا يجمع بين <strong className="text-white">{answers[0]}</strong> و<strong className="text-white">{answers[1]}</strong>، مع خطوة تنفيذ تبدأ {answers[3]}.</p><button onClick={() => openWhatsApp(`هذه إجاباتي في التدقيق: ${answers.join(" | ")}`)} className="yellow-button mt-6">أرسل التدقيق إلى واتساب <MessageCircle className="h-4 w-4 text-[#128C4A]" /></button><button onClick={() => { setStep(0); setAnswers([]); }} className="mr-4 text-sm font-bold text-blue-300">إعادة التدقيق</button></div>}</div>
      </div>
    </section>

    <section className="site-container py-20">
      <div className="grid gap-8 pb-20 lg:grid-cols-[.82fr_1.18fr]"><div><span className="eyebrow"><CircleHelp className="h-4 w-4" />معلومات قبل البداية</span><h2 className="section-title">أسئلة تساعدك تختار بهدوء</h2><p className="mt-4 max-w-sm leading-8 text-slate-300">إجابات مباشرة عن طريقة العمل والأسعار والتواصل، قبل أن تبدأ الاستشارة.</p><button onClick={() => openWhatsApp("لدي سؤال عن خدمات MSB Media")} className="blue-button mt-7"><MessageCircle className="h-4 w-4 text-[#25D366]" />لدي سؤال آخر</button></div><div className="space-y-3">{faqs.map((faq, index) => <article key={faq.question} className="overflow-hidden rounded-2xl border border-white/10 bg-[#07133c]"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 p-5 text-right font-black text-white"><ChevronDown className={`h-5 w-5 shrink-0 text-[#ffd400] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />{faq.question}</button>{openFaq === index && <p className="border-t border-white/10 px-5 py-4 leading-8 text-slate-300">{faq.answer}</p>}</article>)}</div></div>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#08102a]">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-8 sm:p-12"><span className="eyebrow">عن MSB Media</span><h2 className="section-title">نحن نبني حضورًا يُفهم ويُقاس</h2><p className="mt-5 leading-8 text-slate-300">فريق خبراؤنا يترجم احتياجك إلى خطة رقمية مترابطة بدل خدمات متفرقة. نبدأ بالفهم، ثم ننتج، ثم نراجع الأثر.</p><div className="mt-8 border-t border-white/10 pt-6"><p className="font-serif text-xl tracking-wide text-white">Founded &amp; Directed by Mohamed Sayed</p><p className="mt-2 text-sm text-slate-400">Founder &amp; agency visual</p></div></div>
          <div className="grid grid-cols-2 gap-3 p-4"><figure className="overflow-hidden rounded-2xl border border-white/10"><img src={FOUNDER_IMAGE} alt="Founder Mohamed Sayed" className="h-72 w-full object-cover" /><figcaption className="bg-[#050a1c] px-3 py-2 text-xs font-bold text-slate-300">Founder visual</figcaption></figure><figure className="overflow-hidden rounded-2xl border border-white/10"><img src={BRAND_IMAGE} alt="MSB Media agency visual" className="h-72 w-full object-cover object-[50%_42%]" /><figcaption className="bg-[#050a1c] px-3 py-2 text-xs font-bold text-slate-300">Agency visual</figcaption></figure></div>
        </div>
      </div>
    </section>
  </SiteShell>;
}
