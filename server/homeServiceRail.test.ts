import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
const styles = readFileSync(resolve(import.meta.dirname, "../client/src/index.css"), "utf8");

describe("Home services rail", () => {
  it("places the five existing services after the agency-achievements block", () => {
    expect(home).toContain('className="home-services-rail"');
    expect(home).toContain("services.map(service");
    expect(home.indexOf('className="agency-achievements"')).toBeLessThan(home.indexOf('className="home-services-rail"'));
  });

  it("uses the requested yellow service surface and safe text contrast", () => {
    expect(styles).toContain("background:linear-gradient(150deg,#ffdc25 0%,#ffd400 68%,#f0be00 100%)");
    expect(styles).toContain(".service-editorial-strip .service-editorial-card h2 { color:#061534 !important;");
    expect(styles).toContain(".service-editorial-strip .service-editorial-card .service-editorial-action { border-color:#061534; background:#061534; color:#fff;");
  });
});
