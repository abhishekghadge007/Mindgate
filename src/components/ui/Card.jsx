import React from "react";

export default function Card({ children, className = "", title, subtitle, actions }) {
  return (
    <div className={`bg-white rounded-2xl shadow-card border border-slate-100 ${className}`}>
      {(title || actions) && (
        <div className="flex items-start justify-between px-6 pt-6">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
