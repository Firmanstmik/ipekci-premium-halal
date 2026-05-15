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
 * Refined for:
 *  - premium typography
 *  - stable italic rendering
 *  - zero clipping on descenders
 *  - cinematic motion
 *  - high-end editorial feel
 */
export function KineticHeading({
  lines,
  className = "",
  delay = 0.5,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  let wordIndex = 0;

  return (
    <h1
      ref={ref}
      className={`${className} overflow-visible`}
      style={{
        overflow: "visible",
      }}
    >
      {lines.map((line, li) => (
        <span
          key={li}
          className="
            block
            overflow-visible
            pb-[0.22em]
            leading-[0.82]
          "
          style={{
            overflow: "visible",
          }}
        >
          <span
            className="block overflow-visible"
            style={{
              overflow: "visible",
            }}
          >
            {line.text.split(" ").map((word, wi) => {
              const i = wordIndex++;

              return (
                <span
                  key={wi}
                  className="
                    inline-flex
                    align-baseline
                    overflow-visible
                  "
                  style={{
                    overflow: "visible",
                  }}
                >
                  <motion.span
                    initial={{
                      y: 120,
                      opacity: 0,
                      filter: "blur(14px)",
                      letterSpacing: "0.22em",
                    }}
                    animate={
                      isInView
                        ? {
                            y: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                            letterSpacing: line.accent
                              ? "-0.01em"
                              : "0em",
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.1,
                      delay: delay + i * 0.09,
                      ease: [0.16, 1, 0.3, 1],

                      filter: {
                        duration: 0.9,
                        delay: delay + i * 0.09 + 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      },

                      letterSpacing: {
                        duration: 0.85,
                        delay: delay + i * 0.09 + 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className={`inline-block will-change-transform ${
                      line.accent
                        ? `
                          text-gradient-orange
                          italic
                          font-light
                          tracking-[-0.03em]
                          pr-[0.08em]
                          pb-[0.08em]
                        `
                        : ""
                    }`}
                    style={{
                      transformOrigin: "50% 100%",
                      backfaceVisibility: "hidden",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                      overflow: "visible",
                    }}
                  >
                    {word}
                  </motion.span>

                  {wi < line.text.split(" ").length - 1 && (
                    <span
                      aria-hidden
                      className="inline-block w-[0.18em]"
                    />
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