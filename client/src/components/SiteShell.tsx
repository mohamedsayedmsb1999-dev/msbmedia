import { Link, useLocation } from "wouter";
import { BrainCircuit, Facebook, Globe2, Languages, LogIn, Megaphone, Menu, MonitorSmartphone, Share2, X, Youtube } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { trackMetaEvent, WHATSAPP_URL } from "@/lib/site-data";
import { registerCustomer, signInCustomer } from "@/lib/msbDataApi";
import { validateInternationalPhone } from "@/lib/customerCredentials";
import { useLanguage } from "@/contexts/LanguageContext";
import "./language-control.css";
import "./mobile-menu-polish.css";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import MediaPlatformRail from "@/components/MediaPlatformRail";

const navItems = [
  { href: "/", label: { ar: "الرئيسية", en: "Home" } },
  { href: "/services", label: { ar: "خدماتنا", en: "Services" } },
  { href: "/portfolio", label: { ar: "سابقة الأعمال · Portfolio", en: "Portfolio" } },
  { href: "/payment", label: { ar: "طرق الدفع", en: "Payment" } },
  { href: "/support", label: { ar: "الدعم الفني", en: "Support" } },
  { href: "/about", label: { ar: "عن MSB Media", en: "About MSB Media" } },
  { label: { ar: "MSB AI Video", en: "MSB AI Video" }, comingSoon: true },
];

const footerCapabilities = [
  { label: { ar: "إعلانات رقمية", en: "Digital Ads" }, icon: Megaphone },
  { label: { ar: "مواقع ومنصات", en: "Web & Platforms" }, icon: MonitorSmartphone },
  { label: { ar: "حلول Google", en: "Google Solutions" }, icon: Globe2 },
  { label: { ar: "إنتاج بالذكاء الاصطناعي", en: "AI Content" }, icon: BrainCircuit },
];

