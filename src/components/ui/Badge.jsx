import React from "react";

export default function Badge({ level = "GREEN", children, className = "" }) {
  // ✅ normalize value (handles "red", "Red", etc.)
  const normalizedLevel = level?.toUpperCase();

  const styles = {
    GREEN: "bg-emerald-50 text-emerald-700 border-emerald-200",
    YELLOW: "bg-amber-50 text-amber-700 border-amber-200",
    RED: "bg-red-50 text-red-700 border-red-200",
    GRAY: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const dotStyles = {
    GREEN: "bg-emerald-500",
    YELLOW: "bg-amber-500",
    RED: "bg-red-500",
    GRAY: "bg-slate-400",
  };

  const appliedStyle = styles[normalizedLevel] || styles.GRAY;
  const appliedDot = dotStyles[normalizedLevel] || dotStyles.GRAY;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${appliedStyle} ${className}`}
    >
      {/* ✅ colored dot */}
      <span className={`h-1.5 w-1.5 rounded-full ${appliedDot}`} />

      {/* ✅ label */}
      {children || normalizedLevel}
    </span>
  );
}