import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const servicesPage = readFileSync(resolve(root, "client/src/pages/Services.tsx"), "utf8");
const data = readFileSync(resolve(root, "client/src/lib/site-data.ts"), "utf8");
const styles = readFileSync(resolve(root, "client/src/index.css"), "utf8");

describe("Editorial services presentation", () => {
  it("keeps the five approved service names while replacing their presentation", () => {
    expect((data.match(/title:/g) ?? []).length).toBe(5);
    expect(data).toContain("فيديوهات UGC بالذكاء الاصطناعي");
    expect(data).toContain("تصميم مواقع وصفحات هبوط ومنصات تعليمية أو اكاديمية");
    expect(data).toContain("اعلانات ممولة فيسبوك & انستجرام");
    expect(data).toContain("عرض Gemini PRO + Veo 3 + Google Flow + Nano 🍌 لمدة سنة");
    expect(data).toContain("مونتاج وترجمة نصية وتنقية صوت للفيديوهات");
  });

  it("uses the professional editorial-card composition rather than the prior green square treatment", () => {
    expect(servicesPage).toContain("service-editorial-card");
    expect(styles).toContain(".service-editorial-strip");
    expect(styles).toContain("background:linear-gradient(160deg,#0b2e64,#05122d 72%)");
    expect(styles).toContain(".service-editorial-card.service-card-featured");
  });
});
