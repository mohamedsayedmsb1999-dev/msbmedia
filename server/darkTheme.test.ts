import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("الهوية الداكنة للموقع", () => {
  it("تستخدم خلفية أزرق وأصفر داكنة مع نص فاتح واضح في العنوان", () => {
    expect(styles).toContain("#020a20");
    expect(styles).toContain("#856304");
    expect(styles).toContain(".page-hero h1 { color:#fff; }");
    expect(styles).toContain(".page-hero p { max-width:650px; margin-top:.85rem; color:#e4efff");
  });
});
