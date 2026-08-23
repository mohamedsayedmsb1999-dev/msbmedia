import fs from "node:fs";
import path from "node:path";

const root = "/home/ubuntu/msb-media";
const destination = "/home/ubuntu/msb-media-complete-source-and-deploy.txt";
const ignoredDirectories = new Set(["node_modules", "dist", ".git", ".manus-logs", "attached_assets"]);
const ignoredFiles = new Set(["pnpm-lock.yaml", ".project-config.json", "template.json"]);
const allowedExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".css", ".html", ".md", ".txt", ".sql", ".gitignore"]);

function collect(directory) {
  const results = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute);
    if (entry.isDirectory()) results.push(...collect(absolute));
    else if (!ignoredFiles.has(entry.name) && (allowedExtensions.has(path.extname(entry.name)) || entry.name === "Dockerfile")) results.push(relative);
  }
  return results;
}

const guide = `# MSB Media — المصدر الكامل ودليل النشر

هذا الملف يجمع شفرة المشروع الحالية (باستثناء الحزم المثبتة وملفات البناء والأسرار) مع خطوات رفعه إلى GitHub ونشره على Vercel.

## ما هو جاهز في هذه النسخة

الموقع عربي RTL متعدد الصفحات مع شريط جانبي على سطح المكتب وقائمة متجاوبة للهاتف. الصفحة الرئيسية مختصرة، والخدمات والأعمال والدفع والدعم والتعريف بالفريق صفحات مستقلة. نموذج التسجيل، وطلبات الدعم، وإيصالات الدفع تحفظ في مشروع Supabase المرتبط، بينما مشاركة الإيصال إلى واتساب تطلب تأكيد العميل من قائمة المشاركة في هاتفه. بيانات الإيصالات تحفظ في تخزين خاص ولا تُعرض للعامة.

> لا يحتوي هذا الملف على كلمات مرور أو مفاتيح API أو مفاتيح قاعدة البيانات. لا تضع أي مفتاح داخل GitHub.

## خطوات GitHub — مرة واحدة

تم رفع النسخة الحالية بالفعل إلى المستودع: https://github.com/mohamedsayedmsb1999-dev/msbmedia . يحتوي الفرع \`main\` على الكود المجهز للنشر، وملف \`vercel.json\` وأمر \`pnpm build:vercel\`. لا ترفع \`node_modules\` أو \`dist\` أو أي ملف \`.env\` أو كلمات مرور في أي تحديث لاحق.

## خطوات Vercel — مرة واحدة

1. افتح Vercel وسجّل الدخول بحساب GitHub نفسه.
2. اختر **Add New → Project** ثم اختر مستودع \`msb-media\` واضغط Import.
3. لا تغيّر أوامر البناء؛ ملف \`vercel.json\` يحدد أمر البناء \`pnpm build:vercel\` ومجلد الإخراج \`dist/public\` تلقائيًا.
4. اضغط Deploy وانتظر ظهور رابط \`vercel.app\`. افتح الرابط وتأكد من الصفحة الرئيسية والخدمات والدفع والدعم.
5. أي تحديث مستقبلي: عدل المشروع، ثم Commit وPush إلى \`main\`؛ Vercel ينشر التحديث تلقائيًا.

## ربط الدومين

1. داخل مشروع Vercel افتح **Settings → Domains** وأضف الدومين \`msbmedia.agency\`.
2. سيعرض Vercel سجل DNS مطلوبًا (A أو CNAME). افتح لوحة شركة الدومين التي اشتريت منها الدومين، وأضف السجل **نفسه حرفيًا** كما عرضه Vercel.
3. احذف أي سجل قديم متعارض لنفس الاسم، ثم ارجع إلى Vercel وانتظر حتى تظهر حالة Valid Configuration.
4. لا تحتاج شراء استضافة إضافية: Vercel يستضيف الواجهة، وSupabase يحفظ البيانات والإيصالات.

## حالة البريد

حفظ العملاء وطلبات الدعم والإيصالات يعمل عبر Supabase. عند كل تسجيل جديد أو طلب دعم أو إيصال، تحاول دالة Supabase إرسال إشعار إلى mohamedsayedmsb1999@gmail.com عبر Resend. تحفظ مفاتيح RESEND_API_KEY وRESEND_FROM داخل **Supabase Edge Function Secrets** فقط، ولا توضع في GitHub أو Vercel أو أي ملف مصدر. يستخدم الإعداد الأولي مرسل Resend التجريبي؛ قبل الإطلاق التجاري الواسع، أضف نطاقك إلى Resend ثم غيّر RESEND_FROM إلى مرسل موثق باسم نطاقك.

## الاختبار المنفذ قبل التسليم

تم تشغيل \`pnpm check\` و\`pnpm test\` و\`pnpm build:vercel\` بنجاح. مرّت 9 اختبارات. تم فحص الواجهة بصريًا للرئيسية والدفع والدعم. كما تم فحص استجابة دالة البيانات دون إدخال بيانات تجريبية، وتم تدقيق RLS؛ عدم وجود سياسات عامة مقصود لمنع الوصول المباشر إلى جداول العملاء، والدالة الخادمية فقط تحفظ البيانات.

---

# ملفات المصدر

`;

const files = collect(root).sort((a, b) => a.localeCompare(b));
let output = guide;
for (const relative of files) {
  const absolute = path.join(root, relative);
  const content = fs.readFileSync(absolute, "utf8");
  output += `\n\n--- FILE: ${relative} ---\n\n${content}\n`;
}

fs.writeFileSync(destination, output, "utf8");
console.log(destination);
