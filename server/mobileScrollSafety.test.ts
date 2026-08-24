import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("سلامة تمرير الهاتف", () => {
  it("يستبدل خلفية البطل متعددة الطبقات بخلفية ثابتة على الهاتف", () => {
    expect(css).toContain(".hero-grid { background:linear-gradient(112deg,#061534 0%,#0a4aa1 52%,#856304 52%,#201805 100%); background-size:auto; }");
    expect(css).toContain("body,.site-layout,.site-main { background:#061534; }");
  });

  it("يعطل التوهج والتمويه في بطاقة البطل على الهاتف", () => {
    expect(home).toContain("hero-glow");
    expect(home).toContain("hero-caption");
    expect(css).toContain(".hero-glow { display:none; }");
    expect(css).toContain(".hero-caption { backdrop-filter:none; background:#020615; }");
  });
});
