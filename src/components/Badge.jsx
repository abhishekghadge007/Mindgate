const colors = {
  RED: 'bg-red-100 text-red-700 border-red-200',
  YELLOW: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  GREEN: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};
export default function Badge({ level }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colors[level] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
      {level}
    </span>
  );
}
