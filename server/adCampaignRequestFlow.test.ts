import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const services = readFileSync(resolve(process.cwd(), "client/src/pages/Services.tsx"), "utf8");
const campaignPage = readFileSync(resolve(process.cwd(), "client/src/pages/CampaignRequest.tsx"), "utf8");
const clientApi = readFileSync(resolve(process.cwd(), "client/src/lib/msbDataApi.ts"), "utf8");
const edgeFunction = readFileSync(resolve(process.cwd(), "supabase/functions/msb-data-api/index.ts"), "utf8");
const migration = readFileSync(resolve(process.cwd(), "supabase/migrations/20260827_create_ad_campaign_requests.sql"), "utf8");

describe("مسار طلب حملة الإعلانات", () => {
  it("يوصل زر خدمة الإعلانات إلى صفحة الطلب بدل فتح واتساب", () => {
    expect(services).toContain('const isCampaignService = service.title === "اعلانات ممولة فيسبوك & انستجرام"');
    expect(services).toContain('<Link href="/campaign-request" className="service-editorial-action">قدّم طلب الحملة');
    expect(app).toContain('<Route path={"/campaign-request"} component={CampaignRequest} />');
  });

  it("يعرض الحقول المطلوبة وصفحة الشكر ورسالة واتساب باسم البراند", () => {
    ["الاسم بالكامل", "رقم الواتساب", "اسم البراند / النشاط التجاري", "رابط الصفحة / الموقع الحالي", "طبيعة المنتج أو الخدمة", "الهدف الرئيسي من الحملة", "الميزانية الإعلانية الشهرية المتوقعة", "هل قمت بتشغيل إعلانات سابقاً؟", "ملاحظات إضافية"].forEach(label => expect(campaignPage).toContain(label));
    expect(campaignPage).toContain("إرسال طلب الحملة الإعلانية");
    expect(campaignPage).toContain("تم استلام طلبك بنجاح!");
    expect(campaignPage).toContain("قمت بتقديم طلب إدارة حملة إعلانية لبراند ${submittedBrand} عبر الموقع وأريد متابعة التفاصيل.");
  });

  it("يحفظ البيانات من خلال الدالة الخادمة ويتابع حالة الإشعار دون كشف أسرار", () => {
    expect(clientApi).toContain('action: "ad_campaign_request"');
    expect(edgeFunction).toContain('if (action === "ad_campaign_request")');
    expect(edgeFunction).toContain('admin.from("ad_campaign_requests").insert');
    expect(edgeFunction).toContain('await notifyOwner("طلب حملة إعلانية جديد"');
    expect(edgeFunction).toContain('notification_status: notificationSent ? "sent" : "failed"');
    expect(migration).toContain("create table if not exists public.ad_campaign_requests");
    expect(migration).toContain("enable row level security");
  });

  it("يوصي التدقيق السريع بخدمة داخلية مناسبة بدل تحويل نتيجته إلى واتساب", () => {
    expect(services).toContain("function recommendService(answers: string[])");
    expect(services).toContain("href: \"/campaign-request\"");
    expect(services).toContain("بناءً على إجاباتك، نوصي أن تبدأ بخدمة");
    expect(services).toContain("ابدأ بـ {recommendation?.title}");
    expect(services).not.toContain('هذه إجاباتي في التدقيق: ${answers.join(" | ")}');
  });
});
