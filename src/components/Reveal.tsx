import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import {
  DS_DURATION,
  DS_EASE,
  DS_REVEAL_Y,
  DS_STAGGER,
  DS_VIEWPORT,
  dsRevealTransition,
} from "@/lib/design-system";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  duration?: number;
};

/** Unified section reveal — fade + subtle upward motion */
export function Reveal({
  children,
  className,
  delay = 0,
  y = DS_REVEAL_Y,
  duration = DS_DURATION.reveal,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={DS_VIEWPORT}
      transition={{ ...dsRevealTransition(delay), duration }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = HTMLMotionProps<"div">;

/** Staggered children — use with motion children using dsItemVariants */
export function RevealGroup({ children, className, ...rest }: RevealGroupProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={DS_VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: DS_STAGGER, delayChildren: 0.06 },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: DS_REVEAL_Y },
        visible: {
          opacity: 1,
          y: 0,
          transition: dsRevealTransition(),
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Icon nudge on hover — pair with .ipek-btn */
export const DS_ICON_HOVER = {
  className: "ipek-btn-icon",
  transition: { duration: DS_DURATION.ui, ease: DS_EASE },
} as const;
