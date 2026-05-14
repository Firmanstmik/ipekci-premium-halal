import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Props {
  number: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ServiceCard({ number, title, description, image, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-sm border border-white/5 bg-surface"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute left-6 top-6 font-display text-xs font-medium tracking-[0.3em] text-primary">
          {number}
        </div>
        <div className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-background/40 backdrop-blur transition-all duration-500 group-hover:bg-primary group-hover:border-primary">
          <ArrowUpRight
            size={16}
            className="text-foreground transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-foreground"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-7">
          <h3 className="font-display text-2xl text-foreground md:text-3xl">{title}</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
