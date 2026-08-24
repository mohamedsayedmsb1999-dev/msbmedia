import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("سلامة تمرير الهاتف", () => {
  it("يستبدل خلفية البطل متعددة الطبقات بخلفية ثابتة على الهاتف", () => {
    expect(css).toContain(".hero-grid { background:#061534; }");
    expect(css).toContain("body,.site-layout,.site-main { background:#061534; }");
  });

  it("يعطل التوهج والتمويه في بطاقة البطل على الهاتف", () => {
    expect(home).not.toContain("hero-glow");
    expect(home).toContain("hero-caption");
    expect(css).toContain(".hero-caption { backdrop-filter:none; background:#020615; }");
  });

  it("يبقي المحتوى الحقيقي فقط ويؤجل رسم القسم السفلي على الهاتف", () => {
    expect(home).not.toContain("FOUNDER_AI_IDENTITY_IMAGE");
    expect(home).toContain('fetchPriority="low"');
    expect(css).toContain(".home-content { content-visibility:auto; contain:layout paint style; contain-intrinsic-size:auto 760px; }");
  });
});
