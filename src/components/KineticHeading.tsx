import { motion } from "framer-motion";

interface Props {
  lines: { text: string; accent?: boolean }[];
  className?: string;
  delay?: number;
}

// Per-word mask reveal with cinematic staggered timing
export function KineticHeading({ lines, className = "", delay = 0.5 }: Props) {
  let wordIndex = 0;
  return (
    <h1 className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.08em]">
          <span className="block">
            {line.text.split(" ").map((word, wi) => {
              const i = wordIndex++;
              return (
                <span key={wi} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    initial={{ y: "110%", opacity: 0, rotateX: -45 }}
                    animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: delay + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${line.accent ? "text-gradient-orange italic font-light" : ""}`}
                    style={{ transformOrigin: "50% 100%" }}
                  >
                    {word}
                  </motion.span>
                  {wi < line.text.split(" ").length - 1 && <span>&nbsp;</span>}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}
