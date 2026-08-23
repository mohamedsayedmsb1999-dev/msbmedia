# مراجع النشر الخارجي

- تشرح وثائق Vercel أن ربط مستودع Git ينشئ معاينات للفروع، وأن الدمج أو الدفع إلى فرع الإنتاج ينشئ نشر الإنتاج. المصدر: https://vercel.com/docs/git
- تشرح وثائق Vercel أن إعدادات البناء ومجلد المخرجات ومتغيرات البيئة تُطبق على النشر التالي، وأن متغيرات البيئة لا تُطبَّق بأثر رجعي على نشر سابق. المصادر: https://vercel.com/docs/builds/configure-a-build وhttps://vercel.com/docs/environment-variables
- وثائق Express على Vercel: تطبيق Express يحتاج مدخلًا متوافقًا مع Vercel، والملفات الثابتة ينبغي تقديمها من `public/**` في نموذج Express القياسي. المصدر: https://vercel.com/docs/frameworks/backend/express
- وثائق Supabase Edge Functions: الدوال مناسبة لواجهات HTTP والخدمات الخارجية، ويجب تخزين الأسرار في متغيرات بيئة الدالة لا في متصفح العميل. المصدر: https://supabase.com/docs/guides/functions
- وثائق Supabase Storage: العمليات الحساسة على التخزين يجب تنفيذها بمفتاح خادمي سري لا يظهر في العميل. المصدر: https://supabase.com/docs/guides/functions/storage-caching
