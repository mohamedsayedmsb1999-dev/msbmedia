import { Copy, FileImage, Handshake, Landmark, LockKeyhole, LogIn, Share2, ShieldCheck, Sparkles, UploadCloud, UsersRound } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import SiteShell from "@/components/SiteShell";
import { openWhatsApp } from "@/lib/site-data";
import { hasCustomerSession, submitPaymentReceipt } from "@/lib/msbDataApi";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const copy = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toast.success("تم النسخ.");
};

export default function Payment() {
  const [method, setMethod] = useState<"vodafone_cash" | "binance_pay">("vodafone_cash");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [hasSession, setHasSession] = useState(() => hasCustomerSession());

  useEffect(() => {
    const updateSession = () => setHasSession(hasCustomerSession());
    window.addEventListener("msb:customer-authenticated", updateSession);
    return () => window.removeEventListener("msb:customer-authenticated", updateSession);
  }, []);

  const shareReceiptToWhatsApp = async () => {
    if (!file) {
      toast.error("اختر صورة الإيصال أولًا.");
      return;
    }
    const message = "مرحبًا MSB Media، أشارك معكم إيصال دفع. يرجى مراجعة التحويل وتأكيد الاستلام.";
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: "إيصال دفع MSB Media", text: message, files: [file] });
        toast.success("اختر واتساب من قائمة المشاركة ثم أكّد إرسال الصورة.");
        return;
      }
    } catch (error) {
      if ((error as DOMException).name === "AbortError") return;
    }
    openWhatsApp(`${message}\n\nتم اختيار صورة الإيصال من الموقع. يرجى إرفاقها في المحادثة ثم الضغط على إرسال.`);
    toast.message("تم فتح واتساب. أرفق الصورة التي اخترتها ثم اضغط إرسال.");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return toast.error("اختر لقطة شاشة الإيصال أولًا.");
    if (file.size > 5 * 1024 * 1024) return toast.error("الحد الأقصى 5 ميجابايت.");
    const form = new FormData(event.currentTarget);
    setUploading(true);
    try {
      const result = await submitPaymentReceipt({ method, customerName: String(form.get("name")), phone: String(form.get("phone")), binancePhone: method === "binance_pay" ? String(form.get("binancePhone")) : undefined, file });
      setFile(null);
      toast.success(result.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر حفظ الإيصال الآن.");
    } finally {
      setUploading(false);
    }
  };

  if (!hasSession) return <SiteShell>
    <section className="page-hero"><div className="site-container"><span className="eyebrow">طرق الدفع</span><h1>سجّل الدخول أولًا لحماية طلب الدفع</h1><p>صفحة الدفع مخصصة للحسابات المسجلة فقط، حتى تبقى بيانات الإيصالات وطلبات المراجعة مرتبطة بصاحبها.</p></div></section>
    <section className="site-container py-16"><div className="payment-lock"><span className="payment-lock-icon"><LockKeyhole className="h-7 w-7" /></span><h2>تحتاج إلى حساب MSB Media</h2><p>لو عندك حساب بالفعل، استخدم رقم هاتفك وكلمة المرور نفسها. ولو جديد، أنشئ حسابك من نافذة التسجيل ثم ارجع للدفع.</p><button onClick={() => window.dispatchEvent(new Event("msb:open-auth"))} className="yellow-button"><LogIn className="h-4 w-4" />تسجيل / دخول للمتابعة</button></div></section>
  </SiteShell>;

  return <SiteShell>
    <section className="page-hero"><div className="site-container"><span className="eyebrow">طرق الدفع</span><h1>دفع واضح ومراجعة منظمة</h1><p>اختر الوسيلة، ثم أرسل صورة الإيصال عبر واتساب أو ارفعها لحفظ نسخة احتياطية داخل الطلب.</p></div></section>
    <section className="site-container py-16"><div className="payment-grid"><article className="payment-card"><div className="payment-brand-row" aria-label="شعارات محافظ الهاتف"><img src="/manus-storage/vodafone-cash-mark_adea82fb.png" alt="Vodafone Cash" /><img src="/manus-storage/etisalat-eand-mark_66d0b2b4.png" alt="Etisalat by e&amp;" /></div><p className="gateway-tag vodafone">Vodafone Cash</p><h2>حول إلى أحد الرقمين</h2>{["01105697412", "01092794169"].map(number => <div className="copy-row" key={number}><b dir="ltr">{number}</b><button type="button" onClick={() => copy(number)} aria-label="نسخ الرقم"><Copy className="h-4 w-4" /></button></div>)}<p className="note">بيانات التحويل المتاحة حاليًا تخص Vodafone Cash فقط. بعد التحويل، اختر صورة الإيصال ثم شاركها عبر واتساب أو ارفعها من النموذج أدناه.</p></article><article className="payment-card"><p className="gateway-tag binance">Binance Pay</p><h2>استخدم المعرّف</h2><div className="copy-row"><b dir="ltr">454798991</b><button type="button" onClick={() => copy("454798991")} aria-label="نسخ معرّف Binance"><Copy className="h-4 w-4" /></button></div><p className="note">رقم الهاتف إلزامي لتأكيد تحويل Binance Pay.</p></article><article className="payment-card upcoming"><span>قريباً</span><h2>خيارات أوسع</h2><p>الحساب البنكي، PayPal، Payoneer.</p></article></div>
      <section className="partnership-section" aria-labelledby="partnership-title"><div className="partnership-copy"><span className="eyebrow"><Handshake className="h-4 w-4" />تعاون وشراكات</span><h2 id="partnership-title">نفتح الباب لتعاون يضيف قيمة حقيقية</h2><p>تصميم القسم مستوحى من نموذج الشراكات الذي أرسلته، لكننا لا نعرض أسماء أو شعارات جهات على أنها شريكة إلا بعد اعتمادها فعليًا. تظهر هنا مجالات التعاون التي يدعمها فريق MSB Media.</p></div><div className="partnership-grid"><article><span className="partnership-icon"><Sparkles className="h-5 w-5" /></span><b>إنتاج ومحتوى</b><small>تعاونات صناعة المحتوى والحملات</small></article><article><span className="partnership-icon"><Landmark className="h-5 w-5" /></span><b>حلول دفع</b><small>قنوات دفع واضحة ومنظمة</small></article><article><span className="partnership-icon"><UsersRound className="h-5 w-5" /></span><b>وكالات وخبراء</b><small>مشاريع مشتركة حسب التخصص</small></article><article><span className="partnership-icon"><Handshake className="h-5 w-5" /></span><b>شراكة مستقبلية</b><small>نضيف الشعار بعد اعتماد التعاون</small></article></div><button type="button" onClick={() => openWhatsApp("أرغب في مناقشة شراكة أو تعاون مع MSB Media")} className="yellow-button mt-6"><Handshake className="h-4 w-4" />ناقش فرصة شراكة</button></section>
      <form onSubmit={submit} className="receipt-form"><div className="flex items-center gap-3"><span className="icon-box blue"><ShieldCheck className="h-5 w-5" /></span><div><h2>إرسال إيصال الدفع</h2><p>يمكنك مشاركة الصورة في واتساب فورًا، ثم حفظها هنا بأمان داخل طلبك ليتمكن الفريق من مراجعتها.</p></div></div><div className="form-grid"><label>الاسم<input className="dark-input" name="name" required placeholder="اسمك الكامل" /></label><label>رقم الهاتف<input className="dark-input" name="phone" required inputMode="tel" placeholder="رقم للتواصل" /></label><label>طريقة الدفع<select className="dark-input" value={method} onChange={e => setMethod(e.target.value as typeof method)}><option value="vodafone_cash">Vodafone Cash</option><option value="binance_pay">Binance Pay</option></select></label>{method === "binance_pay" && <label>هاتف تأكيد Binance<input className="dark-input" name="binancePhone" required inputMode="tel" /></label>}</div><label className="upload-box"><FileImage className="h-6 w-6" /><span><b>{file?.name || "اختر لقطة شاشة الإيصال"}</b><small>JPG / PNG / WEBP حتى 5MB</small></span><input className="sr-only" required type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] || null)} /></label><div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={shareReceiptToWhatsApp} className="yellow-button"><Share2 className="h-4 w-4" />مشاركة الإيصال إلى واتساب <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /></button><button disabled={uploading} className="blue-button">{uploading ? "جاري الحفظ..." : <><UploadCloud className="h-4 w-4" />حفظ الإيصال بأمان</>}</button></div><p className="mt-4 text-xs leading-6 text-slate-400">تفتح مشاركة الملف قائمة النظام على الهواتف المتوافقة؛ اختر واتساب، ثم أكد الإرسال بنفسك. لا يرسل الموقع صورك تلقائيًا من دون موافقتك.</p></form>
    </section>
  </SiteShell>;
}
