'use client';
import { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const mockCollections = [
  { id: 1, name: 'Spring 2025', items: 45, sales: 120, status: 'active' },
  { id: 2, name: 'Fall 2024', items: 32, sales: 89, status: 'active' },
  { id: 3, name: 'Bridal 2025', items: 28, sales: 156, status: 'active' },
  { id: 4, name: 'Eid 2025', items: 52, sales: 203, status: 'draft' },
];

export default function CollectionsPage() {
  const [collections] = useState(mockCollections);

  const pieData = {
    labels: ['Active', 'Draft'],
    datasets: [
      {
        data: [3, 1],
        backgroundColor: ['#c6b197', '#e5e7eb'],
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 5,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(198, 177, 151, 0.9)',
        borderColor: '#c6b197',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#4a4a4a', font: { size: 14 } } },
      tooltip: { backgroundColor: '#fff', titleColor: '#4a4a4a', bodyColor: '#4a4a4a', borderColor: '#c6b197', borderWidth: 1 },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#4a4a4a', font: { size: 12 } }, grid: { color: '#e5e7eb' } },
      x: { ticks: { color: '#4a4a4a', font: { size: 12 } }, grid: { color: '#e5e7eb' } },
    },
  };

  return (
    <div className="p-8 bg-[#f7f5f3] min-h-screen">
      <h1 className="text-4xl font-bold text-[#c6b197] mb-8 text-center">Collections</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Collection Table */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-semibold text-[#c6b197] mb-6">Collection Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-700 font-medium">Name</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-medium">Items</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-medium">Sales</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50 transition-all duration-200">
                    <td className="py-4 px-6 font-medium text-gray-900">{c.name}</td>
                    <td className="py-4 px-6">{c.items}</td>
                    <td className="py-4 px-6">{c.sales}</td>
                    <td>
                      <span
                        className={`px-4 py-2 rounded-full text-sm ${
                          c.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-10">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-semibold text-[#c6b197] mb-6">Collection Status</h3>
            <div className="h-72">
              <Pie data={pieData} options={options} />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-semibold text-[#c6b197] mb-6">Sales Trends</h3>
            <div className="h-72">
              <Bar data={barData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
