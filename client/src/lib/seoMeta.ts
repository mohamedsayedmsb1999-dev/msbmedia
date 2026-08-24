export type PageMeta = {
  title: string;
  description: string;
};

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "MSB Media | وكالة تسويق رقمي وإنتاج محتوى",
    description: "MSB Media وكالة عربية لخدمات التسويق الرقمي، فيديوهات UGC، الإعلانات الممولة، تصميم المواقع وصفحات الهبوط، والمونتاج والترجمة.",
  },
  "/services": {
    title: "خدمات التسويق الرقمي وفيديوهات UGC | MSB Media",
    description: "اكتشف خدمات MSB Media: فيديوهات UGC بالذكاء الاصطناعي، إعلانات فيسبوك وإنستجرام، تصميم المواقع وصفحات الهبوط، مونتاج وترجمة الفيديو.",
  },
  "/portfolio": {
    title: "سابقة الأعمال: UGC وإعلانات ومواقع | MSB Media",
    description: "شاهد نماذج توضيحية لخدمات فيديوهات UGC والإعلانات الممولة وتصميم المواقع والمنصات التعليمية التي يقدمها فريق MSB Media.",
  },
  "/payment": {
    title: "طرق الدفع ورفع الإيصال | MSB Media",
    description: "تعرف على طرق دفع خدمات MSB Media عبر Vodafone Cash وBinance Pay، ثم أرسل إيصال التحويل بصورة منظمة وآمنة.",
  },
  "/support": {
    title: "الدعم الفني ومتابعة الطلبات | MSB Media",
    description: "أرسل طلب دعم أو متابعة لخدمات التسويق والمواقع والمحتوى لدى MSB Media، وسيتابع الفريق التفاصيل معك.",
  },
  "/about": {
    title: "عن MSB Media وMohamed Sayed | تسويق ومحتوى رقمي",
    description: "تعرف على MSB Media ومؤسسها Mohamed Sayed وخبرته في الإعلانات والمونتاج وتصميم المواقع وصفحات الهبوط والتجارة الإلكترونية.",
  },
};

export function getPageMeta(pathname: string): PageMeta {
  return PAGE_META[pathname] ?? PAGE_META["/"];
}

export function applyPageMeta(pathname: string) {
  const meta = getPageMeta(pathname);
  document.title = meta.title;

  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = meta.description;

  const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = meta.title;

  const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
  if (ogDescription) ogDescription.content = meta.description;

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = `https://www.msbmedia.agency${pathname === "/" ? "/" : pathname}`;
}
