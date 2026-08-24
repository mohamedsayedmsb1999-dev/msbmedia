import { useState } from "react";

export default function HeroStudioImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  if (failed) {
    return <div role="img" aria-label="استوديو MSB Media" className="grid h-[340px] w-full place-items-center rounded-[1.4rem] bg-[linear-gradient(135deg,#061534,#0a4aa1_58%,#856304)] text-center text-white"><div><strong className="block text-lg font-black">MSB Media</strong><span className="mt-2 block text-xs text-slate-200">إعلانات · محتوى · مواقع</span></div></div>;
  }

  return <div className="relative h-[340px] w-full overflow-hidden rounded-[1.4rem] bg-[linear-gradient(135deg,#061534,#0a4aa1_58%,#856304)]">{loading && <div className="absolute inset-0 grid place-items-center text-center text-white"><div><strong className="block text-lg font-black">MSB Media</strong><span className="mt-2 block text-xs text-slate-200">نجهز تجربة مرئية سريعة</span></div></div>}<img src={src} alt="" fetchPriority="high" decoding="async" onLoad={() => setLoading(false)} onError={() => setFailed(true)} className={`relative z-10 h-full w-full object-cover object-[50%_43%] transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`} /></div>;
}
