import { describe, expect, it, vi } from "vitest";
import { RECEIPT_MAX_BYTES, sendSupportEmail, validateReceiptDataUrl } from "./agency";

describe("إدارة مدخلات وكالة MSB Media", () => {
  it("تقبل صورة إيصال PNG صغيرة وصحيحة", () => {
    const dataUrl = "data:image/png;base64,aGVsbG8=";
    const receipt = validateReceiptDataUrl(dataUrl, "image/png");
    expect(receipt.toString()).toBe("hello");
  });

  it("ترفض صيغة إيصال غير مسموحة", () => {
    expect(() => validateReceiptDataUrl("data:application/pdf;base64,QQ==", "application/pdf")).toThrow();
  });

  it("لا يحاول إرسال بريد عند غياب إعدادات خدمة البريد", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("SUPPORT_FROM_EMAIL", "");
    const sent = await sendSupportEmail({
      name: "عميل تجريبي",
      phone: "01000000000",
      subject: "استفسار",
      message: "اختبار",
    });
    expect(sent).toBe(false);
    expect(RECEIPT_MAX_BYTES).toBe(5 * 1024 * 1024);
    vi.unstubAllEnvs();
  });
});
