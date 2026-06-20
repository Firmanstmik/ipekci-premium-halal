import { RevealGroup, RevealItem } from "@/components/Reveal";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <RevealGroup className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <RevealItem className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-primary" aria-hidden />
        <span className="ipek-label text-primary">{eyebrow}</span>
      </RevealItem>
      <RevealItem>
        <h2 className="ipek-h2-lg mt-6 text-foreground">{title}</h2>
      </RevealItem>
      {description ? (
        <RevealItem>
          <p className="ipek-body mt-6 max-w-xl text-muted-foreground">{description}</p>
        </RevealItem>
      ) : null}
    </RevealGroup>
  );
}
