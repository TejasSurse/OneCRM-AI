import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Upload, Download, Gift } from "lucide-react";

export default function Customers() {
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    industry: "",
    product: "",
    contractValue: "",
    startDate: "",
    status: "Active",
    notes: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    setCustomers([...customers, form]);
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      industry: "",
      product: "",
      contractValue: "",
      startDate: "",
      status: "Active",
      notes: "",
    });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 transition-all">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-primary-800">
            Customer Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage relationships and track customer success
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow-card transition-all"
          >
            <UserPlus size={18} /> Add Customer
          </button>
          <button className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg border border-primary-100 transition-all">
            <Gift size={18} /> Send Bulk Offer
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg transition">
            <Upload size={18} /> Import
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg transition">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search customers by name, email, or company..."
          className="flex-1 min-w-[250px] border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <select className="border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <select className="border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none">
          <option>All Plans</option>
          <option>Basic</option>
          <option>Premium</option>
          <option>Enterprise</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-primary-50 border border-slate-200 p-5 rounded-2xl shadow-card">
          <p className="text-sm text-slate-600">Active Customers</p>
          <h2 className="text-2xl font-semibold text-slate-900 mt-1">
            {customers.length}
          </h2>
        </div>
        <div className="bg-blue-50 border border-slate-200 p-5 rounded-2xl shadow-card">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <h2 className="text-2xl font-semibold text-slate-900 mt-1">
            ₹{customers.length * 12000}
          </h2>
        </div>
        <div className="bg-amber-50 border border-slate-200 p-5 rounded-2xl shadow-card">
          <p className="text-sm text-slate-600">Avg Satisfaction</p>
          <h2 className="text-2xl font-semibold text-slate-900 mt-1">
            {customers.length ? "92%" : "N/A"}
          </h2>
        </div>
        <div className="bg-indigo-50 border border-slate-200 p-5 rounded-2xl shadow-card">
          <p className="text-sm text-slate-600">Enterprise Clients</p>
          <h2 className="text-2xl font-semibold text-slate-900 mt-1">
            {customers.filter((c) => c.product === "Enterprise Solution").length}
          </h2>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-card overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
            <tr>
              <th className="py-3 px-4">Customer Details</th>
              <th className="px-4">Subscription & Status</th>
              <th className="px-4">Company</th>
              <th className="px-4">Product</th>
              <th className="px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-500">
                  No customers found matching your criteria.
                </td>
              </tr>
            ) : (
              customers.map((c, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-100 hover:bg-primary-50/40 transition"
                >
                  <td className="py-3 px-4">{c.name}</td>
                  <td className="px-4">{c.status}</td>
                  <td className="px-4">{c.company}</td>
                  <td className="px-4">{c.product}</td>
                  <td className="px-4 text-right">
                    <button className="text-primary-600 hover:underline text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-focus p-8 w-[90%] max-w-2xl"
            >
              <h2 className="text-2xl font-semibold text-primary-800 mb-2">
                Add New Customer
              </h2>
              <p className="text-slate-500 mb-6">
                Enter the customer details to add them to your CRM system.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Address */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St, City, State, ZIP"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Industry
                  </label>
                  <select
                    value={form.industry}
                    onChange={(e) =>
                      setForm({ ...form, industry: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="">Select Industry</option>
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>Retail</option>
                    <option>Manufacturing</option>
                    <option>Real Estate</option>
                    <option>Consulting</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Product */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Purchased Product/Service
                  </label>
                  <select
                    value={form.product}
                    onChange={(e) =>
                      setForm({ ...form, product: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="">Select Product</option>
                    <option>Basic Package</option>
                    <option>Premium Plan</option>
                    <option>Enterprise Solution</option>
                    <option>Custom Solution</option>
                    <option>Consultation Services</option>
                  </select>
                </div>

                {/* Contract Value */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Contract Value (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={form.contractValue}
                    onChange={(e) =>
                      setForm({ ...form, contractValue: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Any additional notes about this customer..."
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-card"
                >
                  Add Customer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
