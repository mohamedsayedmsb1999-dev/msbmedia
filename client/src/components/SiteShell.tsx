import { Link, useLocation } from "wouter";
import { Facebook, Instagram, LogIn, Menu, X } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { BRAND_IMAGE } from "@/lib/site-data";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "خدماتنا" },
  { href: "/portfolio", label: "سابقة الأعمال · Portfolio" },
  { href: "/payment", label: "طرق الدفع" },
  { href: "/support", label: "الدعم الفني" },
];

function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"register" | "signin">("register");
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const register = trpc.clientAuth.register.useMutation({
    onSuccess: data => {
      localStorage.setItem("msb-client", JSON.stringify({ name: data.name, phone: form.phone }));
      toast.success(`أهلًا ${data.name}، تم إنشاء حسابك.`);
      window.location.assign(data.mailUrl);
      onClose();
    },
    onError: error => toast.error(error.message),
  });
  const signIn = trpc.clientAuth.signIn.useMutation({
    onSuccess: data => {
      localStorage.setItem("msb-client", JSON.stringify({ name: data.name, phone: form.phone }));
      toast.success(`مرحبًا بعودتك يا ${data.name}`);
      onClose();
    },
    onError: error => toast.error(error.message),
  });
  const busy = register.isPending || signIn.isPending;
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === "register") register.mutate(form);
    else signIn.mutate({ phone: form.phone, password: form.password });
  };
  return <div className="fixed inset-0 z-[60] grid place-items-center bg-[#020615]/80 p-4 backdrop-blur-sm"><form onSubmit={submit} className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[#0b1230] p-6 text-right text-white shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black tracking-[.2em] text-[#ffd400]">MSB CLIENT</p><h2 className="mt-2 text-2xl font-black">{mode === "register" ? "أنشئ حسابك" : "تسجيل الدخول"}</h2><p className="mt-2 text-sm leading-6 text-slate-300">نحتفظ بكلمة المرور بصورة مشفّرة، ونفتح رسالة بريد مباشرة عند التسجيل.</p></div><button type="button" onClick={onClose} className="rounded-xl bg-white/10 p-2 text-white"><X className="h-5 w-5" /></button></div>{mode === "register" && <label className="mt-6 block text-sm font-bold">الاسم<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="dark-input" placeholder="اسمك الكامل" /></label>}<label className="mt-4 block text-sm font-bold">رقم الهاتف<input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="dark-input" inputMode="tel" placeholder="رقم للتواصل" /></label><label className="mt-4 block text-sm font-bold">كلمة المرور<input required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="dark-input" type="password" placeholder="6 أحرف على الأقل" /></label><button disabled={busy} className="yellow-button mt-6 w-full">{busy ? "جارٍ الحفظ..." : mode === "register" ? "تسجيل جديد" : "دخول"}</button><button type="button" onClick={() => setMode(mode === "register" ? "signin" : "register")} className="mt-4 w-full text-sm font-bold text-blue-300">{mode === "register" ? "لديك حساب؟ سجل الدخول" : "ليس لديك حساب؟ أنشئ حسابًا"}</button></form></div>;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  return <div dir="rtl" className="min-h-screen bg-[#020615] text-white"><header className="sticky top-0 z-50 border-b border-white/10 bg-[#020615]/90 backdrop-blur-xl"><div className="site-container flex h-20 items-center justify-between gap-5"><Link href="/" className="flex shrink-0 items-center gap-3"><span className="grid h-11 w-11 overflow-hidden rounded-xl border border-[#ffd400]/40 bg-[#111a3c]"><img src={BRAND_IMAGE} alt="MSB Media logo" className="h-full w-full object-cover object-[48%_34%]" /></span><span className="font-black tracking-tight">MSB <span className="text-[#4a74ff]">Media</span></span></Link><nav className="hidden items-center gap-6 lg:flex">{navItems.map(item => <Link key={item.href} href={item.href} className={`text-sm font-bold transition ${location === item.href ? "text-[#ffd400]" : "text-slate-300 hover:text-white"}`}>{item.label}</Link>)}</nav><div className="flex items-center gap-2"><button onClick={() => setAuthOpen(true)} className="hidden items-center gap-2 rounded-xl bg-[#1748d6] px-4 py-2.5 text-sm font-black sm:flex"><LogIn className="h-4 w-4" />تسجيل / دخول</button><button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border border-white/10 p-2.5 text-white lg:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div></div>{menuOpen && <nav className="border-t border-white/10 bg-[#07102a] px-5 py-4 lg:hidden">{navItems.map(item => <Link onClick={() => setMenuOpen(false)} key={item.href} href={item.href} className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/10">{item.label}</Link>)}<button onClick={() => { setMenuOpen(false); setAuthOpen(true); }} className="mt-2 w-full rounded-xl bg-[#1748d6] px-4 py-3 text-sm font-black">تسجيل / دخول</button></nav>}</header><main>{children}</main><footer className="border-t border-white/10 bg-[#01030b] py-10"><div className="site-container flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-lg font-black">MSB <span className="text-[#4a74ff]">Media</span></p><p className="mt-2 text-sm leading-7 text-slate-400">نحن فريق خبراء يجمع بين الاستراتيجية والإبداع والتقنية لتسريع مسار علامتك.</p></div><div className="flex gap-3"><a href="https://www.facebook.com/share/1FHq8XYkbk/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook Page"><Facebook className="h-5 w-5" /></a><a href="https://www.facebook.com/profile.php?id=100084170355866" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook Profile"><Instagram className="h-5 w-5" /></a></div></div></footer>{authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}</div>;
}
