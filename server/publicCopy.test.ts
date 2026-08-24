import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pages = [
  "client/src/pages/Home.tsx",
  "client/src/pages/Services.tsx",
  "client/src/pages/Portfolio.tsx",
  "client/src/components/PromoVideo.tsx",
].map(path => readFileSync(resolve(process.cwd(), path), "utf8")).join("\n");

describe("النصوص العامة للوكالة", () => {
  it("لا تعرض تسميات فيديو قديمة أو إشارات داخلية للمستخدم", () => {
    expect(pages).not.toMatch(/فيديو عرض|VIDEO AD|Manus|مانوس|تصور متحرك/);
    expect(pages).not.toContain("هذه الصفحة الرئيسية فقط");
    expect(pages).not.toContain("استخدم الشريط الجانبي");
  });
});
