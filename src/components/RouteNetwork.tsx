import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// European hubs (relative SVG coords inside 1000x600 viewBox)
const hubs = [
  { id: "rtm", name: "Rotterdam", x: 280, y: 215, primary: true },
  { id: "ams", name: "Amsterdam", x: 295, y: 188 },
  { id: "ant", name: "Antwerpen", x: 295, y: 250 },
  { id: "ham", name: "Hamburg", x: 430, y: 165 },
  { id: "ber", name: "Berlin", x: 510, y: 215 },
  { id: "dus", name: "Düsseldorf", x: 360, y: 250 },
  { id: "par", name: "Paris", x: 240, y: 330 },
  { id: "mil", name: "Milano", x: 440, y: 380 },
  { id: "vie", name: "Wien", x: 560, y: 305 },
  { id: "war", name: "Warszawa", x: 620, y: 200 },
  { id: "mad", name: "Madrid", x: 110, y: 415 },
  { id: "sto", name: "Stockholm", x: 510, y: 70 },
  { id: "lon", name: "London", x: 195, y: 200 },
];

const routes: [string, string][] = [
  ["rtm", "ham"], ["rtm", "ant"], ["rtm", "ams"], ["rtm", "lon"],
  ["rtm", "par"], ["rtm", "dus"], ["dus", "ber"], ["ber", "war"],
  ["ham", "sto"], ["par", "mad"], ["dus", "mil"], ["ber", "vie"],
  ["ant", "par"], ["ham", "ber"],
];

const find = (id: string) => hubs.find((h) => h.id === id)!;

function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.18 - 20;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}

export function RouteNetwork() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 600"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.72 0.18 45)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 45)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.72 0.18 45)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="oklch(0.85 0.18 50)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 45)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Grid */}
      <g opacity="0.06">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="white" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="white" strokeWidth="0.5" />
        ))}
      </g>

      {/* Routes */}
      {routes.map(([a, b], i) => {
        const A = find(a);
        const B = find(b);
        const d = curve(A, B);
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#line)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                duration: 2.2,
                delay: 0.3 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* Travelling pulse */}
            <motion.circle
              r="2.5"
              fill="oklch(0.95 0.18 60)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
              transition={{
                duration: 4,
                delay: 2 + i * 0.3,
                repeat: Infinity,
                repeatDelay: routes.length * 0.3,
                ease: "linear",
              }}
            >
              <animateMotion dur="4s" repeatCount="indefinite" begin={`${2 + i * 0.3}s`} path={d} />
            </motion.circle>
          </g>
        );
      })}

      {/* Hubs */}
      {hubs.map((h, i) => (
        <motion.g
          key={h.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {h.primary && (
            <>
              <circle cx={h.x} cy={h.y} r="40" fill="url(#glow)" />
              <motion.circle
                cx={h.x}
                cy={h.y}
                r="10"
                fill="none"
                stroke="oklch(0.72 0.18 45)"
                strokeWidth="1"
                animate={{ r: [10, 28, 10], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            </>
          )}
          <circle
            cx={h.x}
            cy={h.y}
            r={h.primary ? 5 : 3}
            fill={h.primary ? "oklch(0.85 0.18 50)" : "oklch(0.97 0.005 80)"}
          />
          <circle cx={h.x} cy={h.y} r={h.primary ? 5 : 3} fill="none" stroke="white" strokeOpacity="0.3" />
          <text
            x={h.x + 9}
            y={h.y + 4}
            fontSize="9"
            fontWeight="500"
            fill="white"
            fillOpacity={h.primary ? "0.95" : "0.55"}
            style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            {h.name}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
