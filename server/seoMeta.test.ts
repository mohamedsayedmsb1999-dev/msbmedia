import { describe, expect, it } from "vitest";
import { getPageMeta, PAGE_META } from "../client/src/lib/seoMeta";

describe("SEO page metadata", () => {
  it("provides a distinct human-readable title and description for every public route", () => {
    for (const [path, meta] of Object.entries(PAGE_META)) {
      expect(path).toMatch(/^\//);
      expect(meta.title).toContain("MSB Media");
      expect(meta.title.length).toBeGreaterThan(12);
      expect(meta.description.length).toBeGreaterThan(45);
    }
  });

  it("falls back safely to the homepage metadata", () => {
    expect(getPageMeta("/unknown")).toEqual(PAGE_META["/"]);
  });
});
