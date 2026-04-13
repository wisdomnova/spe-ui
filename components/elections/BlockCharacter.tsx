"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────
   Procedurally-generated block / lego-style voter character.
   Every character is unique based on a seed (or random if none).
   When we connect to real data, each voter's ID becomes the seed.
   ────────────────────────────────────────────────────────────── */

const BODY_COLORS = [
  "#3B82F6", "#2563EB", "#6366F1", "#8B5CF6", "#A855F7",
  "#EC4899", "#F43F5E", "#EF4444", "#F97316", "#F59E0B",
  "#EAB308", "#84CC16", "#22C55E", "#10B981", "#14B8A6",
  "#06B6D4", "#0EA5E9", "#6D28D9", "#DB2777", "#059669",
];

const SKIN_TONES = [
  "#FFDBB4", "#E8B88A", "#C68642", "#8D5524", "#6B3A1F", "#F5D0A9",
];

const HAIR_COLORS = [
  "#1A1A1A", "#3D2B1F", "#8B4513", "#D2691E", "#FFD700", "#A0522D",
];

const ACCESSORY_TYPES = ["none", "none", "none", "glasses", "hat", "headphones"] as const;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

interface BlockCharacterProps {
  seed?: number;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function BlockCharacter({
  seed,
  size = 40,
  className = "",
  animate = true,
}: BlockCharacterProps) {
  const traits = useMemo(() => {
    const s = seed ?? Math.floor(Math.random() * 999999);
    const rand = seededRandom(s);

    return {
      bodyColor: pick(BODY_COLORS, rand),
      skinTone: pick(SKIN_TONES, rand),
      hairColor: pick(HAIR_COLORS, rand),
      accessory: pick(ACCESSORY_TYPES, rand),
      hairStyle: Math.floor(rand() * 4), // 0=flat, 1=tall, 2=round, 3=none
      eyeStyle: Math.floor(rand() * 3),  // 0=dots, 1=wide, 2=sleepy
      mouthSmile: rand() > 0.3,
    };
  }, [seed]);

  const s = size;
  const unit = s / 40; // base unit for scaling (designed at 40px)

  const Wrapper = animate ? motion.svg : "svg";
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 8, scale: 0.7 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }
    : {};

  return (
    // @ts-expect-error - motion.svg typing mismatch with SVG props
    <Wrapper
      width={s}
      height={s}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      {...animProps}
    >
      {/* Body (blocky rectangle torso) */}
      <rect x="10" y="22" width="20" height="14" rx="3" fill={traits.bodyColor} />

      {/* Arms */}
      <rect x="5" y="24" width="5" height="10" rx="2" fill={traits.bodyColor} />
      <rect x="30" y="24" width="5" height="10" rx="2" fill={traits.bodyColor} />

      {/* Hands */}
      <circle cx="7.5" cy="35" r="2.5" fill={traits.skinTone} />
      <circle cx="32.5" cy="35" r="2.5" fill={traits.skinTone} />

      {/* Head */}
      <rect x="11" y="4" width="18" height="18" rx="4" fill={traits.skinTone} />

      {/* Hair */}
      {traits.hairStyle === 0 && (
        /* Flat top */
        <rect x="10" y="2" width="20" height="7" rx="2" fill={traits.hairColor} />
      )}
      {traits.hairStyle === 1 && (
        /* Tall / pompadour */
        <>
          <rect x="10" y="2" width="20" height="7" rx="2" fill={traits.hairColor} />
          <rect x="12" y="-1" width="12" height="6" rx="2" fill={traits.hairColor} />
        </>
      )}
      {traits.hairStyle === 2 && (
        /* Round / afro */
        <ellipse cx="20" cy="5" rx="12" ry="6" fill={traits.hairColor} />
      )}
      {/* hairStyle 3 = bald, no hair drawn */}

      {/* Eyes */}
      {traits.eyeStyle === 0 && (
        /* Dot eyes */
        <>
          <circle cx="16" cy="13" r="1.5" fill="#1A1A1A" />
          <circle cx="24" cy="13" r="1.5" fill="#1A1A1A" />
        </>
      )}
      {traits.eyeStyle === 1 && (
        /* Wide eyes */
        <>
          <circle cx="16" cy="13" r="2.2" fill="white" />
          <circle cx="24" cy="13" r="2.2" fill="white" />
          <circle cx="16" cy="13" r="1.2" fill="#1A1A1A" />
          <circle cx="24" cy="13" r="1.2" fill="#1A1A1A" />
        </>
      )}
      {traits.eyeStyle === 2 && (
        /* Sleepy eyes */
        <>
          <line x1="14" y1="13" x2="18" y2="13" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="13" x2="26" y2="13" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {/* Mouth */}
      {traits.mouthSmile ? (
        <path d="M17 17 Q20 20 23 17" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      ) : (
        <line x1="17" y1="18" x2="23" y2="18" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
      )}

      {/* Accessories */}
      {traits.accessory === "glasses" && (
        <>
          <rect x="13" y="11" width="6" height="5" rx="1.5" stroke="#555" strokeWidth="1" fill="none" />
          <rect x="21" y="11" width="6" height="5" rx="1.5" stroke="#555" strokeWidth="1" fill="none" />
          <line x1="19" y1="13" x2="21" y2="13" stroke="#555" strokeWidth="1" />
        </>
      )}
      {traits.accessory === "hat" && (
        <g>
          <rect x="9" y="2" width="22" height="3" rx="1" fill={traits.bodyColor} />
          <rect x="13" y="-2" width="14" height="5" rx="2" fill={traits.bodyColor} />
        </g>
      )}
      {traits.accessory === "headphones" && (
        <g>
          <path d="M10 10 Q10 3 20 3 Q30 3 30 10" stroke="#555" strokeWidth="2" fill="none" />
          <rect x="7" y="9" width="4" height="6" rx="2" fill="#555" />
          <rect x="29" y="9" width="4" height="6" rx="2" fill="#555" />
        </g>
      )}
    </Wrapper>
  );
}
