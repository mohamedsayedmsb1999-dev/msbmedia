import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const servicesPage = readFileSync(resolve(process.cwd(), "client/src/pages/Services.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("شريط الخدمات السريع", () => {
  it("يعرض الخدمات في شريط أفقي قابل للسحب ويُبقي فيديو UGC بعده", () => {
    expect(servicesPage).toContain('className="service-strip"');
    expect(servicesPage.indexOf('className="service-strip"')).toBeLessThan(servicesPage.indexOf("<PromoVideo compact />"));
  });

  it("يستخدم بطاقات أصغر مع الالتقاط الأفقي على الهاتف", () => {
    expect(styles).toContain(".service-strip { display:grid; grid-auto-columns:minmax(248px,310px)");
    expect(styles).toContain("scroll-snap-type:x mandatory");
    expect(styles).toContain("grid-auto-columns:minmax(236px,78vw)");
  });
});
