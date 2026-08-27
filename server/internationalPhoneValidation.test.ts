import { describe, expect, it } from "vitest";
import { validateInternationalPhone } from "../client/src/lib/customerCredentials";

describe("التحقق المحلي من رقم الهاتف الدولي", () => {
  it("يقبل رقمًا مصريًا محليًا ورقمًا دوليًا صحيحًا", () => {
    expect(validateInternationalPhone("01092794169")).toBe(true);
    expect(validateInternationalPhone("+44 20 7946 0018")).toBe(true);
  });

  it("يرفض الأرقام العشوائية أو غير المكتملة", () => {
    expect(validateInternationalPhone("123456")).toBe(false);
    expect(validateInternationalPhone("not-a-phone")).toBe(false);
  });
});
