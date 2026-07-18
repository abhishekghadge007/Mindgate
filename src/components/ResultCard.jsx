import Card from './Card';
import Badge from './Badge';

export default function ResultCard({ result }) {
  const { phq9, gad7, risk, cri } = result;
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Your Result</h3>
        <Badge level={risk.level} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500">PHQ-9</p>
          <p className="text-xl font-bold text-slate-800">{phq9}/27</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500">GAD-7</p>
          <p className="text-xl font-bold text-slate-800">{gad7}/21</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500">CRI</p>
          <p className="text-xl font-bold text-slate-800">{cri.cri}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-700">Why this result?</p>
        <ul className="mt-2 list-disc list-inside text-sm text-slate-600 space-y-1">
          {risk.reasons.length === 0 && <li>No significant risk indicators detected.</li>}
          {risk.reasons.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </Card>
  );
}
