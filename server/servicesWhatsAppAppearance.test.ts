import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const services = readFileSync(resolve(root, "client/src/pages/Services.tsx"), "utf8");
const styles = readFileSync(resolve(root, "client/src/index.css"), "utf8");
const shell = readFileSync(resolve(root, "client/src/components/SiteShell.tsx"), "utf8");

describe("WhatsApp and mobile service presentation", () => {
  it("uses the original WhatsApp component with a dedicated green service action", () => {
    expect(services).toContain("WhatsAppIcon");
    expect(services).toContain('className="service-editorial-action"');
    expect(styles).toContain("button.service-editorial-action");
    expect(styles).toContain("color:#25D366 !important");
  });

  it("does not render the removed MSB smart assistant in the shared shell", () => {
    expect(shell).not.toContain("MSBSmartAssistant");
  });

  it("shows all compact home services on small screens without forced horizontal overflow", () => {
    expect(styles).toContain("grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(styles).toContain(".home-services-rail-list { display:grid");
  });
});
