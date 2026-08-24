import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const about = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");

describe("لوحة الألوان الثابتة", () => {
  it("تستخدم أزرقًا وصفرًا مدمجين مع أخضر للتأكيد دون فصل حاد أو تمويه في بطاقات التعريف", () => {
    expect(css).toContain("background:linear-gradient(135deg,#05142f 0%,#073b86 54%,#715b0a 100%)");
    expect(css).toContain("border:2px solid #25D366");
    expect(css).toContain(".founder-portrait figcaption { border-color:#25D366; background:#061534; backdrop-filter:none; }");
  });

  it("يجعل بطاقات الخدمات صفراء بنص داكن قابل للقراءة ويمنع حركتها المستمرة", () => {
    expect(css).toContain("background:linear-gradient(145deg,#ffd400,#e5b900)");
    expect(css).toContain(".service-card h2,.service-card p { color:#061534; }");
    expect(css).toContain(".service-visual img { animation:none; transition:none; }");
  });

  it("يعتمد صفوفًا صريحة في التعريف والأسئلة بدل أزرق منخفض التباين", () => {
    expect(about).toContain("about-heading");
    expect(about).toContain("about-copy");
    expect(about).toContain("faq-card");
  });
});
