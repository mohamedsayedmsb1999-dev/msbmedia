import SiteShell from "@/components/SiteShell";
import { Clock3, Sparkles } from "lucide-react";

export default function AiVideoComingSoon() {
  return <SiteShell>
    <section className="page-hero">
      <div className="site-container py-16 sm:py-24">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-[#07133c] p-8 text-center shadow-2xl sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#ffd400] text-[#020615]"><Clock3 className="h-8 w-8" /></span>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#ffd400]/35 bg-[#ffd400]/10 px-4 py-2 text-sm font-black text-[#ffd400]"><Sparkles className="h-4 w-4" />قريبًا</span>
          <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">MSB AI Video</h1>
          <p className="mt-4 leading-8 text-slate-200">الخدمة مغلقة مؤقتًا وتعود عند جاهزية التجربة المناسبة للعملاء.</p>
        </div>
      </div>
    </section>
  </SiteShell>;
}
