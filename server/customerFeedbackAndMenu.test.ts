import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const services = readFileSync(resolve(process.cwd(), "client/src/pages/Services.tsx"), "utf8");
const shell = readFileSync(resolve(process.cwd(), "client/src/components/SiteShell.tsx"), "utf8");

describe("لقطات العملاء والقائمة الهاتفية", () => {
  it("تزيل اللقطة المحددة وتبقي اللقطات الموثقة الأخرى", () => {
    for (const source of [home, services]) {
      expect(source).not.toContain("whatsapp-academy-feedback-1_38af68ba.jpg");
      expect(source).toContain("whatsapp-academy-feedback-2_14c75cc0.jpg");
      expect(source).toContain("whatsapp-video-feedback_fc1c8b59.jpg");
    }
  });

  it("يعرض زر قائمة هاتفية أكبر في الجهة اليمنى", () => {
    expect(shell).toContain('min-h-11 min-w-11');
    expect(shell).toContain('Menu className="h-6 w-6"');
  });
});
