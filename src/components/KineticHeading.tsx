import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  lines: { text: string; accent?: boolean }[];
  className?: string;
  delay?: number;
}

/**
 * KineticHeading — Triple-layer word reveal
 *
 * Three simultaneous effects per word (agency-grade, rarely seen on public sites):
 *  1. Y-slide       — word rises from 110% → 0%
 *  2. Blur dissolve — filter: blur(14px) → blur(0px)  [almost no one does this at word level]
 *  3. Tracking compression — letterSpacing 0.22em → 0em (wide → tight as it lands)
 *
 * The combination mimics high-end broadcast motion graphics (Work & Co / Buck / Fantasy style).
 */
export function KineticHeading({ lines, className = "", delay = 0.5 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  let wordIndex = 0;

  return (
    <h1 ref={ref} className={className}>
      {lines.map((line, li) => (
        /*
         * Line-level wrapper:
         * overflow-hidden masks the word sliding in from below.
         * pb-[0.4em] gives full room for italic descenders (z, g, j, r)
         * without ever clipping them.
         */
        <span key={li} className="block overflow-hidden pb-[0.4em]">
          <span className="block">
            {line.text.split(" ").map((word, wi) => {
              const i = wordIndex++;
              return (
                /*
                 * Word wrapper: NO overflow-hidden — that was clipping descenders.
                 * align-top keeps baseline stable across blur/tracking animation.
                 */
                <span key={wi} className="inline-block align-top">
                  <motion.span
                    initial={{
                      y: "110%",
                      opacity: 0,
                      filter: "blur(14px)",
                      letterSpacing: "0.22em",
                    }}
                    animate={
                      isInView
                        ? {
                            y: "0%",
                            opacity: 1,
                            filter: "blur(0px)",
                            letterSpacing: line.accent ? "-0.02em" : "0em",
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.1,
                      delay: delay + i * 0.09,
                      ease: [0.16, 1, 0.3, 1],
                      /* Blur clears slightly faster than the slide for a crisp landing */
                      filter: {
                        duration: 0.9,
                        delay: delay + i * 0.09 + 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      /* Tracking compression snaps in last — the "settle" feel */
                      letterSpacing: {
                        duration: 0.85,
                        delay: delay + i * 0.09 + 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className={`inline-block will-change-transform ${
                      line.accent ? "text-gradient-orange italic font-light" : ""
                    }`}
                    style={{ transformOrigin: "50% 100%" }}
                  >
                    {word}
                  </motion.span>
                  {wi < line.text.split(" ").length - 1 && (
                    <span aria-hidden>&nbsp;</span>
                  )}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}
