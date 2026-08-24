import { describe, expect, it } from "vitest";
import { normalizePhone } from "../client/src/lib/customerCredentials";

describe("normalizePhone", () => {
  it("يوحد رقم الهاتف بين التسجيل وتسجيل الدخول", () => {
    expect(normalizePhone("010 927-94169")).toBe("01092794169");
    expect(normalizePhone("٠١٠٩٢٧٩٤١٦٩")).toBe("01092794169");
  });
});
