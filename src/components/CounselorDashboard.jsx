import React, { useMemo, useState } from "react";
import Card from "./ui/Card.jsx";
import Badge from "./ui/Badge.jsx";
import { dummyStudents } from "../data/dummyStudents.js";
import { rankStudents } from "../logic/allocation.js";

export default function CounselorDashboard() {
  const ranked = useMemo(() => rankStudents(dummyStudents, 10), []);
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? ranked : ranked.filter((s) => s.risk === filter);

  const stats = {
    red:    ranked.filter(s => s.risk === "RED").length,
    yellow: ranked.filter(s => s.risk === "YELLOW").length,
    green:  ranked.filter(s => s.risk === "GREEN").length,
    avgCRI: (ranked.reduce((a, s) => a + s.cri, 0) / ranked.length).toFixed(2),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <DashStat label="High risk (RED)"   value={stats.red}    color="bg-red-500" />
        <DashStat label="Moderate (YELLOW)" value={stats.yellow} color="bg-amber-500" />
        <DashStat label="Low (GREEN)"       value={stats.green}  color="bg-emerald-500" />
        <DashStat label="Avg CRI"           value={stats.avgCRI} color="bg-brand-600" />
      </div>

      <Card
        title="Student Roster"
        subtitle="Detailed reasoning per student — used by counselors to validate triage decisions."
        actions={
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {["ALL", "RED", "YELLOW", "GREEN"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-semibold rounded ${
                  filter === f ? "bg-white shadow-soft text-slate-900" : "text-slate-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className={`rounded-xl border p-4 ${
                s.allocated ? "border-brand-200 bg-brand-50/40" : "border-slate-100 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">#{s.rank}</span>
                    <span className="font-semibold text-slate-900">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge level={s.risk} />
                    <span className="text-xs text-slate-500">CRI: <strong className="text-slate-800">{s.cri}</strong></span>
                    <span className="text-xs text-slate-500">PHQ-9: <strong className="text-slate-800">{s.phq9}</strong></span>
                    <span className="text-xs text-slate-500">GAD-7: <strong className="text-slate-800">{s.gad7}</strong></span>
                  </div>
                </div>
                <div className="text-right">
                  {s.allocated ? (
                    <span className="inline-block text-[10px] font-bold text-brand-700 bg-brand-100 px-2 py-1 rounded-full uppercase">
                      Slot Allocated
                    </span>
                  ) : (
                    <span className="inline-block text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase">
                      Waitlist
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 italic">{s.rankReason}</p>

              <details className="mt-2">
                <summary className="text-xs font-medium text-brand-600 cursor-pointer select-none">
                  View clinical reasons
                </summary>
                <ul className="mt-2 space-y-1">
                  {s.reasons.map((r, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-1.5">
                      <span className="text-slate-300">•</span> {r}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DashStat({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex items-center gap-3">
      <div className={`h-10 w-10 rounded-xl ${color} grid place-items-center text-white font-bold`}>
        {String(value).slice(0,2)}
      </div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-lg font-bold text-slate-900">{value}</div>
      </div>
    </div>
  );
}
