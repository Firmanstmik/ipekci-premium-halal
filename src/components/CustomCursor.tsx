import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import promaxLogo from "@/assets/Logo-Promax2.svg";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 600 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
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
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovering ? 1.5 : 1, 
            opacity: 1,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 20 
          }}
          className="relative"
        >
          <img
            src={promaxLogo}
            alt="Cursor"
            className="w-10 h-10 sm:w-12 sm:h-12 select-none"
            style={{
              filter: "drop-shadow(0 0 10px rgba(240,127,28,0.5))",
            }}
          />
          {/* Glow effect */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1.8 }}
              className="absolute inset-0 bg-primary/30 blur-2xl rounded-full -z-10"
            />
          )}
        </motion.div>
      </motion.div>
      
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
