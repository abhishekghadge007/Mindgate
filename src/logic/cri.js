// Composite Risk Index
const SENT = { improving: 0.2, same: 0.5, worsening: 1.0 };
export function computeCRI({ phq9, gad7, trend = 'same' }) {
  const s = SENT[trend] ?? 0.5;
  const cri = 0.45 * (phq9 / 27) + 0.35 * (gad7 / 21) + 0.20 * s;
  let band = 'GREEN';
  if (cri >= 0.6) band = 'RED';
  else if (cri >= 0.3) band = 'YELLOW';
  return { cri: Number(cri.toFixed(3)), band };
}
