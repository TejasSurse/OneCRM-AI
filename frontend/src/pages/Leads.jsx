import React, { useState, useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    interestedIn: "",
    priority: "Medium",
    expectedValue: "",
    notes: "",
  });

  // Derived stats
  const stats = useMemo(() => {
    const activeLeads = leads.length;
    const highPriority = leads.filter((l) => l.priority === "High").length;
    const totalValue = leads.reduce(
      (sum, l) => sum + Number(l.expectedValue || 0),
      0
    );
    const conversionRate =
      activeLeads > 0 ? (highPriority / activeLeads) * 100 : 0;
    return { activeLeads, highPriority, totalValue, conversionRate };
  }, [leads]);

  const handleAddLead = (e) => {
    e.preventDefault();
    setLeads([{ ...formData, id: Date.now() }, ...leads]);
    setShowModal(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      source: "",
      interestedIn: "",
      priority: "Medium",
      expectedValue: "",
      notes: "",
    });
  };

  const handleDelete = (id) => setLeads(leads.filter((lead) => lead.id !== id));

  return (
    <div className="p-8 bg-white min-h-screen text-slate-900 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold text-primary-800 tracking-tight">
            Leads Management
          </h1>
          <p className="text-slate-500 mt-1">
            Track and manage your sales leads efficiently
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-card hover:bg-primary-700 hover:shadow-focus transition-all"
        >
          <Plus size={20} /> Add New Lead
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3 mb-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search leads by name, email, or company..."
          className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:ring-2 focus:ring-primary-400 focus:outline-none"
        />
        <select className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none text-slate-700">
          <option>All Stages</option>
        </select>
        <select className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none text-slate-700">
          <option>All Priority</option>
        </select>
        <button className="border border-slate-300 rounded-lg px-3 py-2 hover:bg-slate-100 transition">
          🔍
        </button>
      </div>

      {/* Leads Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-xl shadow-card p-6 hover:shadow-focus transition-all"
      >
        {leads.length === 0 ? (
          <p className="text-center text-slate-500 py-10">
            No leads found matching your criteria.
          </p>
        ) : (
          <div className="overflow-x-auto perspective-1000">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-600 border-b border-slate-200">
                  <th className="py-3">Lead Details</th>
                  <th>Company & Source</th>
                  <th>Status & Priority</th>
                  <th>Value & Interest</th>
                  <th>Last Contact</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {leads.map((lead) => (
                    <motion.tr
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border-b border-slate-100 hover:bg-primary-50 transition"
                    >
                      <td className="py-3 font-medium">{lead.fullName}</td>
                      <td>
                        {lead.company || "—"}
                        <br />
                        <span className="text-sm text-slate-500">
                          {lead.source || "—"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            lead.priority === "High"
                              ? "bg-red-100 text-red-600"
                              : lead.priority === "Medium"
                              ? "bg-primary-100 text-primary-700"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td>
                        ₹{lead.expectedValue || 0}
                        <br />
                        <span className="text-sm text-slate-500">
                          {lead.interestedIn || "—"}
                        </span>
                      </td>
                      <td className="text-slate-500">N/A</td>
                      <td className="text-right">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="border border-slate-200 rounded-xl p-4 text-center shadow-sm bg-gradient-to-b from-white to-slate-50">
          <p className="text-3xl font-bold text-slate-800">{stats.activeLeads}</p>
          <p className="text-slate-600">Active Leads</p>
        </div>
        <div className="border border-slate-200 rounded-xl p-4 text-center shadow-sm bg-gradient-to-b from-white to-slate-50">
          <p className="text-3xl font-bold text-green-600">{stats.highPriority}</p>
          <p className="text-slate-600">High Priority</p>
        </div>
        <div className="border border-slate-200 rounded-xl p-4 text-center shadow-sm bg-gradient-to-b from-white to-slate-50">
          <p className="text-3xl font-bold text-slate-800">
            ₹{stats.totalValue.toLocaleString()}
          </p>
          <p className="text-slate-600">Total Value</p>
        </div>
        <div className="border border-slate-200 rounded-xl p-4 text-center shadow-sm bg-gradient-to-b from-white to-slate-50">
          <p className="text-3xl font-bold text-primary-700">
            {stats.conversionRate.toFixed(0)}%
          </p>
          <p className="text-slate-600">Conversion Rate</p>
        </div>
      </div>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 shadow-card w-[600px] border border-slate-100"
            >
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                Add New Lead
              </h2>
              <form onSubmit={handleAddLead} className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Phone *
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Source */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Source
                  </label>
                  <select
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                  >
                    <option value="">Select Source</option>
                    <option>LinkedIn</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>YouTube</option>
                    <option>Twitter</option>
                    <option>WhatsApp</option>
                    <option>Website</option>
                  </select>
                </div>

                {/* Interested In */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Interested In
                  </label>
                  <select
                    value={formData.interestedIn}
                    onChange={(e) =>
                      setFormData({ ...formData, interestedIn: e.target.value })
                    }
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                  >
                    <option value="">Select Option</option>
                    <option>Basic Package</option>
                    <option>Premium Package</option>
                    <option>Enterprise Solution</option>
                    <option>Custom Solution</option>
                    <option>Consultation</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                {/* Expected Value */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Expected Value (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.expectedValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expectedValue: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                    placeholder="5000"
                  />
                </div>

                {/* Notes */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1 text-slate-700">
                    Notes
                  </label>
                  <textarea
                    rows="3"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                    placeholder="Any additional notes about this lead..."
                  />
                </div>

                {/* Buttons */}
                <div className="col-span-2 flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-card"
                  >
                    Add Lead
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
