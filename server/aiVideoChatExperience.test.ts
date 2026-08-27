import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const guide = readFileSync(resolve(root, "client/src/pages/AiVideoEnhancements.tsx"), "utf8");

describe("MSB AI Video demo chat", () => {
  it("uses a welcoming conversational opening without the removed language explainer", () => {
    expect(guide).toContain("خلّينا نرتّب فكرة فيديوك");
    expect(guide).not.toContain("الشات يرد بالمصري أو الإنجليزي");
    expect(guide).not.toContain("الصور المرفقة محلية في المعاينة");
    expect(guide).toContain("const isArabic = /[\\u0600-\\u06ff]/.test(content)");
  });

  it("handles greetings, goals, service categories, and technical-boundary prompts locally", () => {
    expect(guide).toContain("const greeting");
    expect(guide).toContain("const objective");
    expect(guide).toContain("const product");
    expect(guide).toContain("هنا نركز على الفكرة والنتيجة");
  });
});
