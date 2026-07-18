import { computeCRI } from './cri';

const RANK = { RED: 3, YELLOW: 2, GREEN: 1 };
const TREND = { worsening: 3, same: 2, improving: 1 };

// ✅ helper to calculate risk
function getRisk(phq9, gad7) {
  if (phq9 >= 20 || gad7 >= 15) return "RED";
  if (phq9 >= 10 || gad7 >= 8) return "YELLOW";
  return "GREEN";
}

export function allocate(students, slots = 10) {
  const enriched = students.map((s) => {
    const { cri, band } = computeCRI(s);

    // ✅ ADD THIS
    const risk = getRisk(s.phq9, s.gad7);

    return { ...s, cri, band, risk };
  });

  enriched.sort((a, b) => {
    if (RANK[b.risk] !== RANK[a.risk]) return RANK[b.risk] - RANK[a.risk];
    if (TREND[b.trend] !== TREND[a.trend]) return TREND[b.trend] - TREND[a.trend];
    return b.phq9 - a.phq9;
  });

  return enriched.map((s, i) => ({
    ...s,
    rank: i + 1,
    allocated: i < slots,
    reason: `Risk ${s.risk}, trend ${s.trend}, PHQ-9 ${s.phq9}`,
  }));
}