import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// تعتمد صفحات الموقع العامة على واجهاتها الخفيفة وواجهة بيانات العملاء المخصصة فقط.
// لا نحمّل طبقة tRPC أو React Query غير المستخدمة في تجربة الزائر الأولى.
createRoot(document.getElementById("root")!).render(<App />);
