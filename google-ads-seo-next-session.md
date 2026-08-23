# خطة Google Ads وSEO للمرحلة التالية

## الحالة الحالية

الموقع يعمل على `https://msbmedia.agency`، وتم تأجيل أي ربط مع Google إلى حين عودة مالك الحساب. لم يتم إنشاء عميل API، ولم تُطلب أو تُخزّن أي كلمات مرور أو مفاتيح أو رموز وصول ضمن المشروع.

## مساران متاحان عند العودة

| المسار | النتيجة | ما يلزم من المالك | درجة التعقيد |
|---|---|---|---|
| البدء بالظهور في بحث Google | إثبات ملكية الموقع في Search Console، إرسال خريطة الموقع، ومتابعة الفهرسة وأخطاء البحث | تسجيل دخول واحد إلى حساب Google ورفض أو قبول أذونات Google من الصفحة الرسمية | منخفضة |
| إدارة إعلانات Google عبر برمجة | قراءة الحسابات والتقارير أو إدارة حملات Ads من خلال واجهة برمجية | موافقة OAuth رسمية، وحساب Google Ads Manager، ورمز مطوّر من مركز API عند الحاجة | أعلى |

> **التوصية العملية:** نبدأ بمسار Search Console وSEO أولًا لأنه يعطي الموقع فرصة للظهور في Google ولا يحتاج تشغيل حملة إعلانية أو صلاحيات إدارة إعلانات. بعد ذلك نقرر إن كان هناك احتياج حقيقي لواجهة Google Ads البرمجية.

## ما سيُنفّذ في جلسة العودة

سنضيف طريقة تحقق آمنة في الموقع حسب ما تعرضه Search Console، ثم نربط الموقع كملكية `https://www.msbmedia.agency` ونتحقق من ظهور الصفحات في Google. توضح Google أن التحقق يثبت ملكية الموقع، وأن البيانات تحتاج عادةً بضعة أيام حتى تبدأ في الظهور في Search Console.[4]

إذا اختار المالك لاحقًا إدارة Google Ads برمجيًا، فسيتم الاعتماد على موافقة OAuth بدل مشاركة كلمة مرور Google. كما تتطلب Google Ads API رمز مطوّر بالإضافة إلى OAuth، ويحصل رمز المطوّر من مركز API في حساب Google Ads Manager.[1][2]

## ضوابط الأمان

لن نطلب كلمة مرور Google في المحادثة. لا يُنشأ أو يُفعّل أي ربط إلا بعد أن يفتح المالك صفحة Google الرسمية ويوافق بنفسه على الإذن المحدد. سيتم طلب أقل صلاحية ممكنة: قراءة فقط لتقارير Search Console، ولا تُمنح صلاحية إنشاء أو تعديل حملات إعلانية إلا إذا طلبها المالك صراحةً.

## المراجع

[1]: https://developers.google.com/google-ads/api/docs/oauth/overview "Google Ads API: OAuth 2.0"
[2]: https://developers.google.com/google-ads/api/docs/api-policy/developer-token "Google Ads API: Developer Token"
[3]: https://developers.google.com/webmaster-tools/v1/how-tos/authorizing "Search Console API: Authorize Requests"
[4]: https://support.google.com/webmasters/answer/9008080 "Google Search Console: Verify Site Ownership"
