import React from "react";

export function Input({ label, id, className = "", ...rest }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                    transition ${className}`}
        {...rest}
      />
    </div>
  );
}

export function Select({ label, id, options = [], className = "", ...rest }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                    transition ${className}`}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function Slider({ label, id, value, onChange, min = 1, max = 5, hint }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <span className="text-sm font-semibold text-brand-600">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
      />
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}
