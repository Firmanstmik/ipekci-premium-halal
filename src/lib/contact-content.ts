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
import { BRAND } from "@/lib/brand";

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
    primary: BRAND.addressLine1,
    secondary: BRAND.addressLine2,
    href: `https://maps.google.com/?q=${encodeURIComponent(BRAND.addressFull)}`,
  },
  {
    id: "telefoon",
    icon: Phone,
    label: "Telefoon",
    primary: BRAND.phoneDisplay,
    secondary: "Bereikbaar tijdens kantooruren",
    href: `tel:${BRAND.phoneTel}`,
  },
  {
    id: "email",
    icon: Mail,
    label: "E-mail",
    primary: BRAND.email,
    secondary: "Wij reageren zo snel mogelijk",
    href: `mailto:${BRAND.email}`,
  },
  {
    id: "openingstijden",
    icon: Clock3,
    label: "Openingstijden",
    primary: BRAND.hours,
    secondary: "Zondag gesloten",
  },
] as const;

export const CONTACT_TRUST = [
  {
    icon: ShieldCheck,
    title: "100% Halal",
    description: "Onder strikte toezicht van ECC Halal",
  },
  {
    icon: Award,
    title: "NVWA Normen",
    description: "Volgens de Nederlandse Voedsel- en Warenautoriteit",
  },
  {
    icon: Building2,
    title: "Klantgericht",
    description: "Klant staat centraal bij elke levering",
  },
  {
    icon: Truck,
    title: "Snelle Levering",
    description: "Modern wagenpark voor betrouwbare levering",
  },
] as const;

export const CONTACT_QUICK_ACTIONS = [
  { label: "Bel direct", href: `tel:${BRAND.phoneTel}`, icon: Phone, primary: true },
  { label: "Stuur e-mail", href: `mailto:${BRAND.email}`, icon: Mail },
  {
    label: "Route",
    href: `https://maps.google.com/?q=${encodeURIComponent(BRAND.addressFull)}`,
    icon: MapPin,
  },
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
    text: "Hulp bij het kiezen van de juiste producten",
  },
  {
    icon: Award,
    title: "Betrouwbare partner",
    text: "Halal, kwaliteit en klantgerichtheid",
  },
] as const;