function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"register" | "signin">("register");
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateInternationalPhone(form.phone)) {
      setFormError("اكتب رقم هاتف صحيحًا مع كود الدولة، أو رقم موبايل مصري صحيح.");
      return;
    }
    setFormError("");
    setBusy(true);
    try {
      if (mode === "register") {
        const customer = await registerCustomer({ fullName: form.name, phone: form.phone, password: form.password });
        trackMetaEvent("CompleteRegistration", { content_name: "MSB Media subscription", status: true });
        toast.success(`أهلًا ${customer.full_name}، تم إنشاء حسابك وحفظ بياناتك.`);
      } else {
        const customer = await signInCustomer({ phone: form.phone, password: form.password });
        toast.success(`مرحبًا بعودتك يا ${customer.full_name}`);
      }
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "تعذر إتمام العملية الآن.";
      setFormError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return <div className="fixed inset-0 z-[80] grid place-items-center bg-[#020615]/80 p-4 backdrop-blur-sm"><form onSubmit={submit} className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[#0b1230] p-6 text-right text-white shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black tracking-[.2em] text-[#ffd400]">MSB CLIENT</p><h2 className="mt-2 text-2xl font-black">{mode === "register" ? "أنشئ حسابك" : "تسجيل الدخول"}</h2><p className="mt-2 text-sm leading-6 text-slate-300">نحفظ بيانات التسجيل بأمان، وتستخدم نفس رقم الهاتف وكلمة المرور في كل مرة تسجل فيها دخول.</p></div><button type="button" onClick={onClose} className="rounded-xl bg-white/10 p-2 text-white" aria-label="إغلاق"><X className="h-5 w-5" /></button></div>{mode === "register" && <label className="mt-6 block text-sm font-bold">اكتب اسمك<input required value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setFormError(""); }} className="dark-input" placeholder="اسمك الكامل" /></label>}<label className="mt-4 block text-sm font-bold">رقم تليفونك<input required value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); setFormError(""); }} className={`dark-input ${formError ? "border-red-400 focus-visible:ring-red-400" : ""}`} inputMode="tel" autoComplete="tel" placeholder="مثال: +201092794169" /></label>{formError && <p role="alert" className="mt-2 rounded-xl border border-red-400/70 bg-red-950/55 px-3 py-2 text-xs font-bold leading-5 text-red-200">{formError}</p>}<label className="mt-4 block text-sm font-bold">باسورد الدخول<input required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="dark-input" type="password" placeholder="6 أحرف على الأقل" /></label><button disabled={busy} className="yellow-button mt-6 w-full">{busy ? "جارٍ الحفظ..." : mode === "register" ? "إنشاء وحفظ الحساب" : "دخول إلى حسابك"}</button><button type="button" onClick={() => { setMode(mode === "register" ? "signin" : "register"); setFormError(""); }} className="mt-4 w-full text-sm font-bold text-blue-300">{mode === "register" ? "لديك حساب؟ سجل الدخول" : "ليس لديك حساب؟ أنشئ حسابًا"}</button></form></div>;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { language, setLanguage } = useLanguage();
  const initialPageView = useRef(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (initialPageView.current) {
      initialPageView.current = false;
      return;
    }
    trackMetaEvent("PageView");
  }, [location]);

  useEffect(() => {
    const openAuth = () => setAuthOpen(true);
    window.addEventListener("msb:open-auth", openAuth);
    return () => window.removeEventListener("msb:open-auth", openAuth);
  }, []);

  const shareWebsite = async () => {
    const payload = { title: "MSB Media", text: "اكتشف خدمات MSB Media", url: window.location.href };
    try {
      if (navigator.share) await navigator.share(payload);
      else {
        await navigator.clipboard.writeText(payload.url);
        toast.success("تم نسخ رابط الموقع للمشاركة.");
      }
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") toast.error("تعذر فتح المشاركة الآن. حاول مرة أخرى.");
    }
  };

  const languageControl = <div className="language-control" aria-label={language === "ar" ? "اختيار اللغة" : "Language selector"}><Languages className="h-3.5 w-3.5" /><span>{language === "ar" ? "اللغة" : "Language"}</span><button type="button" aria-pressed={language === "ar"} onClick={() => setLanguage("ar")}>عربي</button><i>|</i><button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button></div>;
  return <div dir={language === "ar" ? "rtl" : "ltr"} className={`site-layout language-${language} min-h-screen bg-[#020615] text-white`}>
    <aside className="site-sidebar" aria-label="قائمة الصفحات">
      <Link href="/" className="sidebar-brand"><span className="msb-brand-mark" aria-label="MSB Media">MSB</span><span className="font-black tracking-tight">MSB <span className="text-[#4a74ff]">Media</span></span></Link>
      <p className="sidebar-label">{language === "ar" ? "صفحات الموقع" : "Site pages"}</p>
      <nav className="sidebar-nav">{navItems.map(item => item.comingSoon ? <span key={item.label.ar} className="sidebar-link nav-ai-entry cursor-not-allowed opacity-75" aria-label="MSB AI Video قريبًا">{item.label[language]}<small className="mr-auto rounded-full bg-[#ffd400] px-2 py-0.5 text-[10px] font-black text-[#020615]">{language === "ar" ? "قريبًا" : "Soon"}</small></span> : <Link key={item.href} href={item.href!} className={`sidebar-link ${location === item.href ? "is-active" : ""}`}>{item.label[language]}</Link>)}</nav>
      {languageControl}
      <div className="mt-auto border-t border-white/10 pt-5"><p className="text-xs leading-6 text-slate-300">{language === "ar" ? "اختر الخدمة المناسبة وابدأ من خلال فريق MSB Media." : "Choose the right service and start with the MSB Media team."}</p><button onClick={() => setAuthOpen(true)} className="blue-button mt-4 w-full"><LogIn className="h-4 w-4" />{language === "ar" ? "تسجيل / دخول" : "Sign in"}</button></div>
    </aside>
    <div className="site-main">
      <header className="mobile-topbar"><button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-trigger" aria-label="فتح قائمة الصفحات">{menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button><Link href="/" className="mobile-centered-brand"><span className="text-sm font-black">MSB <span className="text-[#4a74ff]">Media</span></span></Link>{languageControl}{menuOpen && <nav className="mobile-page-menu">{navItems.map(item => item.comingSoon ? <span key={item.label.ar} className="sidebar-link nav-ai-entry cursor-not-allowed opacity-75" aria-label="MSB AI Video قريبًا">{item.label[language]}<small className="mr-auto rounded-full bg-[#ffd400] px-2 py-0.5 text-[10px] font-black text-[#020615]">{language === "ar" ? "قريبًا" : "Soon"}</small></span> : <Link onClick={() => setMenuOpen(false)} key={item.href} href={item.href!} className={`sidebar-link ${location === item.href ? "is-active" : ""}`}>{item.label[language]}</Link>)}<button onClick={() => { setMenuOpen(false); setAuthOpen(true); }} className="blue-button mt-2 w-full">{language === "ar" ? "تسجيل / دخول" : "Sign in"}<LogIn className="h-4 w-4" /></button></nav>}</header>
      <main>{children}</main>
      <footer className="border-t border-blue-100 bg-[#063a87] py-10"><div className="site-container"><MediaPlatformRail compact /><div className="footer-capabilities">{footerCapabilities.map(item => { const Icon = item.icon; return <span key={item.label.ar}><Icon className="h-3.5 w-3.5" />{item.label[language]}</span>; })}</div><div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-lg font-black">MSB <span className="text-[#ffd400]">Media</span></p><p className="mt-2 text-sm leading-7 text-blue-100">{language === "ar" ? "نحن فريق خبراء يجمع بين الاستراتيجية والإبداع والتقنية لتسريع مسار علامتك." : "A team that combines strategy, creativity, and technology to move your brand forward."}</p><p className="mt-3 text-xs text-blue-200">Founded &amp; Directed by Mohamed Sayed</p><p className="footer-watermark">© MSB Media — {language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}</p></div><div className="flex flex-wrap gap-3"><button onClick={shareWebsite} className="social-icon" aria-label="مشاركة الموقع" title="مشاركة الموقع"><Share2 className="h-5 w-5 text-[#ffd400]" /></button><a href="https://www.facebook.com/share/1GAgRTwssP/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook Page" title="صفحة Facebook للوكالة"><Facebook className="h-5 w-5" /></a><a href="https://www.facebook.com/profile.php?id=100084170355866" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook Personal Profile"><Facebook className="h-5 w-5" /></a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp"><WhatsAppIcon className="h-5 w-5 text-[#25D366]" /></a><a href="https://youtube.com/@mohamedsayed1999?si=A_QP80sXdjxGPn8z" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube Channel"><Youtube className="h-5 w-5" /></a></div></div></div></footer>
    </div>
    {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
  </div>;
}
