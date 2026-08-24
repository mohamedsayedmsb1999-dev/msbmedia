import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const portfolio = readFileSync(resolve(process.cwd(), "client/src/pages/Portfolio.tsx"), "utf8");
const data = readFileSync(resolve(process.cwd(), "client/src/lib/site-data.ts"), "utf8");

describe("تجربة فيديو UGC في سابقة الأعمال", () => {
  it("تستخدم العرض المختصر وتعرض دعوة واتساب عند انتهاء التشغيل", () => {
    expect(data).toContain('UGC_VIDEO = mediaUrl("ugc-service-5s_80b00fd0.mp4")');
    expect(portfolio).toContain("onEnded={() => setVideoCtaIndex(index)}");
    expect(portfolio).toContain("تجربة UGC مختصرة · 5 ثوانٍ");
    expect(portfolio).not.toContain("فيديو عرض");
  });
});
