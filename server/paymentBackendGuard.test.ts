import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const edgeFunction = readFileSync(resolve(process.cwd(), "supabase/functions/msb-data-api/index.ts"), "utf8");

describe("حراسة خادم إيصالات الدفع", () => {
  it("ترفض رفع الإيصال قبل قراءة بياناته عند غياب جلسة عميل صالحة", () => {
    const handlerStart = edgeFunction.indexOf("async function handleReceipt");
    const sessionCheck = edgeFunction.indexOf("const customerId = await currentCustomer(request);", handlerStart);
    const formRead = edgeFunction.indexOf("const form = await request.formData();", handlerStart);
    expect(sessionCheck).toBeGreaterThan(handlerStart);
    expect(sessionCheck).toBeLessThan(formRead);
    expect(edgeFunction).toContain("سجّل الدخول أو أنشئ حسابًا أولًا قبل إرسال إيصال الدفع.");
  });
});
