import { describe, expect, it } from "vitest";
import { buildSupportMailto, hashClientPassword, RECEIPT_MAX_BYTES, validateReceiptDataUrl } from "./agency";

describe("إدارة مدخلات وكالة MSB Media", () => {
  it("تقبل صورة إيصال PNG صغيرة وصحيحة", () => {
    const dataUrl = "data:image/png;base64,aGVsbG8=";
    const receipt = validateReceiptDataUrl(dataUrl, "image/png");
    expect(receipt.toString()).toBe("hello");
  });

  it("ترفض صيغة إيصال غير مسموحة", () => {
    expect(() => validateReceiptDataUrl("data:application/pdf;base64,QQ==", "application/pdf")).toThrow();
  });

  it("يبني رابط بريد مباشر دون الحاجة إلى أي مفتاح خارجي", () => {
    const mailto = buildSupportMailto({
      name: "عميل تجريبي",
      phone: "01000000000",
      subject: "استفسار",
      message: "اختبار",
    });
    expect(mailto).toContain("mailto:mohamedsayedmsb1999@gmail.com");
    expect(mailto).toContain("MSB%20Media");
    expect(RECEIPT_MAX_BYTES).toBe(5 * 1024 * 1024);
  });

  it("يحوّل كلمة مرور التسجيل إلى بصمة ثابتة لا تعيد النص الخام", () => {
    const hash = hashClientPassword("strong-password");
    expect(hash).toHaveLength(64);
    expect(hash).not.toContain("strong-password");
    expect(hash).toBe(hashClientPassword("strong-password"));
    expect(hash).not.toBe(hashClientPassword("another-password"));
  });
});
