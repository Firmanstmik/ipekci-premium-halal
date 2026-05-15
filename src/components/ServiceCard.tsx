import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

interface Props {
  number: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ServiceCard({ number, title, description, image, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(380px circle at ${glowX} ${glowY}, color-mix(in oklab, var(--primary) 35%, transparent), transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 80, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.1,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-sm border border-white/5 bg-surface will-change-transform"
    >
      {/* Cursor-tracked glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glowBg, mixBlendMode: "screen" }}
      />

      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-700 group-hover:from-background/95" />

        {/* Lighting sweep */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        <div className="absolute left-6 top-6 font-display text-xs font-medium tracking-[0.3em] text-primary">
          {number}
        </div>
        <motion.div
          className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-background/40 backdrop-blur transition-all duration-500 group-hover:bg-primary group-hover:border-primary"
        >
          <ArrowUpRight
            size={16}
            className="text-foreground transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-foreground"
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 p-7">
          <h3 className="font-display text-2xl text-foreground transition-transform duration-700 group-hover:-translate-y-1 md:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
