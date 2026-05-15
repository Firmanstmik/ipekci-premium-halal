import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  lines: { text: string; accent?: boolean }[];
  className?: string;
  delay?: number;
}

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
            leading-[0.85]
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
                      y: 80,
                      opacity: 0,
                    }}
                    animate={
                      isInView
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.9,
                      delay: delay + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block will-change-transform ${
                      line.accent
                        ? `
                          text-primary
                          font-bold
                          tracking-[-0.02em]
                          pr-[0.05em]
                          pb-[0.05em]
                        `
                        : `
                          font-[Manrope]
                          font-semibold
                        `
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
                      className="inline-block w-[0.2em]"
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
