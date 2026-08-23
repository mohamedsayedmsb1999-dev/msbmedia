import { Link, useLocation } from "wouter";
import { Facebook, LogIn, Menu, MessageCircle, Share2, X, Youtube } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { BRAND_IMAGE, trackMetaEvent, WHATSAPP_URL } from "@/lib/site-data";
import { registerCustomer, signInCustomer } from "@/lib/msbDataApi";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "خدماتنا" },
  { href: "/portfolio", label: "سابقة الأعمال · Portfolio" },
  { href: "/payment", label: "طرق الدفع" },
  { href: "/support", label: "الدعم الفني" },
  { href: "/about", label: "عن MSB Media" },
];

function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"register" | "signin">("register");
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      toast.error(error instanceof Error ? error.message : "تعذر إتمام العملية الآن.");
    } finally {
      setBusy(false);
    }
  };

  return <div className="fixed inset-0 z-[80] grid place-items-center bg-[#020615]/80 p-4 backdrop-blur-sm"><form onSubmit={submit} className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[#0b1230] p-6 text-right text-white shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black tracking-[.2em] text-[#ffd400]">MSB CLIENT</p><h2 className="mt-2 text-2xl font-black">{mode === "register" ? "أنشئ حسابك" : "تسجيل الدخول"}</h2><p className="mt-2 text-sm leading-6 text-slate-300">نحتفظ بكلمة المرور بصورة مشفّرة، ونفتح رسالة بريد مباشرة عند التسجيل.</p></div><button type="button" onClick={onClose} className="rounded-xl bg-white/10 p-2 text-white" aria-label="إغلاق"><X className="h-5 w-5" /></button></div>{mode === "register" && <label className="mt-6 block text-sm font-bold">الاسم<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="dark-input" placeholder="اسمك الكامل" /></label>}<label className="mt-4 block text-sm font-bold">رقم الهاتف<input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="dark-input" inputMode="tel" placeholder="رقم للتواصل" /></label><label className="mt-4 block text-sm font-bold">كلمة المرور<input required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="dark-input" type="password" placeholder="6 أحرف على الأقل" /></label><button disabled={busy} className="yellow-button mt-6 w-full">{busy ? "جارٍ الحفظ..." : mode === "register" ? "تسجيل جديد" : "دخول"}</button><button type="button" onClick={() => setMode(mode === "register" ? "signin" : "register")} className="mt-4 w-full text-sm font-bold text-blue-300">{mode === "register" ? "لديك حساب؟ سجل الدخول" : "ليس لديك حساب؟ أنشئ حسابًا"}</button></form></div>;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
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

  return <div dir="rtl" className="site-layout min-h-screen bg-[#020615] text-white">
    <aside className="site-sidebar" aria-label="قائمة الصفحات">
      <Link href="/" className="sidebar-brand"><span className="grid h-11 w-11 overflow-hidden rounded-xl border border-[#ffd400]/40 bg-[#111a3c]"><img src={BRAND_IMAGE} alt="MSB Media logo" className="h-full w-full object-cover object-[48%_34%]" /></span><span className="font-black tracking-tight">MSB <span className="text-[#4a74ff]">Media</span></span></Link>
      <p className="sidebar-label">صفحات الموقع</p>
      <nav className="sidebar-nav">{navItems.map(item => <Link key={item.href} href={item.href} className={`sidebar-link ${location === item.href ? "is-active" : ""}`}>{item.label}</Link>)}</nav>
      <div className="mt-auto border-t border-white/10 pt-5"><p className="text-xs leading-6 text-slate-400">كل صفحة مستقلة. استخدم القائمة للتنقل بين الخدمات والأعمال والدفع والدعم.</p><button onClick={() => setAuthOpen(true)} className="blue-button mt-4 w-full"><LogIn className="h-4 w-4" />تسجيل / دخول</button></div>
    </aside>
    <div className="site-main">
      <header className="mobile-topbar"><Link href="/" className="flex items-center gap-2"><span className="grid h-9 w-9 overflow-hidden rounded-lg border border-[#ffd400]/40"><img src={BRAND_IMAGE} alt="MSB Media logo" className="h-full w-full object-cover object-[48%_34%]" /></span><span className="text-sm font-black">MSB <span className="text-[#4a74ff]">Media</span></span></Link><button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border border-white/10 p-2 text-white" aria-label="فتح قائمة الصفحات">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>{menuOpen && <nav className="mobile-page-menu">{navItems.map(item => <Link onClick={() => setMenuOpen(false)} key={item.href} href={item.href} className={`sidebar-link ${location === item.href ? "is-active" : ""}`}>{item.label}</Link>)}<button onClick={() => { setMenuOpen(false); setAuthOpen(true); }} className="blue-button mt-2 w-full"><LogIn className="h-4 w-4" />تسجيل / دخول</button></nav>}</header>
      <main>{children}</main>
      <footer className="border-t border-white/10 bg-[#01030b] py-10"><div className="site-container flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-lg font-black">MSB <span className="text-[#4a74ff]">Media</span></p><p className="mt-2 text-sm leading-7 text-slate-400">نحن فريق خبراء يجمع بين الاستراتيجية والإبداع والتقنية لتسريع مسار علامتك.</p><p className="mt-3 text-xs text-slate-500">Founded &amp; Directed by Mohamed Sayed</p></div><div className="flex flex-wrap gap-3"><button onClick={shareWebsite} className="social-icon" aria-label="مشاركة الموقع" title="مشاركة الموقع"><Share2 className="h-5 w-5 text-[#ffd400]" /></button><a href="https://www.facebook.com/share/1GAgRTwssP/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook Page" title="صفحة Facebook للوكالة"><Facebook className="h-5 w-5" /></a><a href="https://www.facebook.com/profile.php?id=100084170355866" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook Personal Profile" title="حساب Facebook الشخصي"><Facebook className="h-5 w-5" /></a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp"><MessageCircle className="h-5 w-5 text-[#25D366]" /></a><a href="https://youtube.com/@mohamedsayed1999?si=A_QP80sXdjxGPn8z" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube Channel"><Youtube className="h-5 w-5" /></a></div></div></footer>
    </div>
    {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
  </div>;
}
