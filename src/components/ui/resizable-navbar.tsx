"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(true);
  const shownRef = useRef(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const atTop = latest < 12;

    if (atTop) {
      if (shownRef.current === false) {
        shownRef.current = true;
        setShown(true);
      }
      setVisible(false);
      return;
    }

    if (shownRef.current === true) {
      shownRef.current = false;
      setShown(false);
    }
    setVisible(false);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean; shown?: boolean }>,
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
        boxShadow: "0 0 0 0 rgba(0,0,0,0)",
        y: shown === false ? -18 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 44 }}
      style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}
      className={cn(
        "relative z-[60] mx-auto hidden h-[90px] w-full max-w-[1480px] flex-row items-center justify-between bg-transparent px-5 sm:px-8 lg:px-12 lg:flex",
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
  return (
    <motion.div
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-foreground/70 transition duration-200 hover:text-foreground lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onClick={onItemClick}
          className="group relative px-4 py-2 text-[13px] tracking-wide text-foreground/70 transition-colors duration-200 hover:text-foreground"
        >
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
        boxShadow: "0 0 0 0 rgba(0,0,0,0)",
        y: shown === false ? -18 : 0,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 44 }}
      style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[1480px] flex-col items-center justify-between bg-transparent px-5 py-1.5 sm:px-8 lg:hidden",
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
  onClose,
}: MobileNavMenuProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={cn(
            "fixed inset-0 z-[80] flex w-full flex-col lg:hidden",
            className,
          )}
        >
          <div
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-2xl"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-28 -top-28 h-[420px] w-[420px] rounded-full bg-[rgba(226,192,141,0.14)] blur-[140px]" />
            <div className="absolute -right-28 top-40 h-[520px] w-[520px] rounded-full bg-[rgba(179,18,23,0.16)] blur-[170px]" />
          </div>
          <motion.div
            initial={{ y: 10, filter: "blur(10px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: 10, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="relative z-10 flex h-full w-full flex-col overflow-y-auto px-6 pb-10 pt-10"
          >
            <div className="flex items-center justify-between pb-8">
              <a href="/" aria-label="Ipekçi Slachterij" className="flex items-center">
                <img
                  src={IPEKCI_LOGO_URL}
                  alt="Ipekçi Slachterij"
                  className="h-9 w-auto select-none"
                  loading="eager"
                  decoding="async"
                  style={{
                    filter:
                      "drop-shadow(0 10px 26px rgba(0,0,0,0.35)) drop-shadow(0 0 18px rgba(179,18,23,0.10))",
                  }}
                />
              </a>
              <button
                onClick={onClose}
                aria-label="Sluit menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition-colors hover:bg-white/[0.06]"
              >
                <IconX size={18} className="text-foreground" />
              </button>
            </div>
            {children}
          </motion.div>
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
      className="relative flex h-8 w-8 items-center justify-center rounded-sm text-foreground transition-opacity duration-200 hover:opacity-90"
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
            <IconX size={18} className="text-foreground" />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <IconMenu2 size={18} className="text-foreground" />
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
      className="group relative z-20 flex items-center gap-3 px-2 py-1 transition-opacity duration-200 hover:opacity-90"
    >
      <img
        src={IPEKCI_LOGO_URL}
        alt="Ipekçi Slachterij"
        className="h-8 w-auto select-none transition-all duration-300 sm:h-10"
        loading="eager"
        decoding="async"
        style={{
          filter:
            "drop-shadow(0 10px 26px rgba(0,0,0,0.35)) drop-shadow(0 0 18px rgba(179,18,23,0.10))",
        }}
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
    "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-center text-[10px] font-semibold tracking-[0.08em] transition-all duration-200 hover:-translate-y-px active:scale-[0.97] sm:px-4 sm:py-2 sm:text-[11px]";

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
