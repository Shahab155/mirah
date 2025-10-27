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

export default function CollectionsOverview() {
  const [collections] = useState(mockCollections);

  const pieData = {
    labels: ['Active', 'Draft'],
    datasets: [
      {
        data: [3, 1],
        backgroundColor: ['#c6b197', '#f3f4f6'],
        borderColor: '#fff',
        borderWidth: 2,
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
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top', 
        labels: { color: '#4a4a4a', font: { size: 14, weight: '500' } } 
      },
      tooltip: { 
        backgroundColor: '#fff', 
        titleColor: '#4a4a4a', 
        bodyColor: '#4a4a4a', 
        borderColor: '#c6b197', 
        borderWidth: 1 
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        ticks: { color: '#4a4a4a', font: { size: 12 } }, 
        grid: { color: '#e5e7eb', borderDash: [3, 3] } 
      },
      x: { 
        ticks: { color: '#4a4a4a', font: { size: 12 } }, 
        grid: { color: '#e5e7eb', borderDash: [3, 3] } 
      },
    },
  };

  return (
    <div className="space-y-10">
      {/* Collections Table */}
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-[#c6b197] mb-6">Collection Overview</h2>
        <div className="overflow-x-auto rounded-xl shadow-inner">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Name</th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Items</th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Sales</th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {collections.map((collection) => (
                <tr 
                  key={collection.id} 
                  className="hover:bg-[#fef9f4] transition-colors duration-200 cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{collection.name}</td>
                  <td className="px-6 py-4">{collection.items}</td>
                  <td className="px-6 py-4">{collection.sales}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        collection.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {collection.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-[#c6b197] mb-6">Collection Status</h3>
          <div className="h-72">
            <Pie data={pieData} options={options} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-[#c6b197] mb-6">Sales Trends</h3>
          <div className="h-72">
            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
