import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-primary" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-6 font-display text-4xl text-foreground md:text-6xl lg:text-7xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </motion.div>
  );
}
