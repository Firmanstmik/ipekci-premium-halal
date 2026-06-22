import type { LucideIcon } from "lucide-react";
import {
  Award,
  Building2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { CONTACT_HERO_IMAGE, CONTACT_PARTNER } from "@/lib/ons-verhaal-content";

export { CONTACT_HERO_IMAGE, CONTACT_PARTNER };

export type ContactDetail = {
  id: string;
  icon: LucideIcon;
  label: string;
  primary: string;
  secondary?: string;
  href?: string;
};

export const CONTACT_DETAILS: readonly ContactDetail[] = [
  {
    id: "adres",
    icon: MapPin,
    label: "Adres",
    primary: "Buys Ballotstraat 7",
    secondary: "3846 BG Harderwijk, Nederland",
    href: "http://maps.google.com/maps?q=loc:52.3606892,5.6383247",
  },
  {
    id: "telefoon",
    icon: Phone,
    label: "Telefoon",
    primary: "06 - 272 737 63",
    secondary: "Bereikbaar tijdens kantooruren",
    href: "tel:+31627273763",
  },
  {
    id: "email",
    icon: Mail,
    label: "E-mail",
    primary: "info@ipekcislachterij.nl",
    secondary: "Wij reageren zo snel mogelijk",
    href: "mailto:info@ipekcislachterij.nl",
  },
  {
    id: "openingstijden",
    icon: Clock3,
    label: "Openingstijden",
    primary: "Ma - Vr · 07:00 - 17:00",
    secondary: "Za - Zo gesloten",
  },
] as const;

export const CONTACT_TRUST = [
  {
    icon: ShieldCheck,
    title: "Halal gecertificeerd",
    description: "100% volgens islamitische normen en waarden",
  },
  {
    icon: Award,
    title: "Nederlandse kwaliteit",
    description: "Premium vlees van Nederlandse bodem",
  },
  {
    icon: Building2,
    title: "Eigen slachterij",
    description: "Volledige controle over kwaliteit en voedselveiligheid",
  },
  {
    icon: Truck,
    title: "Snelle levering",
    description: "Eigen gekoeld transport door heel Nederland",
  },
] as const;

export const CONTACT_QUICK_ACTIONS = [
  { label: "Bel direct", href: "tel:+31627273763", icon: Phone, primary: true },
  { label: "Stuur e-mail", href: "mailto:info@ipekcislachterij.nl", icon: Mail },
  { label: "Route", href: "http://maps.google.com/maps?q=loc:52.3606892,5.6383247", icon: MapPin },
] as const;

export const CONTACT_REASSURANCE = [
  {
    icon: Clock3,
    title: "Snelle reactie",
    text: "Binnen één werkdag persoonlijk antwoord",
  },
  {
    icon: ShieldCheck,
    title: "Persoonlijk advies",
    text: "Direct contact met ons B2B-team",
  },
  {
    icon: Award,
    title: "Betrouwbare partner",
    text: "Langdurige samenwerkingen sinds 2012",
  },
] as const;
