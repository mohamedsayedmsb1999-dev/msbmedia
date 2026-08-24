import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const viteConfig = readFileSync(resolve(process.cwd(), "vite.config.ts"), "utf8");
const entry = readFileSync(resolve(process.cwd(), "client/src/main.tsx"), "utf8");

describe("بناء الزوار الخفيف", () => {
  it("يستبعد أدوات المعاينة من أمر البناء", () => {
    expect(viteConfig).toContain('command === "build"');
    expect(viteConfig).toContain('? [react(), tailwindcss()]');
    expect(viteConfig).toContain('vitePluginManusRuntime()');
  });

  it("لا يحمّل tRPC أو React Query في نقطة دخول الزائر", () => {
    expect(entry).not.toContain("@trpc/client");
    expect(entry).not.toContain("@tanstack/react-query");
  });
});
