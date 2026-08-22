import { describe, expect, it } from "vitest";
import { buildAssistantPrompt, parseSalesAssistantReply } from "./msbAssistant";

describe("معرفة خبير مبيعات MSB Media", () => {
  it("تتضمن الخدمات والسعر ومسار الإغلاق المنضبط", () => {
    const prompt = buildAssistantPrompt();
    expect(prompt).toContain("فيديوهات UGC بالذكاء الاصطناعي");
    expect(prompt).toContain("300 جنيه شهرياً");
    expect(prompt).toContain("مرحلة الإغلاق");
    expect(prompt).toContain("لا تعرض التحويل إلى واتساب إلا بعد");
  });

  it("لا يسمح بعرض تحويل قبل مرحلة الإغلاق", () => {
    const parsed = parseSalesAssistantReply(JSON.stringify({ answer: "خلّيني أعرف هدفك", stage: "discover", handoffToWhatsApp: true }));
    expect(parsed.handoffToWhatsApp).toBe(false);
  });

  it("يعرض التحويل عندما تكون مرحلة الإغلاق مؤكدة", () => {
    const parsed = parseSalesAssistantReply(JSON.stringify({ answer: "جاهزين نبدأ", stage: "close", handoffToWhatsApp: true }));
    expect(parsed.handoffToWhatsApp).toBe(true);
  });

  it("يعود إلى مرحلة الاستكشاف الآمنة عند غياب البنية المنظمة", () => {
    const parsed = parseSalesAssistantReply("I can help you choose the right landing-page path.");
    expect(parsed.stage).toBe("discover");
    expect(parsed.handoffToWhatsApp).toBe(false);
  });
});
