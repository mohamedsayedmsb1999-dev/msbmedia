import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/UgcVideoService.tsx"), "utf8");
const servicesPage = readFileSync(resolve(root, "client/src/pages/Services.tsx"), "utf8");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("UGC video service packages", () => {
  it("keeps UGC details separate from the closed MSB AI Video platform", () => {
    expect(app).toContain('path={"/ugc-video"}');
    expect(app).toContain('path={"/ai-video-preview"} component={AiVideoComingSoon}');
    expect(servicesPage).toContain('href="/ugc-video"');
    expect(servicesPage).toContain("اذهب لتفاصيل الخدمة");
  });

  it("offers the approved package names, prices, and WhatsApp actions", () => {
    expect(page).toContain('name: "Single"');
    expect(page).toContain('price: "1,000 جنيه"');
    expect(page).toContain('name: "Growth"');
    expect(page).toContain('price: "1,800 جنيه"');
    expect(page).toContain('name: "Pro"');
    expect(page).toContain('price: "3,400 جنيه"');
    expect(page).toContain("12 فيديو UGC بالذكاء الاصطناعي");
    expect(page).toContain("مدة الفيديو حتى 40 ثانية");
    expect(page).toContain("openWhatsApp");
  });

  it("uses only manual, metadata-preloaded sample playback", () => {
    expect(page).toContain('preload="metadata"');
    expect(page).toContain("playsInline");
    expect(page).not.toContain("autoPlay");
  });
});
