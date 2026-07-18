import Card from './Card';
import { allocate } from '../logic/allocation';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        // ✅ fetch users
        const usersSnap = await getDocs(collection(db, 'users'));
        const users = usersSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // ✅ fetch assessments
        const assessSnap = await getDocs(collection(db, 'assessments'));
        const assessments = {};
        assessSnap.docs.forEach(doc => {
          assessments[doc.id] = doc.data();
        });

        // ✅ merge users + assessments
        const merged = users
          .filter(u => u.role === 'student')
          .map(u => {
            const a = assessments[u.id];

            return {
              ...u,
              phq9: a?.phq9 ?? 0,
              gad7: a?.gad7 ?? 0,
              trend: 'same', // you can improve later
            };
          });

        setStudents(merged);

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }

    fetchStudents();
  }, []);

  const ranked = allocate(students, 10);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Prioritized Student Queue
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-2 pr-4">Rank</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">PHQ-9</th>
              <th className="py-2 pr-4">GAD-7</th>
              <th className="py-2 pr-4">Trend</th>
              <th className="py-2 pr-4">Risk</th>
              <th className="py-2 pr-4">CRI</th>
              <th className="py-2 pr-4">Slot</th>
              <th className="py-2 pr-4">Reason</th>
            </tr>
          </thead>

          <tbody>
            {ranked.map((s) => (
              <tr key={s.id} className="border-b border-slate-100">
                <td className="py-2 pr-4 font-semibold text-slate-700">
                  #{s.rank}
                </td>

                <td className="py-2 pr-4">{s.name}</td>

                <td className="py-2 pr-4">{s.phq9}</td>
                <td className="py-2 pr-4">{s.gad7}</td>

                <td className="py-2 pr-4 capitalize">{s.trend}</td>

                {/* ✅ COLORED RISK BOX */}
                <td className="py-2 pr-4">
                  <div
                    className={`w-4 h-4 rounded ${
                      s.risk === "RED"
                        ? "bg-red-500"
                        : s.risk === "YELLOW"
                        ? "bg-yellow-400"
                        : s.risk === "GREEN"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                </td>

                <td className="py-2 pr-4">{s.cri}</td>

                <td className="py-2 pr-4">
                  {s.allocated ? (
                    <span className="text-emerald-700 font-medium">
                      Allocated
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      Waitlist
                    </span>
                  )}
                </td>

                <td className="py-2 pr-4 text-slate-500">
                  {s.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}