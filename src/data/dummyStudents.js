const trends = ['improving', 'same', 'worsening'];
const risks = ['RED', 'YELLOW', 'GREEN'];

const students = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  phq9: Math.floor(Math.random() * 28),
  gad7: Math.floor(Math.random() * 22),
  risk: risks[Math.floor(Math.random() * 3)],
  trend: trends[Math.floor(Math.random() * 3)],
}));

export default students;
