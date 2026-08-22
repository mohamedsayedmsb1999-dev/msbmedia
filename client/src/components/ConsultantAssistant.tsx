import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { openWhatsApp } from "@/lib/site-data";

type ChatMessage = { role: "user" | "assistant"; content: string };
type SalesStage = "discover" | "analyze" | "qualify" | "close";

const initialMessage: ChatMessage = { role: "assistant", content: "أهلًا بيك، أنا خبير مبيعات MSB Media. احكي لي عن نشاطك وهدفك، وأنا هفهم احتياجك خطوة بخطوة." };
const stageLabel: Record<SalesStage, string> = { discover: "بنسمع احتياجك", analyze: "بنحلل أنسب مسار", qualify: "بنجهز توصية دقيقة", close: "جاهز للخطوة التالية" };

export default function ConsultantAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [draft, setDraft] = useState("");
  const [stage, setStage] = useState<SalesStage>("discover");
  const [handoffReady, setHandoffReady] = useState(false);
  const leadSummary = useMemo(() => messages.filter(message => message.role === "user").slice(-3).map(message => message.content).join(" | "), [messages]);
  const chat = trpc.assistant.chat.useMutation({
    onSuccess: data => {
      setMessages(current => [...current, { role: "assistant", content: data.answer }]);
      setStage(data.stage);
      setHandoffReady(data.handoffToWhatsApp);
    },
    onError: () => setMessages(current => [...current, { role: "assistant", content: "حصل تأخير بسيط. اكتب هدفك الأساسي أو ابدأ محادثة مع فريقنا على واتساب." }]),
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || chat.isPending) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next); setDraft(""); chat.mutate({ history: next.slice(-10) });
  };
  return <div className="assistant-root">
    {open && <section className="assistant-window" aria-label="خبير مبيعات MSB Media الذكي">
      <header><div className="flex items-center gap-3"><span className="assistant-spark"><Sparkles className="h-4 w-4" /></span><div><strong>خبير مبيعات MSB Media</strong><small>{stageLabel[stage]} · كل اللغات</small></div></div><button onClick={() => setOpen(false)} aria-label="إغلاق المساعد"><X className="h-5 w-5" /></button></header>
      <div className="assistant-messages">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`assistant-message ${message.role}`}><p>{message.content}</p></div>)}{chat.isPending && <div className="assistant-message assistant"><p className="assistant-typing">براجع احتياجك علشان أوجّهك صح...</p></div>}</div>
      {handoffReady ? <button onClick={() => openWhatsApp(`ملخص احتياجي من مساعد MSB Media: ${leadSummary}`)} className="assistant-handoff"><MessageCircle className="h-4 w-4" />ابدأ محادثة واتساب مع الفريق</button> : <p className="assistant-stage-note">اسألني عن هدفك أو نوع الخدمة، وبعدها نرتب لك الخطوة المناسبة.</p>}
      <form onSubmit={submit}><input value={draft} onChange={event => setDraft(event.target.value)} placeholder="اكتب سؤالك بالعربي أو بأي لغة..." maxLength={1200} /><button type="submit" disabled={chat.isPending || !draft.trim()} aria-label="إرسال السؤال"><Send className="h-4 w-4" /></button></form>
    </section>}
    <button className="assistant-fab" onClick={() => { setOpen(!open); if (!open) toast.success("أهلًا، اكتب هدفك وخلّيني أوجّهك."); }} aria-label="فتح خبير مبيعات MSB Media"><MessageCircle className="h-5 w-5" /><span>استشارة ذكية</span></button>
  </div>;
}
