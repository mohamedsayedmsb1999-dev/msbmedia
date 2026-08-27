import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const styles = readFileSync(resolve(import.meta.dirname, "../client/src/index.css"), "utf8");

describe("Service-card text contrast", () => {
  it("forces readable white and yellow text over the navy editorial cards", () => {
    expect(styles).toContain(".service-editorial-strip .service-editorial-card h2 { color:#fff !important;");
    expect(styles).toContain(".service-editorial-strip .service-editorial-card .service-editorial-copy { color:#eaf2ff !important;");
    expect(styles).toContain(".service-editorial-strip .service-editorial-card .service-offer-label,.service-editorial-strip .service-editorial-card .service-editorial-tags span { color:#ffd400 !important;");
  });
});
