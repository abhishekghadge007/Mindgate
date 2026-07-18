import { useState } from 'react';
import Card from './Card';
import ResultCard from './ResultCard';
import { classifyRisk } from '../logic/riskEngine';
import { computeCRI } from '../logic/cri';

import { db, auth } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const PHQ9 = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling/staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself',
  'Trouble concentrating',
  'Moving/speaking slowly or being fidgety',
  'Thoughts that you would be better off dead or hurting yourself',
];

const GAD7 = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless it’s hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen',
];

function Question({ text, value, onChange }) {
  return (
    <div className="py-3 border-b border-slate-100">
      <p className="text-sm text-slate-700 mb-2">{text}</p>
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => onChange(Number(n))} // ✅ ensure number
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              value === n
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AssessmentForm() {
  const [phq, setPhq] = useState(Array(9).fill(0));
  const [gad, setGad] = useState(Array(7).fill(0));
  const [sleep, setSleep] = useState(3);
  const [stress, setStress] = useState(3);
  const [isolation, setIsolation] = useState('low');
  const [result, setResult] = useState(null);

  const setPhqAt = (i, v) => setPhq(phq.map((x, idx) => (idx === i ? v : x)));
  const setGadAt = (i, v) => setGad(gad.map((x, idx) => (idx === i ? v : x)));

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ Correct scoring
    const phq9 = phq.reduce((a, b) => a + Number(b), 0);
    const gad7 = gad.reduce((a, b) => a + Number(b), 0);

    console.log("PHQ-9:", phq9);
    console.log("GAD-7:", gad7);

    const q9 = phq[8];

    // ✅ Risk calculation
    const risk = classifyRisk({ phq9, gad7, q9, sleep, stress, isolation });

    // ✅ CRI
    const { cri } = computeCRI({ phq9, gad7, trend: 'same' });

    const userId = auth.currentUser.uid;

    // 🔥 SAVE TO FIRESTORE (IMPORTANT)
    await setDoc(doc(db, "assessments", userId), {
      phq9,
      gad7,
      q9,
      sleep,
      stress,
      isolation,
      risk,
      cri,
      createdAt: new Date().toISOString(),
    });

    console.log("Saved to Firestore ✅");

    setResult({ phq9, gad7, q9, sleep, stress, isolation, risk, cri });
  }

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-slate-800">PHQ-9 — Depression</h2>
          <p className="text-xs text-slate-500 mb-2">
            0 = Not at all · 1 = Several days · 2 = More than half · 3 = Nearly every day
          </p>

          {PHQ9.map((q, i) => (
            <Question key={i} text={`${i + 1}. ${q}`} value={phq[i]} onChange={(v) => setPhqAt(i, v)} />
          ))}

          <h2 className="mt-6 text-lg font-semibold text-slate-800">GAD-7 — Anxiety</h2>

          {GAD7.map((q, i) => (
            <Question key={i} text={`${i + 1}. ${q}`} value={gad[i]} onChange={(v) => setGadAt(i, v)} />
          ))}

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Sleep quality: {sleep}</label>
              <input type="range" min="1" max="5" value={sleep} onChange={(e) => setSleep(+e.target.value)} className="w-full" />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">Academic stress: {stress}</label>
              <input type="range" min="1" max="5" value={stress} onChange={(e) => setStress(+e.target.value)} className="w-full" />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">Social isolation</label>
              <select
                value={isolation}
                onChange={(e) => setIsolation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button className="mt-6 px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">
            Submit Assessment
          </button>
        </form>
      </Card>

      {result && <ResultCard result={result} />}
    </div>
  );
} 