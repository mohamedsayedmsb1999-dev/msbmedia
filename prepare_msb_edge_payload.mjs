import fs from "node:fs";

const projectId = "tfyypramrzruteuucwfm";
const sourcePath = "/home/ubuntu/msb-media/supabase/functions/msb-data-api/index.ts";
const payloadPath = "/home/ubuntu/msb-media/supabase_msb_data_api_payload.json";
const source = fs.readFileSync(sourcePath, "utf8");

fs.writeFileSync(payloadPath, JSON.stringify({
  project_id: projectId,
  name: "msb-data-api",
  verify_jwt: false,
  entrypoint_path: "index.ts",
  files: [{ name: "index.ts", content: source }],
}, null, 2));
