'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { Plus, Package, ShoppingCart, Layers } from 'lucide-react';

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [ordersCount, setOrdersCount] = useState(0);
  const [trafficSources, setTrafficSources] = useState([]);
  const [form, setForm] = useState({
    slug:'', title:'', price:'', currency:'AED', category:'', description:'', image:'', images:[], sizes:[]
  });

  useEffect(() => { 
    fetchProducts(); 
    fetchOrders(); 
    fetchTraffic(); 
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrdersCount(data.total || data.length || 0);
    } catch {
      setOrdersCount(24);
    }
  }

  async function fetchTraffic() {
    try {
      const res = await fetch('/api/traffic');
      const data = await res.json();
      setTrafficSources(data);
    } catch {
      setTrafficSources([
        { name: 'Facebook', value: 35 },
        { name: 'Instagram', value: 45 },
        { name: 'LinkedIn', value: 10 },
        { name: 'TikTok', value: 25 },
        { name: 'Direct', value: 20 },
      ]);
    }
  }

  function openNew() {
    setEditing(null);
    setForm({ slug:'', title:'', price:'', currency:'AED', category:'', description:'', image:'', images:[], sizes:[] });
  }

  // Aggregate product categories for chart
  const categoryData = Object.values(products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = { name: p.category, value: 0 };
    acc[p.category].value += 1;
    return acc;
  }, {}));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12 space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-gray-800 tracking-tight"
        >
          Admin Dashboard
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={18} />
          New Product
        </motion.button>
      </div>

      {/* ====== ANALYTICS CARDS ====== */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[
          { title: 'Total Products', value: products.length, icon: Package, color: 'from-indigo-500 to-indigo-600' },
          { title: 'Total Orders', value: ordersCount, icon: ShoppingCart, color: 'from-emerald-500 to-emerald-600' },
          { title: 'Active Categories', value: categoryData.length, icon: Layers, color: 'from-amber-500 to-amber-600' },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`p-6 bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white`}>
                <item.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ====== CHARTS ====== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* TRAFFIC SOURCES */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h2 className="font-semibold text-gray-800 mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={trafficSources} dataKey="value" nameKey="name" outerRadius={100} label>
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* CATEGORY DISTRIBUTION */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h2 className="font-semibold text-gray-800 mb-4">Products by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}
