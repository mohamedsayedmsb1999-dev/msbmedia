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
const campaignObjectives = {
  ecommerce_sales: "زيادة مبيعات متجر إلكتروني",
  messages: "استقبال رسائل واتساب / ماسنجر",
  leads: "جمع بيانات عملاء محتملين (Leads)",
  awareness: "زيادة الوعي والتفاعل بالبراند",
} as const;
const campaignBudgets = {
  "5k_10k": "من 5,000 إلى 10,000 ج.م",
  "10k_25k": "من 10,000 إلى 25,000 ج.م",
  "25k_plus": "أكثر من 25,000 ج.م",
} as const;
type SocialService = { name: string; rate: number; min: number; max: number; platform: "facebook" | "instagram" | "tiktok" | "youtube"; delivery: string; guarantee: string };
const socialServices: Record<number, SocialService> = {
  101: { name: "متابعين فيسبوك مصريين 🇪🇬 🔥", rate: 0.22, min: 100, max: 500000, platform: "facebook", delivery: "24–48 ساعة", guarantee: "30 يوم تعويض نقص" },
  102: { name: "متابعين فيسبوك أجانب 🌍 🚀", rate: 0.05, min: 1000, max: 500000, platform: "facebook", delivery: "24–72 ساعة", guarantee: "ثابت حسب الخدمة" },
  103: { name: "Facebook Like 👍", rate: 0.75, min: 100, max: 5000, platform: "facebook", delivery: "24–48 ساعة", guarantee: "30 يوم" },
  104: { name: "Facebook Love ♥️", rate: 0.90, min: 100, max: 5000, platform: "facebook", delivery: "24–48 ساعة", guarantee: "30 يوم" },
  105: { name: "Facebook Haha 😂", rate: 0.30, min: 100, max: 5000, platform: "facebook", delivery: "24–72 ساعة", guarantee: "حسب جودة الرابط" },
  109: { name: "مشاهدات فيديو فيسبوك 👁️ 🔥", rate: 0.03, min: 1000, max: 1000000, platform: "facebook", delivery: "24–48 ساعة", guarantee: "ثابت" },
  201: { name: "متابعين تيك توك مصريين 🇪🇬 🔥", rate: 0.22, min: 100, max: 500000, platform: "tiktok", delivery: "24–48 ساعة", guarantee: "30 يوم" },
  202: { name: "متابعين تيك توك أجانب 🌍 🚀", rate: 0.05, min: 1000, max: 500000, platform: "tiktok", delivery: "24–72 ساعة", guarantee: "ثابت" },
  203: { name: "TikTok Like 👍", rate: 0.75, min: 100, max: 5000, platform: "tiktok", delivery: "24–48 ساعة", guarantee: "30 يوم" },
  204: { name: "TikTok Love ♥️", rate: 0.90, min: 100, max: 5000, platform: "tiktok", delivery: "24–48 ساعة", guarantee: "30 يوم" },
  205: { name: "TikTok Haha 😂", rate: 0.30, min: 100, max: 5000, platform: "tiktok", delivery: "24–72 ساعة", guarantee: "حسب جودة الرابط" },
  206: { name: "مشاهدات تيك توك 👁️ 🚀", rate: 0.03, min: 1000, max: 1000000, platform: "tiktok", delivery: "24–48 ساعة", guarantee: "ثابت" },
  301: { name: "متابعين إنستجرام مصريين 🇪🇬 🔥", rate: 0.22, min: 100, max: 500000, platform: "instagram", delivery: "24–48 ساعة", guarantee: "30 يوم" },
  302: { name: "متابعين إنستجرام أجانب 🌍 🚀", rate: 0.05, min: 1000, max: 500000, platform: "instagram", delivery: "24–72 ساعة", guarantee: "30 يوم" },
  303: { name: "Instagram Like 👍", rate: 0.75, min: 100, max: 5000, platform: "instagram", delivery: "24–48 ساعة", guarantee: "30 يوم" },
  304: { name: "Instagram Love ♥️", rate: 0.90, min: 100, max: 5000, platform: "instagram", delivery: "24–48 ساعة", guarantee: "30 يوم" },
  305: { name: "Instagram Haha 😂", rate: 0.30, min: 100, max: 5000, platform: "instagram", delivery: "24–72 ساعة", guarantee: "حسب جودة الرابط" },
  306: { name: "مشاهدات ريلز إنستجرام 👁️ 🔥", rate: 0.03, min: 1000, max: 1000000, platform: "instagram", delivery: "24–48 ساعة", guarantee: "ثابت" },
  401: { name: "مشتركون يوتيوب ▶️ 🔥", rate: 0.25, min: 100, max: 500000, platform: "youtube", delivery: "24–72 ساعة", guarantee: "30 يوم" },
  402: { name: "YouTube Like 👍", rate: 0.75, min: 100, max: 5000, platform: "youtube", delivery: "24–48 ساعة", guarantee: "ثابت" },
  403: { name: "مشاهدات يوتيوب 👁️ 🚀", rate: 0.03, min: 1000, max: 1000000, platform: "youtube", delivery: "24–48 ساعة", guarantee: "ثابت" },
};
const PUBLIC_SITE_URL = Deno.env.get("MSB_PUBLIC_SITE_URL") ?? "https://www.msbmedia.agency";

function isWebsiteUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function matchesServicePlatform(value: string, service: SocialService) {
  if (!isWebsiteUrl(value)) return false;
  const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
  const domains = { facebook: ["facebook.com", "fb.com"], instagram: ["instagram.com"], tiktok: ["tiktok.com"], youtube: ["youtube.com", "youtu.be"] }[service.platform];
  return domains.some(domain => host === domain || host.endsWith(`.${domain}`)) && new URL(value).pathname.length > 1;
}

async function notifyOwner(subject: string, lines: Array<[string, string]>) {
  if (!RESEND_API_KEY || !RESEND_FROM) {
    console.info("Resend is not configured; data was saved without an email notification.");
    return false;
  }
  try {
    const html = `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8"><h2>MSB Media — ${escapeHtml(subject)}</h2><table>${lines.map(([label, value]) => { const parts = value.split(" | "); const rendered = label === "قرار الإدارة" ? parts.map((part, index) => `<a href="${escapeHtml(part)}" style="display:inline-block;margin:4px;padding:10px 14px;background:${index === 0 ? "#0b5bd3" : "#b91c1c"};color:#fff;border-radius:8px;text-decoration:none">${index === 0 ? "✅ قبول الدفع" : "❌ رفض الدفع"}</a>`).join(" ") : label === "الإيصال" && /^https?:\/\//.test(value) ? `<a href="${escapeHtml(value)}" target="_blank"><img src="${escapeHtml(value)}" alt="صورة إيصال التحويل" style="display:block;max-width:320px;max-height:420px;border:1px solid #ddd;border-radius:8px;margin:6px 0" /></a><a href="${escapeHtml(value)}" style="color:#0b5bd3;text-decoration:underline;word-break:break-all">فتح الصورة بالحجم الكامل</a>` : parts.map(part => /^https?:\/\//.test(part) ? `<a href="${escapeHtml(part)}" style="color:#0b5bd3;text-decoration:underline;word-break:break-all">${escapeHtml(part)}</a>` : escapeHtml(part)).join(" "); return `<tr><td style="padding:4px 0;font-weight:700">${escapeHtml(label)}:</td><td style="padding:4px 8px">${rendered}</td></tr>`; }).join("")}</table></div>`;
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

function isSafePaymentMethod(value: string) {
  return ["vodafone_cash", "etisalat_cash", "binance_pay"].includes(value);
}

async function walletBalance(customerId: string) {
  const { data, error } = await admin.from("wallet_ledger").select("amount").eq("customer_profile_id", customerId).limit(1000);
  if (error) throw error;
  return (data ?? []).reduce((sum, row) => sum + Number(row.amount), 0);
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
    const email = text(input.email, 320).toLowerCase();
    const password = text(input.password, 128);
    if (fullName.length < 2 || phone.length < 6 || (email && !email.includes("@")) || password.length < 6) return json({ ok: false, message: "تحقق من الاسم ورقم الهاتف والبريد وكلمة المرور." }, 400);
    const { data: existing } = await admin.from("customer_profiles").select("id").eq("phone", phone).maybeSingle();
    if (existing) return json({ ok: false, message: "هذا الرقم مسجل بالفعل. استخدم تسجيل الدخول." }, 409);
    const { data: existingEmail } = email ? await admin.from("customer_profiles").select("id").ilike("email", email).maybeSingle() : { data: null };
    if (existingEmail) return json({ ok: false, message: "هذا البريد مسجل بالفعل. استخدم تسجيل الدخول." }, 409);
    const passwordSalt = randomSalt();
    const passwordHash = await sha256(`${passwordSalt}:${password}`);
    const { data: customer, error } = await admin.from("customer_profiles").insert({ full_name: fullName, phone, email: email || null, password_hash: passwordHash, password_salt: passwordSalt }).select("id, full_name, phone, email").single();
    if (error) throw error;
    const token = await createSession(customer.id);
    await notifyOwner("تسجيل عميل جديد", [["الاسم", customer.full_name], ["الهاتف", customer.phone], ["البريد", customer.email || "غير مضاف"], ["تاريخ التسجيل", new Date().toLocaleString("ar-EG")], ["ملاحظة الأمان", "كلمة المرور لا تُرسل بالبريد ولا يمكن استرجاعها كنص واضح."]]);
    return json({ ok: true, customer, token });
  }

  if (action === "sign_in") {
    const phone = text(input.phone, 32);
    const email = text(input.email, 320).toLowerCase();
    const password = text(input.password, 128);
    const { data: byPhone } = await admin.from("customer_profiles").select("id, full_name, phone, email, password_hash, password_salt").eq("phone", phone).maybeSingle();
    const { data: byEmail } = byPhone ? { data: null } : await admin.from("customer_profiles").select("id, full_name, phone, email, password_hash, password_salt").ilike("email", email || phone).maybeSingle();
    const customer = byPhone ?? byEmail;
    if (!customer?.password_hash || !customer.password_salt) return json({ ok: false, message: "بيانات الدخول غير صحيحة." }, 401);
    const passwordHash = await sha256(`${customer.password_salt}:${password}`);
    if (passwordHash !== customer.password_hash) return json({ ok: false, message: "بيانات الدخول غير صحيحة." }, 401);
    const token = await createSession(customer.id);
    return json({ ok: true, customer: { id: customer.id, full_name: customer.full_name, phone: customer.phone, email: customer.email }, token });
  }

  if (action === "wallet_summary") {
    const customerId = await currentCustomer(request);
    if (!customerId) return json({ ok: false, message: "سجّل الدخول أولًا." }, 401);
    const balance = await walletBalance(customerId);
    const { data: deposits, error: depositsError } = await admin.from("wallet_deposits").select("id, amount, total_amount, payment_method, status, created_at").eq("customer_profile_id", customerId).order("created_at", { ascending: false }).limit(50);
    if (depositsError) throw depositsError;
    const { data: orders, error: ordersError } = await admin.from("social_growth_orders").select("id, service_name, quantity, amount, status, target_url, created_at").eq("customer_profile_id", customerId).order("created_at", { ascending: false }).limit(50);
    if (ordersError) throw ordersError;
    return json({ ok: true, balance, deposits: deposits ?? [], orders: orders ?? [] });
  }

  if (action === "approve_wallet_deposit" || action === "reject_wallet_deposit") {
    const token = text(input.token, 200);
    const [depositId, rawSecret] = token.split(".");
    if (!depositId || !rawSecret) return json({ ok: false, message: "رابط القرار غير صالح." }, 400);
    const tokenHash = await sha256(rawSecret);
    const { data: deposit, error: depositError } = await admin.from("wallet_deposits").select("id, customer_profile_id, amount, status, approval_token_hash").eq("id", depositId).maybeSingle();
    if (depositError) throw depositError;
    if (!deposit || deposit.approval_token_hash !== tokenHash) return json({ ok: false, message: "رابط القرار غير صالح أو منتهي." }, 403);
    if (deposit.status !== "pending") return json({ ok: true, message: deposit.status === "approved" ? "تم اعتماد الإيداع سابقًا." : "تم رفض الإيداع سابقًا." });
    const isApprove = action === "approve_wallet_deposit";
    const { error: updateError } = await admin.from("wallet_deposits").update({ status: isApprove ? "approved" : "rejected", approved_at: isApprove ? new Date().toISOString() : null }).eq("id", deposit.id).eq("status", "pending");
    if (updateError) throw updateError;
    if (isApprove) {
      const { error: ledgerError } = await admin.from("wallet_ledger").insert({ customer_profile_id: deposit.customer_profile_id, amount: deposit.amount, kind: "deposit", reference_id: deposit.id, description: "اعتماد إيداع من إدارة MSB Media" });
      if (ledgerError && !ledgerError.message.includes("duplicate")) throw ledgerError;
    }
    return json({ ok: true, message: isApprove ? "تم قبول الدفع وإضافة الرصيد للعميل ✅" : "تم رفض الدفع ولن يتم إضافة الرصيد للعميل ❌" });
  }

  if (action === "approve_order" || action === "reject_order") {
    const token = text(input.token, 200);
    const [orderId, rawSecret] = token.split(".");
    if (!orderId || !rawSecret) return json({ ok: false, message: "رابط قرار الطلب غير صالح." }, 400);
    const tokenHash = await sha256(rawSecret);
    const { data: order, error: orderError } = await admin.from("social_growth_orders").select("id, customer_profile_id, amount, status, approval_token_hash").eq("id", orderId).maybeSingle();
    if (orderError) throw orderError;
    if (!order || order.approval_token_hash !== tokenHash) return json({ ok: false, message: "رابط قرار الطلب غير صالح أو منتهي." }, 403);
    if (order.status !== "manual_review") return json({ ok: true, message: order.status === "rejected" ? "تم رفض الطلب سابقًا." : "تم قبول الطلب سابقًا وبدأت مراجعته." });
    const isApprove = action === "approve_order";
    const { error: updateError } = await admin.from("social_growth_orders").update({ status: isApprove ? "in_progress" : "rejected" }).eq("id", order.id).eq("status", "manual_review");
    if (updateError) throw updateError;
    if (!isApprove) {
      const { error: refundError } = await admin.from("wallet_ledger").insert({ customer_profile_id: order.customer_profile_id, amount: order.amount, kind: "refund", reference_id: order.id, description: "استرجاع قيمة طلب نمو سوشيال مرفوض" });
      if (refundError && !refundError.message.includes("duplicate")) throw refundError;
    }
    return json({ ok: true, message: isApprove ? "تم قبول الطلب وبدأت حالته التنفيذ ✅" : "تم رفض الطلب وإرجاع قيمته إلى محفظة العميل ✅" });
  }

  if (action === "social_growth_order") {
    const customerId = await currentCustomer(request);
    if (!customerId) return json({ ok: false, message: "سجّل الدخول أولًا." }, 401);
    const serviceId = Number(input.serviceId);
    const quantity = Number(input.quantity);
    const targetUrl = text(input.targetUrl, 1000);
    const service = socialServices[serviceId];
    if (!service || !Number.isInteger(quantity) || quantity < service.min || quantity > service.max || !matchesServicePlatform(targetUrl, service)) return json({ ok: false, message: `تحقق من الخدمة والكمية. الرابط لازم يكون رابط ${service?.platform || "المنصة"} صحيح ومناسب للخدمة.` }, 400);
    const amount = Math.round(quantity * service.rate * 100) / 100;
    const balance = await walletBalance(customerId);
    if (balance < amount) return json({ ok: false, message: `رصيدك الحالي ${balance.toFixed(2)} ج.م، والمطلوب ${amount.toFixed(2)} ج.م.` }, 400);
    const secret = randomToken();
    const approvalTokenHash = await sha256(secret);
    const { data: order, error: orderError } = await admin.from("social_growth_orders").insert({ customer_profile_id: customerId, service_id: serviceId, service_name: service.name, quantity, target_url: targetUrl, amount, approval_token_hash: approvalTokenHash }).select("id").single();
    if (orderError) throw orderError;
    const { error: ledgerError } = await admin.from("wallet_ledger").insert({ customer_profile_id: customerId, amount: -amount, kind: "order", reference_id: order.id, description: `طلب يدوي: ${service.name} — ${quantity}` });
    if (ledgerError) throw ledgerError;
    const approvalUrl = `${PUBLIC_SITE_URL}/social-growth-media.html?approve_order=${encodeURIComponent(`${order.id}.${secret}`)}`;
    const rejectUrl = `${PUBLIC_SITE_URL}/social-growth-media.html?reject_order=${encodeURIComponent(`${order.id}.${secret}`)}`;
    await notifyOwner("طلب خدمة نمو سوشيال جديد — اختار قبول أو رفض", [["معرف الطلب", order.id], ["الخدمة", service.name], ["الكمية", String(quantity)], ["الرابط", targetUrl], ["القيمة", `${amount.toFixed(2)} ج.م`], ["قرار الإدارة", `${approvalUrl} | ${rejectUrl}`]]);
    return json({ ok: true, message: "تم استلام الطلب وخصم قيمته. جاري انتظار مراجعة الإدارة." });
  }

  if (action === "support") {
    const fullName = text(input.fullName, 100);
    const phone = text(input.phone, 32);
    const email = text(input.email, 320);
    const subject = text(input.subject, 180);
    const message = text(input.message, 5000);
    if (fullName.length < 2 || phone.length < 6 || subject.length < 3 || message.length < 10) return json({ ok: false, message: "تحقق من بيانات طلب الدعم ثم أعد المحاولة." }, 400);
    const customerId = await currentCustomer(request);
    if (!customerId) return json({ ok: false, message: "سجّل الدخول أو أنشئ حسابًا جديدًا قبل إرسال طلب الدعم." }, 401);
    const { error } = await admin.from("support_tickets").insert({ customer_profile_id: customerId, full_name: fullName, phone, email: email || null, subject, message });
    if (error) throw error;
    await notifyOwner("طلب دعم جديد", [["الاسم", fullName], ["الهاتف", phone], ["البريد", email || "غير مضاف"], ["العنوان", subject], ["التفاصيل", message]]);
    return json({ ok: true, message: "تم حفظ طلب الدعم. سيتابع الفريق معك عبر واتساب أو البريد." });
  }

  if (action === "ad_campaign_request") {
    const fullName = text(input.fullName, 100);
    const whatsappNumber = text(input.whatsappNumber, 32);
    const businessName = text(input.businessName, 160);
    const pageUrl = text(input.pageUrl, 1000);
    const description = text(input.description, 3000);
    const objective = text(input.objective, 40) as keyof typeof campaignObjectives;
    const budgetRange = text(input.budgetRange, 40) as keyof typeof campaignBudgets;
    const notes = text(input.notes, 3000);
    const previousAds = input.previousAds;

    if (fullName.length < 2 || whatsappNumber.length < 6 || businessName.length < 2 || !isWebsiteUrl(pageUrl) || !(objective in campaignObjectives) || !(budgetRange in campaignBudgets) || typeof previousAds !== "boolean") {
      return json({ ok: false, message: "تحقق من البيانات المطلوبة ورابط الصفحة ثم أعد المحاولة." }, 400);
    }

    const customerId = await currentCustomer(request);
    if (!customerId) return json({ ok: false, message: "سجّل الدخول أو أنشئ حسابًا جديدًا قبل إرسال طلب الحملة." }, 401);
    const { data: campaignRequest, error } = await admin.from("ad_campaign_requests").insert({
      customer_profile_id: customerId,
      full_name: fullName,
      whatsapp_number: whatsappNumber,
      business_name: businessName,
      page_url: pageUrl,
      description: description || null,
      objective,
      budget_range: budgetRange,
      previous_ads: previousAds,
      notes: notes || null,
    }).select("id").single();
    if (error) throw error;

    const notificationSent = await notifyOwner("طلب حملة إعلانية جديد", [
      ["الاسم", fullName],
      ["واتساب", whatsappNumber],
      ["البراند / النشاط", businessName],
      ["رابط الصفحة أو الموقع", pageUrl],
      ["طبيعة المنتج أو الخدمة", description || "غير مضافة"],
      ["هدف الحملة", campaignObjectives[objective]],
      ["الميزانية الشهرية", campaignBudgets[budgetRange]],
      ["إعلانات سابقة", previousAds ? "نعم" : "لا"],
      ["ملاحظات", notes || "لا توجد"],
    ]);
    const { error: notificationStatusError } = await admin.from("ad_campaign_requests").update({ notification_status: notificationSent ? "sent" : "failed", notified_at: new Date().toISOString() }).eq("id", campaignRequest.id);
    if (notificationStatusError) console.warn("Campaign request notification status update failed", notificationStatusError.message);

    return json({ ok: true, notificationSent, message: "تم استلام طلب الحملة. سيتواصل معك فريق MSB Media قريبًا." });
  }

  return json({ ok: false, message: "الطلب غير معروف." }, 400);
}

async function handleReceipt(request: Request) {
  const customerId = await currentCustomer(request);
  if (!customerId) return json({ ok: false, message: "سجّل الدخول أو أنشئ حسابًا أولًا قبل إرسال إيصال الدفع." }, 401);
  const form = await request.formData();
  const file = form.get("file");
  const customerName = text(form.get("customerName"), 100);
  const phone = text(form.get("phone"), 32);
  const method = text(form.get("method"), 32);
  const binancePhone = text(form.get("binancePhone"), 32);
  const action = text(form.get("action"), 40);
  const depositAmount = Number(form.get("depositAmount"));
  const serviceId = Number(form.get("serviceId"));
  const requestedQuantity = Number(form.get("requestedQuantity"));
  const targetUrl = text(form.get("targetUrl"), 1000);
  const { data: customerProfile } = await admin.from("customer_profiles").select("email").eq("id", customerId).maybeSingle();
  if (!(file instanceof File) || customerName.length < 2 || phone.length < 6 || !isSafePaymentMethod(method)) return json({ ok: false, message: "تحقق من بيانات الإيصال ثم أعد المحاولة." }, 400);
  if (method === "binance_pay" && binancePhone.length < 6) return json({ ok: false, message: "اكتب رقم هاتفك لتأكيد تحويل Binance Pay." }, 400);
  if (!(["image/jpeg", "image/png", "image/webp"] as string[]).includes(file.type) || file.size <= 0 || file.size > 5 * 1024 * 1024) return json({ ok: false, message: "صورة الإيصال يجب أن تكون JPG أو PNG أو WEBP وبحد أقصى 5 ميجابايت." }, 400);
  if (action === "wallet_deposit" && (!Number.isFinite(depositAmount) || depositAmount < 100 || depositAmount > 1000000)) return json({ ok: false, message: "الحد الأدنى لشحن الرصيد 100 ج.م." }, 400);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "receipt";
  const storagePath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
  const { error: uploadError } = await admin.storage.from("payment-receipts").upload(storagePath, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (uploadError) throw uploadError;
  if (action === "wallet_deposit") {
    if (!Number.isFinite(depositAmount) || depositAmount < 100 || depositAmount > 1000000) return json({ ok: false, message: "الحد الأدنى لشحن الرصيد 100 ج.م." }, 400);
    const fee = Math.round(depositAmount * 0.05 * 100) / 100;
    const totalAmount = Math.round((depositAmount + fee) * 100) / 100;
    const secret = randomToken();
    const approvalTokenHash = await sha256(secret);
    const service = socialServices[serviceId];
    if (service && (requestedQuantity || targetUrl) && (!Number.isInteger(requestedQuantity) || requestedQuantity < service.min || requestedQuantity > service.max || !matchesServicePlatform(targetUrl, service))) return json({ ok: false, message: `تحقق من كمية ورابط خدمة ${service.platform} قبل إرسال الإيصال.` }, 400);
    const { data: deposit, error: depositError } = await admin.from("wallet_deposits").insert({ customer_profile_id: customerId, customer_name: customerName, phone, payment_method: method, amount: depositAmount, fee, total_amount: totalAmount, service_id: service ? serviceId : null, service_name: service?.name ?? null, requested_quantity: service && Number.isInteger(requestedQuantity) ? requestedQuantity : null, target_url: isWebsiteUrl(targetUrl) ? targetUrl : null, receipt_storage_path: storagePath, receipt_filename: safeName, approval_token_hash: approvalTokenHash }).select("id").single();
    if (depositError) throw depositError;
    const approvalUrl = `${PUBLIC_SITE_URL}/social-growth-media.html?approve=${encodeURIComponent(`${deposit.id}.${secret}`)}`;
    const rejectUrl = `${PUBLIC_SITE_URL}/social-growth-media.html?reject=${encodeURIComponent(`${deposit.id}.${secret}`)}`;
    const { data: signedReceipt } = await admin.storage.from("payment-receipts").createSignedUrl(storagePath, 60 * 60 * 24 * 7);
    const sent = await notifyOwner("طلب شحن رصيد جديد — اختار قبول أو رفض", [["معرف الإيداع", deposit.id], ["الاسم", customerName], ["الهاتف", phone], ["بريد الحساب", customerProfile?.email || "غير مضاف"], ["طريقة الدفع", method === "binance_pay" ? "Binance Pay" : method === "etisalat_cash" ? "اتصالات كاش" : "Vodafone Cash"], ["الخدمة المطلوبة", service?.name || "شحن رصيد فقط"], ["الكمية المطلوبة", service && Number.isInteger(requestedQuantity) ? requestedQuantity.toLocaleString("en-US") : "غير مضافة"], ["رابط المنشور أو الصفحة", isWebsiteUrl(targetUrl) ? targetUrl : "غير مضاف"], ["الرصيد المطلوب إضافته", `${depositAmount.toFixed(2)} ج.م`], ["رسوم التعبئة (5%)", `${fee.toFixed(2)} ج.م`], ["الإجمالي المطلوب تحويله", `${totalAmount.toFixed(2)} ج.م`], ["الإيصال", signedReceipt?.signedUrl || "تعذر إنشاء رابط الإيصال"], ["قرار الإدارة", `${approvalUrl} | ${rejectUrl}`]]);
    return json({ ok: true, notificationSent: sent, message: "تم حفظ الإيصال وإرسال طلب الاعتماد للإدارة." });
  }
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
