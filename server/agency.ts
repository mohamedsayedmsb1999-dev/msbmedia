import { TRPCError } from "@trpc/server";
import { createHash } from "node:crypto";

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

export function buildSupportMailto(payload: SupportEmailPayload): string {
  const message = [
    `الاسم: ${payload.name}`,
    `الهاتف: ${payload.phone}`,
    `البريد: ${payload.email || "غير مُضاف"}`,
    "",
    payload.message,
  ].join("\n");
  return `mailto:mohamedsayedmsb1999@gmail.com?subject=${encodeURIComponent(`MSB Media — ${payload.subject}`)}&body=${encodeURIComponent(message)}`;
}

export function hashClientPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}
