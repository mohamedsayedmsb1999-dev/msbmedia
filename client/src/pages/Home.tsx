import { trpc } from "@/lib/trpc";
import {
  ArrowLeft, ArrowUpLeft, BadgeCheck, BarChart3, Bot, Check, ChevronLeft,
  CirclePlay, Clapperboard, Facebook, FileImage, Globe2, Headphones,
  Instagram, Layers3, Menu, MessageCircle, MonitorSmartphone, ShieldCheck,
  Sparkles, TicketCheck, UploadCloud, UsersRound, WandSparkles, X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

const WHATSAPP_URL = "https://wa.me/201092794169";

const navigation = [
  { label: "الرئيسية", href: "#home" },
  { label: "خدماتنا", href: "#services" },
  { label: "أعمالنا", href: "#portfolio" },
  { label: "الدفع", href: "#payment" },
  { label: "الدعم", href: "#support" },
];

const services = [
  { title: "إعلانات Facebook & Instagram", copy: "استراتيجية إعلانية مدروسة لتحويل الاهتمام إلى نتائج حقيقية.", icon: BarChart3, tag: "أداء ونمو", color: "bg-blue-100 text-blue-700" },
  { title: "Video Editing & Production", copy: "مونتاج وإنتاج بصري يصنع حضورًا لا يُنسى لعلامتك.", icon: Clapperboard, tag: "إنتاج مرئي", color: "bg-violet-100 text-violet-700" },
  { title: "AI UGC Content Creation", copy: "محتوى UGC ذكي وسريع يناسب حملاتك ومنصاتك.", icon: WandSparkles, tag: "محتوى ذكي", color: "bg-amber-100 text-amber-800" },
  { title: "Voice Noise Reduction & Subtitling", copy: "صوت أنقى وترجمة واضحة ليصل محتواك بدقة أكبر.", icon: Headphones, tag: "صوت وترجمة", color: "bg-cyan-100 text-cyan-700" },
  { title: "Full Web Design, Educational Platforms & Landing Pages", copy: "تجارب ويب ومنصات تعليمية وصفحات هبوط صُمّمت للتحويل.", icon: Globe2, tag: "ويب متكامل", color: "bg-emerald-100 text-emerald-700" },
  { title: "All-in-One AI Suite", copy: "Gemini، Flow، Veo 3، Nano Banana في باقة موحدة لفريقك.", icon: Bot, tag: "300 جنيه فقط شهرياً", color: "bg-[#ffd400] text-[#102857]", featured: true },
];

const quizSteps = [
  { title: "ما هدفك الأقرب الآن؟", options: ["زيادة المبيعات", "بناء الوعي بالعلامة", "إطلاق خدمة أو منتج", "تحسين المحتوى الحالي"] },
  { title: "أي قناة تهمك أكثر؟", options: ["Facebook & Instagram", "الفيديو والمحتوى القصير", "موقع أو صفحة هبوط", "حلول الذكاء الاصطناعي"] },
  { title: "أين وصل مشروعك؟", options: ["أبدأ من الصفر", "لدي أساس وأحتاج نموًا", "لدي حملة قائمة", "أريد فريقًا يدير كل شيء"] },
];

const ugcSamples = [
  { title: "نموذج UGC عمودي", label: "إطار 9:16 للمنصات" },
  { title: "افتتاحية بصرية", label: "محتوى قصير سريع الإيقاع" },
  { title: "صياغة دعوة واضحة", label: "نموذج تركيز على الرسالة" },
];

const reviewPrinciples = [
  { title: "المراجعات موثّقة", copy: "ننشر تقييم العميل بعد التحقق من مصدره وموافقته." },
  { title: "الوضوح أولًا", copy: "لا نضيف دولًا أو مسميات لا يذكرها صاحب المراجعة." },
  { title: "لا تقييمات تجريبية", copy: "نحافظ على مصداقية المساحة حتى تتوفر مراجعات حقيقية معتمدة." },
];

function SectionHeading({ kicker, title, copy, align = "right" }: { kicker: string; title: string; copy: string; align?: "right" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="section-kicker"><Sparkles className="h-3.5 w-3.5" />{kicker}</span>
      <h2 className="mt-5 text-3xl font-black leading-[1.35] text-[#102857] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">{copy}</p>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"vodafone_cash" | "binance_pay">("vodafone_cash");
  const [supportForm, setSupportForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });

  const supportMutation = trpc.support.create.useMutation({
    onSuccess: data => {
      const submitted = supportForm;
      setSupportForm({ name: "", phone: "", email: "", subject: "", message: "" });
      if (data.emailDispatched) {
        toast.success("تم إرسال طلبك إلى الدعم بنجاح.");
      } else {
        const body = [
          `الاسم: ${submitted.name}`,
          `الهاتف: ${submitted.phone}`,
          `البريد: ${submitted.email || "غير مُضاف"}`,
          "",
          submitted.message,
        ].join("\n");
        window.location.assign(`mailto:mohamedsayedmsb1999@gmail.com?subject=${encodeURIComponent(`MSB Media — ${submitted.subject}`)}&body=${encodeURIComponent(body)}`);
        toast.success("تم تسجيل طلبك وإبلاغ الفريق وفتح مسار البريد المباشر.");
      }
    },
    onError: error => toast.error(error.message || "تعذّر إرسال الطلب. حاول مرة أخرى."),
  });
  const paymentMutation = trpc.payment.submitReceipt.useMutation({
    onSuccess: () => { setReceiptFile(null); toast.success("تم رفع الإيصال بأمان وإبلاغ الفريق لمراجعته."); },
    onError: error => toast.error(error.message || "تعذّر رفع الإيصال. حاول مرة أخرى."),
  });

  const quizProgress = useMemo(() => ((quizStep + 1) / quizSteps.length) * 100, [quizStep]);
  const openWhatsApp = (context: string) => {
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(`مرحبًا MSB Media، أريد البدء في ${context}.`)}`, "_blank", "noopener,noreferrer");
  };

  const answerQuiz = (answer: string) => {
    const answers = [...quizAnswers.slice(0, quizStep), answer];
    setQuizAnswers(answers);
    if (quizStep < quizSteps.length - 1) setQuizStep(quizStep + 1);
  };

  const submitSupport = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    supportMutation.mutate(supportForm);
  };

  const submitReceipt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!receiptFile) { toast.error("يرجى اختيار لقطة شاشة الإيصال أولًا."); return; }
    if (receiptFile.size > 5 * 1024 * 1024) { toast.error("يجب ألا يتجاوز حجم الإيصال 5 ميجابايت."); return; }
    if (!["image/jpeg", "image/png", "image/webp"].includes(receiptFile.type)) { toast.error("يرجى رفع صورة JPG أو PNG أو WEBP فقط."); return; }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("تعذّر قراءة الملف"));
      reader.onerror = () => reject(new Error("تعذّر قراءة الملف"));
      reader.readAsDataURL(receiptFile);
    }).catch(error => { toast.error(error.message); return ""; });
    if (!dataUrl) return;
    paymentMutation.mutate({
      method: paymentMethod,
      customerName: String(form.get("customerName") || ""),
      phone: String(form.get("phone") || ""),
      binancePhone: paymentMethod === "binance_pay" ? String(form.get("binancePhone") || "") : undefined,
      filename: receiptFile.name,
      mimeType: receiptFile.type as "image/jpeg" | "image/png" | "image/webp",
      dataUrl,
    });
  };

  return (
    <div id="home" className="min-h-screen overflow-x-hidden bg-[#fbfdff] text-[#102857]">
      <header className="sticky top-0 z-40 border-b border-blue-100/80 bg-white/90 backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between">
          <a href="#home" className="flex items-center gap-3" aria-label="MSB Media">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1748d6] text-lg font-black text-white shadow-lg shadow-blue-200">M</span>
            <span className="text-xl font-black tracking-tight text-[#102857]">MSB <span className="text-[#1748d6]">Media</span></span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
            {navigation.map(item => <a key={item.href} href={item.href} className="text-sm font-bold text-slate-600 transition hover:text-[#1748d6]">{item.label}</a>)}
          </nav>
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 text-[#1748d6] lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && <nav className="border-t border-blue-100 bg-white px-4 py-4 lg:hidden">{navigation.map(item => <a onClick={() => setMenuOpen(false)} key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-sm font-bold text-[#102857] hover:bg-blue-50">{item.label}</a>)}</nav>}
      </header>

      <main>
        <section className="brand-grid relative isolate overflow-hidden">
          <div className="blue-orb absolute -right-32 top-0 -z-10 h-[520px] w-[520px]" />
          <div className="absolute left-[-6rem] top-20 -z-10 h-52 w-52 rounded-full bg-[#ffd400]/20 blur-3xl" />
          <div className="container grid min-h-[630px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div className="max-w-2xl">
              <span className="section-kicker"><UsersRound className="h-3.5 w-3.5" />نحن فريقك للنمو الرقمي</span>
              <h1 className="mt-6 text-4xl font-black leading-[1.28] tracking-tight text-[#102857] sm:text-5xl lg:text-6xl">هدفنا الرئيسي <span className="relative whitespace-nowrap text-[#1748d6]">نجاحك<span className="absolute bottom-1 right-0 -z-10 h-3 w-full bg-[#ffd400]"></span></span> وموجودين هنا عشانك</h1>
              <p className="mt-6 max-w-xl text-base leading-9 text-slate-600 sm:text-lg">نحن MSB Media، نجمع بين الإبداع والاستراتيجية والتقنية لنحوّل طموحك إلى حضور رقمي واضح ونتائج قابلة للقياس.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={() => openWhatsApp("استشارة تسويقية")} className="button-primary"><MessageCircle className="h-4 w-4" />احجز استشارة</button>
                <a href="#services" className="button-yellow">اكتشف خدماتنا <ArrowLeft className="h-4 w-4" /></a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-blue-100 pt-7">
                <div><p className="text-2xl font-black text-[#1748d6]">8,151+</p><p className="text-xs font-bold text-slate-500">عميل تم خدمته</p></div>
                <div><p className="text-2xl font-black text-[#1748d6]">76+</p><p className="text-xs font-bold text-slate-500">مجالًا مختلفًا</p></div>
                <div><p className="text-2xl font-black text-[#1748d6]">360°</p><p className="text-xs font-bold text-slate-500">حلول متكاملة</p></div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[510px]">
              <div className="float-soft surface relative overflow-hidden bg-[#102857] p-6 text-white sm:p-8">
                <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-[#1748d6] blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-[#ffd400]/70 blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between"><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">MSB Growth Board</span><BadgeCheck className="h-6 w-6 text-[#ffd400]" /></div>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {["وصول", "تفاعل", "تحويل"].map((item, index) => <div key={item} className="rounded-2xl bg-white/10 p-3 backdrop-blur"><p className="text-[11px] text-blue-100">{item}</p><p className="mt-2 text-lg font-black">+{[38, 64, 27][index]}%</p></div>)}
                  </div>
                  <div className="mt-5 rounded-2xl bg-white p-5 text-[#102857]"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-slate-500">خطة نمو مخصصة</p><p className="mt-1 font-black">من الفكرة حتى النتيجة</p></div><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#ffd400]"><BarChart3 className="h-5 w-5" /></div></div><div className="mt-5 flex h-20 items-end gap-2">{[45, 65, 48, 82, 70, 96, 88].map((height, i) => <span key={i} className="flex-1 rounded-t-md bg-[#1748d6]" style={{ height: `${height}%`, opacity: i === 5 ? 1 : .55 }} />)}</div></div>
                </div>
              </div>
              <div className="pulse-soft absolute -bottom-5 -right-4 rounded-2xl bg-[#ffd400] px-4 py-3 shadow-xl shadow-amber-200"><p className="text-xs font-black text-[#102857]">نتائج تصنع فرقًا</p></div>
            </div>
          </div>
        </section>

        <section id="services" className="container py-20 sm:py-28">
          <SectionHeading kicker="خبراتنا بين يديك" title="خدمات مرنة، وفريق يعرف كيف يوصل لهدفك" copy="من أول فكرة إلى قياس النتائج، نرتّب لك المسار الذي يخدم مشروعك ويستحقه جمهورك." />
          <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(service => {
              const Icon = service.icon;
              return <article key={service.title} className={`surface group flex min-h-[295px] flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-32px_rgba(23,72,214,.52)] ${service.featured ? "border-[#ffd400]" : ""}`}>
                <div className="flex items-start justify-between gap-3"><span className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-extrabold ${service.color}`}>{service.tag}</span><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-[#1748d6]"><Icon className="h-5 w-5" /></span></div>
                <h3 className="mt-7 text-lg font-black leading-7 text-[#102857]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.copy}</p>
                <button onClick={() => openWhatsApp(service.title)} className="mt-auto flex w-fit items-center gap-2 pt-6 text-sm font-black text-[#1748d6] transition group-hover:gap-3">ابدأ <ArrowLeft className="h-4 w-4" /></button>
              </article>;
            })}
          </div>
        </section>

        <section id="portfolio" className="border-y border-blue-100 bg-[#f3f7ff] py-20 sm:py-28">
          <div className="container">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><SectionHeading kicker="مختارات من أثرنا" title="محتوى يلفت، وحلول تترك أثرًا" copy="نصنع تجارب تواصل بصرية تناسب سرعة الجمهور وتدعم أهداف علامتك." /><div className="max-w-md rounded-2xl border border-[#ffd400] bg-[#fff9cf] px-5 py-4 text-sm font-black leading-7 text-[#102857]"><BadgeCheck className="ml-2 inline h-5 w-5 text-[#1748d6]" />خدمة أكثر من 8,151 عميل في أكثر من 76 مجالاً مختلفاً</div></div>
            <div className="mt-11 grid gap-5 lg:grid-cols-3">
              {ugcSamples.map(sample => <article key={sample.title} className="group relative min-h-[315px] overflow-hidden rounded-[1.5rem] bg-[#102857] text-white"><video controls muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label={sample.title}><source src="/manus-storage/msb-ugc-sample_6e071991.mp4" type="video/mp4" /></video><div className="absolute inset-0 bg-gradient-to-t from-[#071535]/95 via-[#071535]/20 to-transparent"></div><div className="relative flex min-h-[315px] flex-col p-6"><span className="w-fit rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur">UGC VIDEO · SAMPLE</span><div className="mt-auto"><span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#1748d6]"><CirclePlay className="h-5 w-5" /></span><h3 className="mt-4 text-xl font-black">{sample.title}</h3><p className="mt-1 text-sm text-blue-100">{sample.label}</p><p className="mt-2 text-[11px] text-white/70">عينة عامة مرخّصة للمعاينة البصرية، وليست عمل عميل.</p></div></div></article>)}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {reviewPrinciples.map((review, index) => <article key={review.title} className="rounded-2xl border border-blue-100 bg-white p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-[#1748d6]"><UsersRound className="h-5 w-5" /></span><div><p className="font-black text-[#102857]">{review.title}</p><p className="text-xs text-slate-500">سياسة المراجعات في MSB Media</p></div></div><p className="mt-4 text-sm leading-7 text-slate-500">{review.copy}</p><span className="mt-4 inline-flex rounded-full bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">{index === 0 ? "مصداقية" : index === 1 ? "شفافية" : "ثقة"}</span></article>)}
            </div>
          </div>
        </section>

        <section className="container py-20 sm:py-28">
          <div className="grid overflow-hidden rounded-[2rem] bg-[#102857] lg:grid-cols-[.86fr_1.14fr]">
            <div className="relative overflow-hidden p-8 text-white sm:p-11"><div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#1748d6] blur-3xl"></div><div className="relative"><span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold">اختبار التسويق السريع</span><h2 className="mt-6 text-3xl font-black leading-[1.4]">خلّينا نفهم مشروعك قبل ما نبدأ</h2><p className="mt-4 text-sm leading-8 text-blue-100">أجب عن 3 أسئلة قصيرة وسنوجّهك للخطوة الأنسب مع خبرائنا.</p><div className="mt-10 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffd400] font-black text-[#102857]">{quizStep + 1}</span><div><p className="text-sm font-bold">سؤال {quizStep + 1} من {quizSteps.length}</p><div className="mt-2 h-1.5 w-36 overflow-hidden rounded-full bg-white/15"><span className="block h-full rounded-full bg-[#ffd400] transition-all duration-300" style={{ width: `${quizProgress}%` }} /></div></div></div></div></div>
            <div className="bg-white p-8 sm:p-11"><p className="text-sm font-bold text-[#1748d6]">{quizStep < quizSteps.length ? quizSteps[quizStep].title : "رائع، صار عندنا تصور أولي"}</p>{quizStep < quizSteps.length ? <div className="mt-6 grid gap-3">{quizSteps[quizStep].options.map(option => <button key={option} onClick={() => answerQuiz(option)} className={`flex items-center justify-between rounded-xl border p-4 text-right text-sm font-bold transition hover:border-[#1748d6] hover:bg-blue-50 ${quizAnswers[quizStep] === option ? "border-[#1748d6] bg-blue-50" : "border-blue-100"}`}><span>{option}</span><ChevronLeft className="h-4 w-4 text-[#1748d6]" /></button>)}</div> : <div className="mt-7"><div className="rounded-2xl bg-blue-50 p-5"><Check className="h-6 w-6 text-[#1748d6]" /><p className="mt-3 font-black text-[#102857]">مستعدون نرتب خطتك معك.</p><p className="mt-1 text-sm leading-7 text-slate-600">شاركنا إجاباتك في واتساب وخبراؤنا سيرشدونك للخطوة القادمة.</p></div><button className="button-primary mt-6" onClick={() => openWhatsApp(`استشارة بعد الاختبار: ${quizAnswers.join("، ")}`)}>احجز استشارة عبر واتساب <MessageCircle className="h-4 w-4" /></button><button onClick={() => { setQuizStep(0); setQuizAnswers([]); }} className="mr-4 text-sm font-bold text-[#1748d6]">إعادة الاختبار</button></div>}</div>
          </div>
        </section>

        <section id="payment" className="bg-[#f3f7ff] py-20 sm:py-28">
          <div className="container"><SectionHeading kicker="طرق واضحة وآمنة" title="الدفع ومشاركة الإيصال في مكان واحد" copy="اختر وسيلة الدفع المناسبة ثم ارفع لقطة شاشة الإيصال ليتم ربطها بطلبك ومراجعتها من الفريق." align="center" />
            <div className="mt-11 grid gap-5 lg:grid-cols-3"><article className="surface p-6"><div className="flex items-center justify-between"><span className="rounded-xl bg-red-50 px-3 py-2 text-sm font-black text-red-600">Vodafone Cash</span><ShieldCheck className="h-6 w-6 text-[#1748d6]" /></div><p className="mt-6 text-sm leading-7 text-slate-600">حوّل إلى أي من الرقمين التاليين:</p><div className="mt-4 space-y-2" dir="ltr"><p className="rounded-xl bg-slate-50 px-4 py-3 text-center font-black text-[#102857]">01105697412</p><p className="rounded-xl bg-slate-50 px-4 py-3 text-center font-black text-[#102857]">01092794169</p></div><p className="mt-5 rounded-xl bg-amber-50 p-3 text-xs font-bold leading-6 text-amber-800">إرسال سكرين شوت الإيصال لخدمة العملاء.</p></article>
              <article className="surface border-[#ffd400] p-6"><div className="flex items-center justify-between"><span className="rounded-xl bg-[#102857] px-3 py-2 text-sm font-black text-white">Binance Pay</span><Layers3 className="h-6 w-6 text-[#1748d6]" /></div><p className="mt-6 text-sm leading-7 text-slate-600">استخدم معرّف Binance Pay التالي:</p><p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-center font-black text-[#102857]" dir="ltr">454798991</p><p className="mt-5 rounded-xl bg-blue-50 p-3 text-xs font-bold leading-6 text-[#1748d6]">اكتب رقم هاتفك لتأكيد التحويل عند رفع الإيصال.</p></article>
              <article className="surface bg-[#102857] p-6 text-white"><span className="inline-flex rounded-full bg-[#ffd400] px-3 py-1.5 text-xs font-black text-[#102857]">قريباً</span><h3 className="mt-6 text-xl font-black">خيارات دفع أوسع</h3><p className="mt-3 text-sm leading-7 text-blue-100">الحساب البنكي، PayPal، Payoneer.</p><div className="mt-10 flex items-center gap-3 text-sm font-bold text-white/85"><MonitorSmartphone className="h-5 w-5 text-[#ffd400]" />نعمل على إضافتها قريبًا</div></article></div>
            <form onSubmit={submitReceipt} className="surface mt-8 p-6 sm:p-8"><div className="flex flex-col justify-between gap-4 border-b border-blue-100 pb-6 sm:flex-row sm:items-center"><div><h3 className="text-xl font-black text-[#102857]">رفع إيصال الدفع</h3><p className="mt-1 text-sm text-slate-600">نخزّن رابط الإيصال بأمان بدل حفظ الصورة داخل قاعدة البيانات.</p></div><span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><ShieldCheck className="h-4 w-4" />رفع آمن</span></div><div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4"><label className="text-sm font-bold text-[#102857]">الاسم<input required name="customerName" className="input-field" placeholder="اسمك الكامل" /></label><label className="text-sm font-bold text-[#102857]">رقم الهاتف<input required name="phone" className="input-field" inputMode="tel" placeholder="رقم للتواصل" /></label><label className="text-sm font-bold text-[#102857]">طريقة الدفع<select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value as "vodafone_cash" | "binance_pay")} className="input-field"><option value="vodafone_cash">Vodafone Cash</option><option value="binance_pay">Binance Pay</option></select></label>{paymentMethod === "binance_pay" ? <label className="text-sm font-bold text-[#102857]">رقم هاتف تأكيد Binance<input required name="binancePhone" className="input-field" inputMode="tel" placeholder="رقم هاتفك" /></label> : <div className="hidden lg:block" />}</div><div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end"><label className="block text-sm font-bold text-[#102857]"><span>لقطة شاشة الإيصال</span><span className="mt-2 flex min-h-28 items-center gap-4 rounded-xl border border-dashed border-blue-200 bg-blue-50/40 px-4"><FileImage className="h-7 w-7 text-[#1748d6]" /><span><span className="block text-sm text-[#102857]">{receiptFile ? receiptFile.name : "اختر صورة الإيصال"}</span><span className="mt-1 block text-xs font-normal text-slate-500">JPG / PNG / WEBP — حتى 5MB</span></span><input required type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={e => setReceiptFile(e.target.files?.[0] || null)} /></span></label><button type="submit" disabled={paymentMutation.isPending} className="button-primary h-12">{paymentMutation.isPending ? "جاري الرفع..." : <><UploadCloud className="h-4 w-4" />رفع الإيصال</>}</button></div></form>
          </div>
        </section>

        <section id="support" className="container py-20 sm:py-28"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading kicker="نحن هنا للمساعدة" title="الدعم الذي يبقي مشروعك في مساره" copy="سجّل طلبك وسيتلقى فريق MSB Media تنبيهًا مباشرةً لمراجعته. يمكنك كذلك التواصل معنا عبر قنواتنا السريعة." /><div className="mt-8 space-y-4"><div className="flex items-center gap-4 rounded-2xl bg-blue-50 p-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1748d6] text-white"><TicketCheck className="h-5 w-5" /></span><div><p className="font-black">طلب موثّق</p><p className="text-sm text-slate-600">كل التفاصيل محفوظة للمتابعة.</p></div></div><div className="flex items-center gap-4 rounded-2xl bg-amber-50 p-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ffd400] text-[#102857]"><MessageCircle className="h-5 w-5" /></span><div><p className="font-black">تواصل سريع</p><p className="text-sm text-slate-600">للحالات العاجلة، ابدأ محادثة مع الفريق.</p></div></div></div><button className="button-yellow mt-6" onClick={() => openWhatsApp("الدعم")}>تواصل عبر واتساب <ArrowLeft className="h-4 w-4" /></button></div>
          <form onSubmit={submitSupport} className="surface p-6 sm:p-8"><h3 className="text-xl font-black text-[#102857]">افتح طلب دعم</h3><p className="mt-2 text-sm leading-7 text-slate-600">نحتاج هذه التفاصيل لنساعدك بشكل أدق.</p><div className="mt-6 grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold">الاسم<input required value={supportForm.name} onChange={e => setSupportForm({ ...supportForm, name: e.target.value })} className="input-field" placeholder="اسمك" /></label><label className="text-sm font-bold">رقم الهاتف<input required value={supportForm.phone} onChange={e => setSupportForm({ ...supportForm, phone: e.target.value })} className="input-field" inputMode="tel" placeholder="رقم للتواصل" /></label><label className="text-sm font-bold">البريد الإلكتروني <span className="font-normal text-slate-400">(اختياري)</span><input type="email" value={supportForm.email} onChange={e => setSupportForm({ ...supportForm, email: e.target.value })} className="input-field" placeholder="name@example.com" /></label><label className="text-sm font-bold">عنوان الطلب<input required value={supportForm.subject} onChange={e => setSupportForm({ ...supportForm, subject: e.target.value })} className="input-field" placeholder="مثال: استفسار عن خدمة" /></label></div><label className="mt-5 block text-sm font-bold">تفاصيل طلبك<textarea required value={supportForm.message} onChange={e => setSupportForm({ ...supportForm, message: e.target.value })} className="input-field min-h-32 resize-y" placeholder="اكتب المشكلة أو الاستفسار بالتفصيل..." /></label><div className="mt-6 flex flex-wrap items-center gap-4"><button type="submit" disabled={supportMutation.isPending} className="button-primary">{supportMutation.isPending ? "جاري الإرسال..." : <><TicketCheck className="h-4 w-4" />إرسال طلب الدعم</>}</button><span className="text-xs font-bold text-slate-500">ستظهر لك حالة نجاح أو خطأ بوضوح.</span></div></form></div></section>
      </main>

      <footer className="border-t border-blue-100 bg-[#102857] py-10 text-white"><div className="container flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><a href="#home" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1748d6] text-lg font-black">M</span><span className="text-xl font-black">MSB Media</span></a><p className="mt-5 text-sm text-blue-100">نحن هنا لنساعدك على تحويل هدفك إلى نجاح ملموس.</p><p className="mt-5 text-sm font-bold text-white">Founded &amp; Directed by Mohamed Sayed</p></div><div className="flex flex-col gap-4 md:items-end"><div className="flex items-center gap-3"><a href="https://www.facebook.com/share/1FHq8XYkbk/" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-[#1748d6]" aria-label="Facebook Page"><Facebook className="h-5 w-5" /></a><a href="https://www.facebook.com/profile.php?id=100084170355866" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-[#1748d6]" aria-label="Facebook Profile"><ArrowUpLeft className="h-5 w-5" /></a><a href="#services" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-[#1748d6]" aria-label="Instagram"><Instagram className="h-5 w-5" /></a></div><p className="text-xs text-blue-100">© {new Date().getFullYear()} MSB Media. جميع الحقوق محفوظة.</p></div></div></footer>
    </div>
  );
}
