import React from 'react'


import { motion } from "framer-motion";
import { Users, Target, DollarSign, TrendingUp, Mail, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Leads", value: 124, icon: <Users />, color: "primary-600" },
    { title: "Conversion Rate", value: "36%", icon: <Target />, color: "primary-600" },
    { title: "Monthly Revenue", value: "₹42,300", icon: <DollarSign />, color: "primary-600" },
    { title: "Growth Rate", value: "12%", icon: <TrendingUp />, color: "primary-600" },
    { title: "Active Campaigns", value: 8, icon: <Mail />, color: "primary-600" },
    { title: "Support Tickets", value: 3, icon: <MessageSquare />, color: "primary-600" },
  ];

  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 transition-all duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold text-primary-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back 👋 — Here’s what’s happening in your CRM today.</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, rotateX: 2, rotateY: 2 }}
            className="flex items-center justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow-card hover:shadow-focus transition-all duration-300"
          >
            <div>
              <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{stat.value}</p>
            </div>
            <div
              className={`p-3 rounded-xl bg-₹{stat.color}/10 text-₹{stat.color} shadow-inner`}
            >
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Leads Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-white border border-slate-200 rounded-2xl shadow-card p-6 hover:shadow-focus transition-all"
      >
        <h2 className="text-xl font-semibold text-primary-800 mb-4">
          Recent Leads & Customers
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-slate-600 border-b border-slate-200">
                <th className="py-3">Contact</th>
                <th>Email</th>
                <th>Status</th>
                <th>Interested In</th>
                <th>Last Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-primary-50 transition">
                <td className="py-3">John Doe</td>
                <td>john@example.com</td>
                <td>
                  <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 font-medium">
                    Lead
                  </span>
                </td>
                <td>Web Design</td>
                <td>2 days ago</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-primary-50 transition">
                <td>Sarah Parker</td>
                <td>sarah@company.com</td>
                <td>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                    Customer
                  </span>
                </td>
                <td>SEO Services</td>
                <td>5 days ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
