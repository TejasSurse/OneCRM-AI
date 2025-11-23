import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  DollarSign,
  TrendingUp,
  Mail,
  MessageSquare,
  Plus,
  Send,
} from "lucide-react";
import axios from "axios";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // All dynamic dashboard data
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [pns, setPns] = useState([]);

  const [revenueGraph, setRevenueGraph] = useState([]);
  const [leadsGraph, setLeadsGraph] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);

  // Fetch all data
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [userRes, custRes, pnsRes] = await Promise.all([
        axios.get("http://localhost:3000/user/getAllUsers"),
        axios.get("http://localhost:3000/user/getAllCustomers"),
        axios.get("http://localhost:3000/pns/getAllPNS"),
      ]);

      setUsers(userRes.data.data || []);
      setCustomers(custRes.data.data || []);
      setPns(pnsRes.data.data || []);

      // Generate 6 months dynamic revenue graph
      const rev = custRes.data.data.map((c, i) => ({
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i % 6],
        revenue: c.totalRevenue || 0,
      }));
      setRevenueGraph(rev);

      // Leads count per month (fake grouping)
      const leadsPerMonth = userRes.data.data.map((u, i) => ({
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i % 6],
        leads: i + 5,
      }));
      setLeadsGraph(leadsPerMonth);

      // Recent 5 leads
      setRecentLeads(
        userRes.data.data
          .slice(0, 5)
          .map((u) => ({
            name: u.name,
            email: u.email,
            status: u.stage === 2 ? "Customer" : "Lead",
            interested:
              (u.products?.map((p) => p.name).join(", ") ||
                u.services?.map((s) => s.name).join(", ")) || "—",
            lastContact: new Date(u.createdAt).toLocaleDateString(),
          }))
      );

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ================================
  // TOP STATS
  // ================================
  const totalLeads = users.filter((u) => u.stage === 1).length;
  const totalCustomers = users.filter((u) => u.stage === 2).length;
  const failedLeads = users.filter((u) => u.stage === 0).length;

  const totalRevenue = customers.reduce(
    (sum, c) => sum + (c.totalRevenue || 0),
    0
  );

  const stats = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: <Users />,
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: <Target />,
    },
    {
      title: "Total Revenue",
      value: "₹" + totalRevenue.toLocaleString(),
      icon: <DollarSign />,
    },
    {
      title: "Failed Leads",
      value: failedLeads,
      icon: <MessageSquare />,
    },
  ];

  if (loading)
    return (
      <div className="p-8 text-center text-xl font-bold text-gray-600">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-white p-8 text-slate-900">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">
          Welcome back 👋 — Here’s what’s happening in your CRM today.
        </p>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="flex items-center justify-between p-6 rounded-2xl border bg-white shadow-lg"
          >
            <div>
              <h3 className="text-sm text-slate-500">{stat.title}</h3>
              <p className="text-2xl font-semibold text-slate-900 mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-blue-100 text-blue-600`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Revenue Growth</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leads Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Monthly Leads</h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={leadsGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#2563eb" barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT LEADS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          Recent Leads & Customers
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-slate-600">
              <th className="py-3">Contact</th>
              <th>Email</th>
              <th>Status</th>
              <th>Interested In</th>
              <th>Last Contact</th>
            </tr>
          </thead>

          <tbody>
            {recentLeads.map((lead, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="py-3">{lead.name}</td>
                <td>{lead.email}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      lead.status === "Lead"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td>{lead.interested}</td>
                <td>{lead.lastContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
