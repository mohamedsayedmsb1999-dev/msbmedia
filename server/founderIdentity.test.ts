import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const about = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");
const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const data = readFileSync(resolve(process.cwd(), "client/src/lib/site-data.ts"), "utf8");

describe("صورة الهوية الرقمية للمؤسس", () => {
  it("تظهر في صفحة التعريف والرئيسية مع وصف لا يدعي الشراكات", () => {
    expect(data).toContain("msb-founder-ai-identity_90f38285.jpg");
    expect(about).toContain("FOUNDER_AI_IDENTITY_IMAGE");
    expect(home).toContain("FOUNDER_AI_IDENTITY_IMAGE");
    expect(about).toContain("وليس إعلانًا عن شراكة رسمية");
    expect(home).toContain("وليست هذه شعارات شراكات رسمية");
  });
});
