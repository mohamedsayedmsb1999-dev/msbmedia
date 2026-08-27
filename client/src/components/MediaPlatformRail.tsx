import { BadgeDollarSign, Facebook, Ghost, Infinity, Instagram, Music2, Youtube } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import "./media-platform-rail.css";

const platforms = [
  { label: "TikTok", Icon: Music2, tone: "tiktok" },
  { label: "Facebook", Icon: Facebook, tone: "facebook" },
  { label: "Instagram", Icon: Instagram, tone: "instagram" },
  { label: "YouTube", Icon: Youtube, tone: "youtube" },
  { label: "Meta", Icon: Infinity, tone: "meta" },
  { label: "WhatsApp", Icon: WhatsAppIcon, tone: "whatsapp" },
  { label: "Snapchat", Icon: Ghost, tone: "snapchat" },
  { label: "Google Ads", Icon: BadgeDollarSign, tone: "google" },
] as const;

export default function MediaPlatformRail({ compact = false }: { compact?: boolean }) {
  return <section className={`media-platform-rail ${compact ? "is-compact" : ""}`} aria-label="منصات الميديا التي نعمل عبرها"><div className="media-platform-rail-label"><span>MEDIA ECOSYSTEM</span><strong>محتوى وإعلانات عبر منصاتك</strong></div><div className="media-platform-rail-list">{platforms.map(({ label, Icon, tone }) => <span className={`media-platform-pill ${tone}`} key={label}><Icon className="h-4 w-4" /><b>{label}</b></span>)}</div></section>;
}
