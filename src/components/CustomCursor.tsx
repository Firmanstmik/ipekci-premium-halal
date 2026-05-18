import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 600 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    
    const interactiveElements = document.querySelectorAll("a, button, [role='button'], .group");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Custom Cursor - Logo Promax */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovering ? 1.25 : 1, 
            opacity: 1,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 20 
          }}
          className="relative"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
            className="select-none"
            style={{
              color: "rgba(200,164,107,0.88)",
              filter:
                "drop-shadow(0 14px 24px rgba(0,0,0,0.5)) drop-shadow(0 0 18px rgba(200,164,107,0.12))",
            }}
          >
            <path
              d="M19 18c0 6-4 12-9 12S1 24 1 18 6 5 10 5s9 7 9 13Z"
              fill="currentColor"
              opacity="0.95"
            />
            <path
              d="M63 18c0 6-4 12-9 12s-9-6-9-12S50 5 54 5s9 7 9 13Z"
              fill="currentColor"
              opacity="0.95"
            />
            <path
              d="M12 36c2-5 9-9 20-9s18 4 20 9c2 5 0 18-20 18S10 41 12 36Z"
              fill="currentColor"
            />
            <path
              d="M22 33c0 2-1.8 3.5-4 3.5s-4-1.5-4-3.5 1.8-3.5 4-3.5 4 1.5 4 3.5Z"
              fill="currentColor"
              opacity="0.65"
            />
            <path
              d="M46 33c0 2-1.8 3.5-4 3.5s-4-1.5-4-3.5 1.8-3.5 4-3.5 4 1.5 4 3.5Z"
              fill="currentColor"
              opacity="0.65"
            />
          </svg>
          {/* Glow effect */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.35, scale: 1.6 }}
              className="absolute inset-0 rounded-full bg-[rgba(200,164,107,0.18)] blur-2xl -z-10"
            />
          )}
        </motion.div>
      </motion.div>
      
      {/* Hide default cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
