import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DS_VIEWPORT, dsContainerVariants, dsItemVariants } from "@/lib/design-system";

export type StoryBridgeTone = "dark-dark" | "dark-light" | "light-dark" | "light-light";

export {
  dsContainerVariants as storyContainerReveal,
  dsItemVariants as storyItemReveal,
} from "@/lib/design-system";

/** Intentionally empty — sections meet directly with no transition band. */
export function StoryBridge({
  tone: _tone,
  line: _line,
}: {
  tone: StoryBridgeTone;
  line?: string;
}) {
  return null;
}

export function StoryMoment({
  children,
  emphasis = false,
}: {
  children: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div className={emphasis ? "story-moment story-moment--emphasis" : "story-moment"}>
      {children}
    </div>
  );
}

export function StoryReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={DS_VIEWPORT}
      variants={dsContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StoryItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={dsItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
