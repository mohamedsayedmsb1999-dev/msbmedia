import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = [
  "client/src/lib/site-data.ts",
  "client/src/components/PromoVideo.tsx",
  "client/src/pages/Home.tsx",
  "client/src/pages/Services.tsx",
  "client/src/pages/Payment.tsx",
].map(file => readFileSync(resolve(process.cwd(), file), "utf8")).join("\n");

describe("روابط الأصول على الدومين الخارجي", () => {
  it("تستخدم رابط التخزين العام بدل المسار النسبي الذي يعيد صفحة HTML", () => {
    expect(source).toContain("https://msbmedia-fddqd6ca.manus.space");
    expect(source).not.toMatch(/src="\/manus-storage\//);
    expect(source).not.toMatch(/image:\s*"\/manus-storage\//);
  });

  it("لا يترك الصورة الافتتاحية نصًا بديلًا ظاهرًا عند فشل الوسيط", () => {
    const heroImage = readFileSync(resolve(process.cwd(), "client/src/components/HeroStudioImage.tsx"), "utf8");
    expect(heroImage).toContain('alt=""');
    expect(heroImage).toContain("onLoad={() => setLoading(false)}");
    expect(heroImage).toContain("onError={() => setFailed(true)}");
  });
});
