import { normalizePhone } from "./customerCredentials";

const DATA_API_URL = "https://tfyypramrzruteuucwfm.supabase.co/functions/v1/msb-data-api";
const CUSTOMER_TOKEN_KEY = "msb-customer-token";

export function hasCustomerSession() {
  return typeof window !== "undefined" && Boolean(localStorage.getItem(CUSTOMER_TOKEN_KEY) && localStorage.getItem("msb-client"));
}

type ApiSuccess<T> = { ok: true } & T;
type ApiFailure = { ok: false; message: string };

async function parseResponse<T>(response: Response): Promise<ApiSuccess<T>> {
  const result = await response.json().catch(() => ({ ok: false, message: "تعذر قراءة رد الخادم." })) as ApiSuccess<T> | ApiFailure;
  if (!response.ok || !result.ok) throw new Error("message" in result ? result.message : "تعذر حفظ البيانات الآن.");
  return result;
}

function headers(): Record<string, string> {
  const token = localStorage.getItem(CUSTOMER_TOKEN_KEY);
  return token ? { "x-msb-customer-token": token } : {};
}

export async function registerCustomer(input: { fullName: string; phone: string; password: string }) {
  const response = await fetch(DATA_API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "register", ...input, phone: normalizePhone(input.phone) }) });
  const result = await parseResponse<{ customer: { full_name: string; phone: string }; token: string }>(response);
  localStorage.setItem(CUSTOMER_TOKEN_KEY, result.token);
  localStorage.setItem("msb-client", JSON.stringify({ name: result.customer.full_name, phone: result.customer.phone }));
  window.dispatchEvent(new Event("msb:customer-authenticated"));
  return result.customer;
}

export async function signInCustomer(input: { phone: string; password: string }) {
  const response = await fetch(DATA_API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "sign_in", ...input, phone: normalizePhone(input.phone) }) });
  const result = await parseResponse<{ customer: { full_name: string; phone: string }; token: string }>(response);
  localStorage.setItem(CUSTOMER_TOKEN_KEY, result.token);
  localStorage.setItem("msb-client", JSON.stringify({ name: result.customer.full_name, phone: result.customer.phone }));
  window.dispatchEvent(new Event("msb:customer-authenticated"));
  return result.customer;
}

export async function submitSupportTicket(input: { fullName: string; phone: string; email: string; subject: string; message: string }) {
  const response = await fetch(DATA_API_URL, { method: "POST", headers: { "Content-Type": "application/json", ...headers() }, body: JSON.stringify({ action: "support", ...input }) });
  return parseResponse<{ message: string }>(response);
}

export async function submitPaymentReceipt(input: { customerName: string; phone: string; method: "vodafone_cash" | "binance_pay"; binancePhone?: string; file: File }) {
  const body = new FormData();
  body.append("customerName", input.customerName);
  body.append("phone", input.phone);
  body.append("method", input.method);
  if (input.binancePhone) body.append("binancePhone", input.binancePhone);
  body.append("file", input.file);
  const response = await fetch(DATA_API_URL, { method: "POST", headers: headers(), body });
  return parseResponse<{ message: string }>(response);
}
