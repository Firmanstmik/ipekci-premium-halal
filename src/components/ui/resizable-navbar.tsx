"use client";

import React, { useRef, useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";

const IPEKCI_LOGO_URL = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/logo_footer.webp";

/* ─────────────────── interfaces ─────────────────── */

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  shown?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  shown?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/* ─────────────────── Navbar (scroll watcher) ─────────────────── */

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isPastThreshold = latest > 80;
    setVisible(isPastThreshold);

    if (!isPastThreshold) {
      setShown(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
      return;
    }

    setShown(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setShown(false);
    }, 3000);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible, shown },
            )
          : child,
      )}
    </motion.div>
  );
};

/* ─────────────────── NavBody (desktop pill) ─────────────────── */

export const NavBody = ({ children, className, visible, shown }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        opacity: shown === false ? 0 : 1,
        backdropFilter: visible ? "blur(18px) saturate(150%)" : "blur(12px) saturate(150%)",
        boxShadow: visible
          ? "0 22px 70px -26px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 10px 40px -24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        width: visible ? "78%" : "100%",
        y: shown === false ? -18 : visible ? 14 : 10,
        borderRadius: "9999px",
        paddingTop: visible ? "0.6rem" : "0.7rem",
        paddingBottom: visible ? "0.6rem" : "0.7rem",
        paddingLeft: visible ? "1.5rem" : "1.35rem",
        paddingRight: visible ? "1.5rem" : "1.35rem",
      }}
      transition={{ type: "spring", stiffness: 240, damping: 44 }}
      style={{ maxWidth: "1480px", minWidth: "1000px" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full flex-row items-center justify-between self-start border border-white/[0.08] bg-background/15 lg:flex",
        visible && "bg-background/70",
        shown === false && "pointer-events-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────── NavItems (desktop links) ─────────────────── */

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-foreground/70 transition duration-200 hover:text-foreground lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="group relative px-4 py-2 text-[13px] tracking-wide text-foreground/70 transition-colors duration-200 hover:text-foreground"
        >
          {/* animated hover background pill */}
          {hovered === idx && (
            <motion.span
              layoutId="nav-hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/[0.07]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {/* orange underline on hover */}
          <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

/* ─────────────────── MobileNav (mobile pill) ─────────────────── */

export const MobileNav = ({ children, className, visible, shown }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        opacity: shown === false ? 0 : 1,
        backdropFilter: visible ? "blur(18px) saturate(150%)" : "blur(12px) saturate(150%)",
        boxShadow: visible
          ? "0 22px 70px -26px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 10px 40px -24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        width: visible ? "92%" : "100%",
        paddingLeft: visible ? "16px" : "0px",
        paddingRight: visible ? "16px" : "0px",
        borderRadius: visible ? "14px" : "14px",
        y: shown === false ? -18 : visible ? 14 : 10,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 44 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between border border-white/[0.08] bg-background/15 px-0 py-2 lg:hidden",
        visible && "bg-background/70",
        shown === false && "pointer-events-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────── MobileNavHeader ─────────────────── */

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

/* ─────────────────── MobileNavMenu ─────────────────── */

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg border border-white/[0.08] bg-background/90 px-4 py-6 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────── MobileNavToggle ─────────────────── */

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Sluit menu" : "Open menu"}
      className="relative flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors duration-200 hover:bg-white/[0.07]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <IconX size={20} className="text-foreground" />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <IconMenu2 size={20} className="text-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

/* ─────────────────── NavbarLogo ─────────────────── */

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      aria-label="Ipekçi Slachterij"
      className="relative z-20 flex items-center gap-3 px-2 py-1 transition-opacity duration-200 hover:opacity-80"
    >
      <img
        src={IPEKCI_LOGO_URL}
        alt="Ipekçi Slachterij"
        className="h-9 w-auto select-none transition-all duration-300 sm:h-10"
        loading="eager"
        decoding="async"
      />
    </a>
  );
};

/* ─────────────────── NavbarButton ─────────────────── */

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const base =
    "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 hover:-translate-y-px active:scale-[0.97] sm:px-4 sm:py-2 sm:text-[11px]";

  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_0_24px_-4px_color-mix(in_oklab,var(--primary)_50%,transparent)] hover:bg-primary/90 hover:shadow-[0_0_32px_-4px_color-mix(in_oklab,var(--primary)_70%,transparent)]",
    secondary:
      "bg-transparent text-foreground/80 hover:text-foreground hover:bg-white/[0.06]",
    dark: "border border-white/[0.08] bg-background/60 text-foreground hover:bg-background/80",
    gradient:
      "bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_75%,black)] text-primary-foreground",
  };

  return (
    <Tag
      href={href ?? undefined}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
