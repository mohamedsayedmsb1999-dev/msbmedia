import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const shell = readFileSync("client/src/components/SiteShell.tsx", "utf8");
const about = readFileSync("client/src/pages/About.tsx", "utf8");
const portfolio = readFileSync("client/src/pages/Portfolio.tsx", "utf8");
const languageContext = readFileSync("client/src/contexts/LanguageContext.tsx", "utf8");

describe("محدد اللغة والأسئلة المحدّثة", () => {
  it("يعرض تبديل عربي وEnglish ويخزن الاختيار", () => {
    expect(shell).toContain("عربي");
    expect(shell).toContain("English");
    expect(languageContext).toContain("msb-site-language");
    expect(languageContext).toContain("document.documentElement.dir");
  });

  it("يعرض أسئلة UGC وطلب الحملة ويزيل الملاحظة المطلوبة من سابقة الأعمال", () => {
    expect(about).toContain("ما باقات فيديوهات UGC بالذكاء الاصطناعي؟");
    expect(about).toContain("كيف أطلب إدارة إعلان فيسبوك أو إنستجرام؟");
    expect(portfolio).not.toContain("ملاحظة مهنية:");
  });
});
