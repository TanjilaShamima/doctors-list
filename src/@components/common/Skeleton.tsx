import React from "react";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode; // allow composition
}

// Basic skeleton block. Use width/height utilities when using it.
export function Skeleton({ className = "", children }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-gray-200/80 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <div className="opacity-0">{children}</div>
    </div>
  );
}

// Add keyframes (can be moved to global css if desired)
// Using inline style tag export for convenience when Tailwind not configured with custom keyframes
if (
  typeof document !== "undefined" &&
  !document.getElementById("skeleton-shimmer-style")
) {
  const style = document.createElement("style");
  style.id = "skeleton-shimmer-style";
  style.innerHTML = `@keyframes shimmer {100% {transform: translateX(100%);}}`;
  document.head.appendChild(style);
}

interface LinesProps {
  lines?: number;
  className?: string;
}

// Convenience: stack of skeleton lines
export function SkeletonLines({
  lines = 3,
  className = "space-y-2",
}: LinesProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 bg-gray-200/80 rounded ${
            i === lines - 1 ? "w-2/3" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}
