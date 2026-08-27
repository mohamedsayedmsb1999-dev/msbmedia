import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const preview = readFileSync(resolve(root, "client/src/pages/AiVideoPreview.tsx"), "utf8");
const enhancements = readFileSync(resolve(root, "client/src/pages/AiVideoEnhancements.tsx"), "utf8");

describe("MSB AI Video account gate", () => {
  it("requires an existing customer session before tool actions", () => {
    expect(preview).toContain("hasCustomerSession");
    expect(preview).toContain('new Event("msb:open-auth")');
    expect(preview).toContain("accountRequired");
    expect(preview).toContain("canUseActions={hasAccount}");
  });

  it("keeps sample playback public but gates local chat submission", () => {
    expect(enhancements).toContain("const toggleVideo");
    expect(enhancements).toContain("if (!canUseActions) { onRequireAccount(); return; }");
  });
});
