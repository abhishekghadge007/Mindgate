// Risk classification engine
export function classifyRisk({ phq9, gad7, q9, sleep, stress, isolation }) {
  const reasons = [];
  let level = 'GREEN';

  if (q9 >= 1) {
    reasons.push('Suicidal ideation reported (PHQ-9 Q9 ≥ 1)');
    level = 'RED';
  }

  let weight = 0;
  if (phq9 > 15) { reasons.push('High depression score (PHQ-9 > 15)'); weight += 3; }
  else if (phq9 > 9) { reasons.push('Moderate depression (PHQ-9 10–15)'); weight += 2; }

  if (gad7 > 15) { reasons.push('High anxiety score (GAD-7 > 15)'); weight += 3; }
  else if (gad7 > 9) { reasons.push('Moderate anxiety (GAD-7 10–15)'); weight += 2; }

  if (sleep <= 2) { reasons.push('Poor sleep quality'); weight += 1; }
  if (stress >= 4) { reasons.push('High academic stress'); weight += 1; }
  if (isolation === 'high') { reasons.push('High social isolation'); weight += 1; }

  if (level !== 'RED') {
    if (weight >= 5) level = 'RED';
    else if (weight >= 2) level = 'YELLOW';
    else level = 'GREEN';
  }
  return { level, reasons, weight };
}
