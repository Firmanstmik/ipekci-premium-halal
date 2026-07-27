import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import {
  DS_DURATION,
  DS_EASE,
  DS_REVEAL_Y,
  DS_VIEWPORT,
  dsRevealTransition,
} from "@/lib/design-system";

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
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 150, damping: 20 });
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
      initial={{ opacity: 0, y: DS_REVEAL_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={DS_VIEWPORT}
      transition={{
        ...dsRevealTransition(index * 0.09),
        duration: DS_DURATION.reveal,
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="ipek-card group will-change-transform"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: glowBg,
          mixBlendMode: "screen",
          transitionDuration: `${DS_DURATION.ui}s`,
        }}
      />

      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DS_DURATION.slow, ease: DS_EASE }}
          style={{ transformOrigin: "center" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity group-hover:from-background/95"
          style={{ transitionDuration: `${DS_DURATION.ui}s` }}
        />

        <div
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform group-hover:translate-x-full"
          style={{
            transitionDuration: `${DS_DURATION.slow}s`,
            transitionTimingFunction: "var(--ipek-ease)",
          }}
        />

        <div className="ipek-label absolute left-6 top-6 text-primary">{number}</div>
        <motion.div
          className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-background/40 backdrop-blur transition-all group-hover:border-primary group-hover:bg-primary"
          style={{ transitionDuration: `${DS_DURATION.ui}s` }}
        >
          <ArrowUpRight
            size={16}
            className="ipek-btn-icon text-foreground group-hover:text-primary-foreground"
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 p-7">
          <h3
            className="ipek-h3 text-foreground transition-transform group-hover:-translate-y-1"
            style={{ transitionDuration: `${DS_DURATION.ui}s` }}
          >
            {title}
          </h3>
          <p className="ipek-body-sm mt-3 max-w-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.article>
  );
}
