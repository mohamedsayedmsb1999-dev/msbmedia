import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/AiVideoPreview.tsx"), "utf8");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const services = readFileSync(resolve(root, "client/src/pages/Services.tsx"), "utf8");
const comingSoon = readFileSync(resolve(root, "client/src/pages/AiVideoComingSoon.tsx"), "utf8");
const styles = readFileSync(resolve(root, "client/src/index.css"), "utf8");

describe("MSB AI Video preview", () => {
  it("keeps the first tool version explicitly in demo mode with no provider call", () => {
    expect(page).toContain("نسخة تجريبية خاصة بالمعاينة");
    expect(page).toContain("لا يتم رفع صور أو حفظ بيانات أو خصم رصيد");
    expect(page).toContain("AiVideoEnhancements");
  });

  it("offers Arabic and English plus the requested credit durations", () => {
    expect(page).toContain('type Locale = "ar" | "en"');
    expect(page).toContain("credits: 15, reroll: 5");
    expect(page).toContain("credits: 25, reroll: 8");
    expect(page).toContain("credits: 40, reroll: 13");
    expect(page).toContain('egp: "300 جنيه", usd: "≈ $6"');
    expect(page).toContain('egp: "900 جنيه", usd: "≈ $18"');
    expect(page).toContain('egp: "3,000 جنيه", usd: "≈ $60"');
    expect(page).toContain("ai-video-plan-prices");
  });

  it("provides ratio, character, and music without exposing the removed preview-ad cards", () => {
    expect(page).toContain("طولي 9:16");
    expect(page).toContain("عرضي 16:9");
    expect(page).toContain("رجل ناضج");
    expect(page).toContain("موسيقى هادئة/بيزنس");
    expect(page).not.toContain("إعلان متجر ملابس");
    expect(page).not.toContain("إعلان ساعات وإكسسوارات");
    expect(page).not.toContain("إعلان عقارات أو خدمات");
  });

  it("keeps the payment flow explicitly local and does not send or store preview data", () => {
    expect(page).toContain("لا يتم إرسال النموذج أو حفظه أو رفع الإيصال الآن");
    expect(page).toContain("تم الدفع عبر فودافون كاش");
    expect(page).toContain("تم الدفع عبر اتصالات كاش");
    expect(page).toContain("تم الدفع عبر Binance USDT");
    expect(page).toContain("454798991");
    expect(page).toContain("هذه رسالة تجربة فقط");
  });

  it("يعرض حالة قريبًا لمسار الفيديو بدل الوصول إلى الأداة", () => {
    expect(app).toContain('path={"/ai-video-preview"}');
    expect(app).toContain('component={AiVideoComingSoon}');
    expect(comingSoon).toContain("قريبًا");
    expect(services).not.toContain('href="/ai-video-preview"');
    expect(services).toContain('href="/ugc-video"');
  });

  it("uses a lightweight responsive layout without continuous CSS animation", () => {
    const previewStyles = styles.slice(styles.indexOf("/* MSB AI Video"));
    expect(previewStyles).toContain("@media (max-width:760px)");
    expect(previewStyles).not.toMatch(/animation\s*:/);
    expect(previewStyles).not.toContain("backdrop-filter");
  });

  it("contains a protected preview video and free monthly trial explanation", () => {
    const enhancements = readFileSync(resolve(root, "client/src/pages/AiVideoEnhancements.tsx"), "utf8");
    expect(enhancements).toContain("msb-demo-guidance-vertical_89387343.mp4");
    expect(enhancements).toContain("msb-demo-product-horizontal_a1b8f29e.mp4");
    expect(enhancements).toContain("msb-demo-ai-video-vertical_632965f8.mp4");
    expect(enhancements).toContain("creator_be5e205f.jpg");
    expect(enhancements).toContain('poster: "/manus-storage/ai_3af8700b.jpg", ratio: "horizontal"');
    expect(enhancements).toContain('poster: "/manus-storage/product_468d587a.jpg", ratio: "vertical"');
    expect(enhancements).toContain("poster={selectedSample.poster}");
    expect(enhancements).toContain('controlsList="nodownload noremoteplayback"');
    expect(enhancements).toContain("تجربة مجانية واحدة كل 30 يومًا");
    expect(enhancements).toContain("function localGuideReply");
    expect(enhancements).not.toContain("fetch(");
    expect(enhancements).toContain("ثلاثة نماذج مقدمة من فريق MSB");
    expect(styles).toContain(".ai-video-watermark");
  });
});
