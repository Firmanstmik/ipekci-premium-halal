import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { RevealGroup, RevealItem } from "@/components/Reveal";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Optional brand kicker above the eyebrow title inside the logo badge */
  kicker?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  kicker = "Ayat Food",
}: Props) {
  return (
    <RevealGroup className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <RevealItem className={align === "center" ? "flex justify-center" : ""}>
        <AyatSectionBadge kicker={kicker} title={eyebrow} align={align} />
      </RevealItem>
      <RevealItem>
        <h2 className="ipek-h2-lg mt-5 text-foreground">{title}</h2>
      </RevealItem>
      {description ? (
        <RevealItem>
          <p className="ipek-body mt-6 max-w-xl text-muted-foreground">{description}</p>
        </RevealItem>
      ) : null}
    </RevealGroup>
  );
}
