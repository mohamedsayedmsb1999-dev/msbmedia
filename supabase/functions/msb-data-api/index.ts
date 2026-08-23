import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-msb-customer-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? (secretKeys ? JSON.parse(secretKeys).default : "");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const RESEND_FROM = Deno.env.get("RESEND_FROM") ?? "";
const OWNER_EMAIL = Deno.env.get("MSB_OWNER_EMAIL") ?? "mohamedsayedmsb1999@gmail.com";
const admin = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const text = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const hex = (bytes: Uint8Array) => Array.from(bytes).map(byte => byte.toString(16).padStart(2, "0")).join("");
const escapeHtml = (value: string) => value.replace(/[&<>"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character] ?? character));

async function notifyOwner(subject: string, lines: Array<[string, string]>) {
  if (!RESEND_API_KEY || !RESEND_FROM) {
    console.info("Resend is not configured; data was saved without an email notification.");
    return false;
  }
  try {
    const html = `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8"><h2>MSB Media — ${escapeHtml(subject)}</h2><table>${lines.map(([label, value]) => `<tr><td style="padding:4px 0;font-weight:700">${escapeHtml(label)}:</td><td style="padding:4px 8px">${escapeHtml(value)}</td></tr>`).join("")}</table></div>`;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({ from: RESEND_FROM, to: [OWNER_EMAIL], subject: `MSB Media — ${subject}`, html }),
    });
    if (!response.ok) {
      console.warn("Resend notification failed", response.status, await response.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (error) {
    console.warn("Resend notification error", error);
    return false;
  }
}

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", encoded)));
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return hex(bytes);
}

function randomSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return hex(bytes);
}

async function createSession(customerId: string) {
  const token = randomToken();
  const tokenHash = await sha256(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
  const { error } = await admin.from("customer_sessions").insert({ customer_profile_id: customerId, token_hash: tokenHash, expires_at: expiresAt });
  if (error) throw error;
  return token;
}

async function currentCustomer(request: Request) {
  const token = request.headers.get("x-msb-customer-token");
  if (!token) return null;
  const tokenHash = await sha256(token);
  const { data, error } = await admin.from("customer_sessions").select("customer_profile_id, expires_at").eq("token_hash", tokenHash).maybeSingle();
  if (error || !data || new Date(data.expires_at).getTime() <= Date.now()) return null;
  return data.customer_profile_id as string;
}

async function handleJson(request: Request) {
  const input = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!input) return json({ ok: false, message: "تعذر قراءة الطلب. حاول مرة أخرى." }, 400);
  const action = text(input.action, 40);

  if (action === "register") {
    const fullName = text(input.fullName, 100);
    const phone = text(input.phone, 32);
    const password = text(input.password, 128);
    if (fullName.length < 2 || phone.length < 6 || password.length < 6) return json({ ok: false, message: "تحقق من الاسم ورقم الهاتف وكلمة المرور." }, 400);
    const { data: existing } = await admin.from("customer_profiles").select("id").eq("phone", phone).maybeSingle();
    if (existing) return json({ ok: false, message: "هذا الرقم مسجل بالفعل. استخدم تسجيل الدخول." }, 409);
    const passwordSalt = randomSalt();
    const passwordHash = await sha256(`${passwordSalt}:${password}`);
    const { data: customer, error } = await admin.from("customer_profiles").insert({ full_name: fullName, phone, password_hash: passwordHash, password_salt: passwordSalt }).select("id, full_name, phone").single();
    if (error) throw error;
    const token = await createSession(customer.id);
    await notifyOwner("تسجيل عميل جديد", [["الاسم", customer.full_name], ["الهاتف", customer.phone]]);
    return json({ ok: true, customer, token });
  }

  if (action === "sign_in") {
    const phone = text(input.phone, 32);
    const password = text(input.password, 128);
    const { data: customer } = await admin.from("customer_profiles").select("id, full_name, phone, password_hash, password_salt").eq("phone", phone).maybeSingle();
    if (!customer?.password_hash || !customer.password_salt) return json({ ok: false, message: "بيانات الدخول غير صحيحة." }, 401);
    const passwordHash = await sha256(`${customer.password_salt}:${password}`);
    if (passwordHash !== customer.password_hash) return json({ ok: false, message: "بيانات الدخول غير صحيحة." }, 401);
    const token = await createSession(customer.id);
    return json({ ok: true, customer: { id: customer.id, full_name: customer.full_name, phone: customer.phone }, token });
  }

  if (action === "support") {
    const fullName = text(input.fullName, 100);
    const phone = text(input.phone, 32);
    const email = text(input.email, 320);
    const subject = text(input.subject, 180);
    const message = text(input.message, 5000);
    if (fullName.length < 2 || phone.length < 6 || subject.length < 3 || message.length < 10) return json({ ok: false, message: "تحقق من بيانات طلب الدعم ثم أعد المحاولة." }, 400);
    const customerId = await currentCustomer(request);
    const { error } = await admin.from("support_tickets").insert({ customer_profile_id: customerId, full_name: fullName, phone, email: email || null, subject, message });
    if (error) throw error;
    await notifyOwner("طلب دعم جديد", [["الاسم", fullName], ["الهاتف", phone], ["البريد", email || "غير مضاف"], ["العنوان", subject], ["التفاصيل", message]]);
    return json({ ok: true, message: "تم حفظ طلب الدعم. سيتابع الفريق معك عبر واتساب أو البريد." });
  }

  return json({ ok: false, message: "الطلب غير معروف." }, 400);
}

async function handleReceipt(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  const customerName = text(form.get("customerName"), 100);
  const phone = text(form.get("phone"), 32);
  const method = text(form.get("method"), 32);
  const binancePhone = text(form.get("binancePhone"), 32);
  if (!(file instanceof File) || customerName.length < 2 || phone.length < 6 || !["vodafone_cash", "binance_pay"].includes(method)) return json({ ok: false, message: "تحقق من بيانات الإيصال ثم أعد المحاولة." }, 400);
  if (method === "binance_pay" && binancePhone.length < 6) return json({ ok: false, message: "اكتب رقم هاتفك لتأكيد تحويل Binance Pay." }, 400);
  if (!(["image/jpeg", "image/png", "image/webp"] as string[]).includes(file.type) || file.size <= 0 || file.size > 5 * 1024 * 1024) return json({ ok: false, message: "صورة الإيصال يجب أن تكون JPG أو PNG أو WEBP وبحد أقصى 5 ميجابايت." }, 400);
  const customerId = await currentCustomer(request);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "receipt";
  const storagePath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
  const { error: uploadError } = await admin.storage.from("payment-receipts").upload(storagePath, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (uploadError) throw uploadError;
  const { error: insertError } = await admin.from("payment_receipts").insert({ customer_profile_id: customerId, customer_name: customerName, phone, payment_method: method, binance_phone: binancePhone || null, storage_path: storagePath, original_filename: safeName, mime_type: file.type, size_bytes: file.size, whatsapp_shared_at: new Date().toISOString() });
  if (insertError) {
    await admin.storage.from("payment-receipts").remove([storagePath]);
    throw insertError;
  }
  await notifyOwner("إيصال دفع جديد", [["الاسم", customerName], ["الهاتف", phone], ["الطريقة", method === "binance_pay" ? "Binance Pay" : "Vodafone Cash"], ["اسم الملف", safeName]]);
  return json({ ok: true, message: "تم حفظ الإيصال بأمان. يمكنك الآن مشاركته عبر واتساب للتأكيد السريع." });
}

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ ok: false, message: "طريقة الطلب غير مدعومة." }, 405);
  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) return await handleReceipt(request);
    return await handleJson(request);
  } catch (error) {
    console.error("msb-data-api error", error);
    return json({ ok: false, message: "تعذر حفظ البيانات الآن. حاول مرة أخرى بعد لحظات." }, 500);
  }
});
