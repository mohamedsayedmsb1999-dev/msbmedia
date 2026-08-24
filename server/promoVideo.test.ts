import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/components/PromoVideo.tsx"), "utf8");

describe("عرض UGC المختصر", () => {
  it("يربط الفيديو القصير ويؤخر زر واتساب إلى نهاية التشغيل", () => {
    expect(source).toContain("ugc-service-5s_80b00fd0.mp4");
    expect(source).toContain("onEnded={() => setShowWhatsApp(true)}");
    expect(source).not.toContain("VIDEO AD");
    expect(source).not.toContain("فيديو عرض");
  });
});
