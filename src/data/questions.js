// PHQ-9 — Depression screening (9 questions)
export const PHQ9 = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling/staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things",
  "Moving/speaking so slowly others noticed — or being fidgety/restless",
  "Thoughts that you would be better off dead, or hurting yourself",
];

// GAD-7 — Anxiety screening (7 questions)
export const GAD7 = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it’s hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

export const SCALE_OPTIONS = [
  { value: 0, label: "0 — Not at all" },
  { value: 1, label: "1 — Several days" },
  { value: 2, label: "2 — More than half the days" },
  { value: 3, label: "3 — Nearly every day" },
];

export const ISOLATION_OPTIONS = [
  { value: "low",    label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high",   label: "High" },
];
