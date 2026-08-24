import { afterEach, describe, expect, it } from "vitest";
import { hasCustomerSession } from "../client/src/lib/msbDataApi";

const originalWindow = globalThis.window;
const originalLocalStorage = globalThis.localStorage;

function installStorage(values: Record<string, string>) {
  const storage = {
    getItem: (key: string) => values[key] ?? null,
  } as Storage;
  Object.defineProperty(globalThis, "window", { configurable: true, value: {} });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage });
}

afterEach(() => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: originalLocalStorage });
});

describe("حراسة صفحة الدفع", () => {
  it("تتطلب رمز جلسة وبيانات عميل قبل اعتبار الدفع متاحًا", () => {
    installStorage({ "msb-customer-token": "token-only" });
    expect(hasCustomerSession()).toBe(false);

    installStorage({ "msb-customer-token": "token", "msb-client": '{"name":"محمد"}' });
    expect(hasCustomerSession()).toBe(true);
  });
});
