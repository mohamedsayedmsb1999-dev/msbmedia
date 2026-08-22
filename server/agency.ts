import { TRPCError } from "@trpc/server";

export const RECEIPT_MAX_BYTES = 5 * 1024 * 1024;
const allowedReceiptTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export type SupportEmailPayload = {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
};

export function validateReceiptDataUrl(dataUrl: string, mimeType: string) {
  if (!allowedReceiptTypes.has(mimeType)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "يرجى رفع صورة بصيغة JPG أو PNG أو WEBP فقط.",
    });
  }

  const prefix = `data:${mimeType};base64,`;
  if (!dataUrl.startsWith(prefix)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "تعذّر التحقق من صيغة ملف الإيصال.",
    });
  }

  const encoded = dataUrl.slice(prefix.length);
  const buffer = Buffer.from(encoded, "base64");
  if (buffer.length === 0 || buffer.length > RECEIPT_MAX_BYTES) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "يجب ألا يتجاوز حجم صورة الإيصال 5 ميجابايت.",
    });
  }

  return buffer;
}

export async function sendSupportEmail(payload: SupportEmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SUPPORT_FROM_EMAIL;

  if (!apiKey || !from) return false;

  const message = [
    `الاسم: ${payload.name}`,
    `الهاتف: ${payload.phone}`,
    `البريد: ${payload.email || "غير مُضاف"}`,
    "",
    payload.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["mohamedsayedmsb1999@gmail.com"],
        subject: `MSB Media — ${payload.subject}`,
        text: message,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
