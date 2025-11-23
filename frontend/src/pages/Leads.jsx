import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Eye, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewData, setViewData] = useState(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    email2: "",
    phone: "",
    phone2: "",
    company: "",
    source: "",
    description: "",
    stage: 1,
    status: "active",
    remarks: [],
  });

  // ======================
  // FETCH USERS
  // ======================
  const refreshLeads = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/getAllUsers");
      const users = res.data.data || [];

      setAllUsers(users); // store all
      const leadsOnly = users.filter((u) => u.stage === 1);
      setLeads(leadsOnly);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshLeads();
  }, []);

  const cleanNumber = (v) =>
    v ? Number(String(v).replace(/\D/g, "")) : undefined;

  // ======================
  // SEARCH FILTER
  // ======================
  const filteredLeads = leads.filter((lead) => {
    const s = search.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(s) ||
      lead.email?.toLowerCase().includes(s) ||
      lead.phone?.toString().includes(s) ||
      lead.company?.toLowerCase().includes(s) ||
      lead.source?.toLowerCase().includes(s)
    );
  });

  // ======================
  // ADD / EDIT SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      phone: cleanNumber(formData.phone),
      phone2: cleanNumber(formData.phone2) || undefined,
    };

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/user/updateUser/${editingId}`,
          payload
        );
      } else {
        await axios.post("http://localhost:3000/user/addUser", payload);
      }

      setShowModal(false);
      resetForm();
      refreshLeads();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error occurred!");
    }
  };

  // ======================
  // EDIT LEAD
  // ======================
  const handleEdit = (lead) => {
    setFormData({
      name: lead.name || "",
      email: lead.email || "",
      email2: lead.email2 || "",
      phone: lead.phone?.toString() || "",
      phone2: lead.phone2?.toString() || "",
      company: lead.company || "",
      source: lead.source || "",
      description: lead.description || "",
      stage: lead.stage ?? 1,
      status: lead.status ?? "active",
      remarks: lead.remarks || [],
    });

    setEditingId(lead._id);
    setIsEditing(true);
    setShowModal(true);
  };

  // ======================
  // VIEW LEAD
  // ======================
  const handleView = (lead) => {
    setViewData(lead);
  };

  // ======================
  // DELETE LEAD
  // ======================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete kar du bhai?")) return;

    try {
      await axios.delete(`http://localhost:3000/user/deleteUser/${id}`);
      refreshLeads();
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // RESET FORM
  // ======================
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      email2: "",
      phone: "",
      phone2: "",
      company: "",
      source: "",
      description: "",
      stage: 1,
      status: "active",
      remarks: [],
    });

    setIsEditing(false);
    setEditingId(null);
  };

  // ======================
  // REMARKS
  // ======================
  const addRemark = () => {
    setFormData({
      ...formData,
      remarks: [...formData.remarks, { text: "", timestamp: new Date() }],
    });
  };

  const updateRemark = (index, value) => {
    const updated = [...formData.remarks];
    updated[index].text = value;
    setFormData({ ...formData, remarks: updated });
  };

  const deleteRemark = (index) => {
    const updated = formData.remarks.filter((_, i) => i !== index);
    setFormData({ ...formData, remarks: updated });
  };

  // =====================================================
  // ================== UI STARTS HERE ===================
  // =====================================================

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leads Management</h1>
          <p className="text-gray-600">Manage all your CRM leads with ease.</p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} /> Add New Lead
        </button>
      </div>

      {/* =====================
          STATS CARDS
      ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.03 }} className="p-6 bg-blue-200 text-black rounded-xl shadow-xl">
          <p className="text-4xl font-bold">{leads.length}</p>
          <p className="opacity-80">Total Leads</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="p-6 bg-green-200 text-black rounded-xl shadow-xl">
          <p className="text-4xl font-bold">
            {leads.filter((l) => l.status === "active").length}
          </p>
          <p className="opacity-80">Active Leads</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="p-6 bg-red-200 text-black rounded-xl shadow-xl">
          <p className="text-4xl font-bold">
            {leads.filter((l) => l.status === "inactive").length}
          </p>
          <p className="opacity-80">Inactive Leads</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="p-6 bg-yellow-200 text-black rounded-xl shadow-xl">
          <p className="text-4xl font-bold">
            {allUsers.filter((u) => u.stage === 0).length}
          </p>
          <p className="opacity-80">Failed Leads</p>
        </motion.div>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-3 mb-4">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, phone, email, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md border overflow-hidden">
        {filteredLeads.length === 0 ? (
          <p className="text-center py-12 text-gray-500 text-lg">
            No results found...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Contact</th>
                  <th className="px-6 py-4 text-left">Company</th>
                  <th className="px-6 py-4 text-left">Source</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <motion.tr
                    key={lead._id}
                    layout
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">{lead.name}</td>

                    <td className="px-6 py-4">
                      <p>{lead.email}</p>
                      <p className="text-sm text-gray-600">{lead.phone}</p>
                    </td>

                    <td className="px-6 py-4">{lead.company || "—"}</td>
                    <td className="px-6 py-4">{lead.source || "—"}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lead.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleView(lead)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(lead)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================
          VIEW MODAL
      ========================= */}
      <AnimatePresence>
        {viewData && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewData(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Eye size={24} className="text-blue-600" />
                Lead Details
              </h2>

              <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
                <p><strong>Name:</strong> {viewData.name}</p>
                <p><strong>Email:</strong> {viewData.email}</p>
                <p><strong>Email 2:</strong> {viewData.email2 || "—"}</p>
                <p><strong>Phone:</strong> {viewData.phone}</p>
                <p><strong>Phone 2:</strong> {viewData.phone2 || "—"}</p>
                <p><strong>Company:</strong> {viewData.company || "—"}</p>
                <p><strong>Source:</strong> {viewData.source || "—"}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      viewData.status === "active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {viewData.status}
                  </span>
                </p>

                <p>
                  <strong>Stage:</strong>{" "}
                  {viewData.stage === 1
                    ? "Lead"
                    : viewData.stage === 2
                    ? "Customer"
                    : "Failed"}
                </p>
              </div>

              {viewData.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-1">Description</h3>
                  <p className="bg-gray-50 p-3 rounded-lg border">
                    {viewData.description}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-3">Remarks</h3>

                {viewData.remarks?.length === 0 && (
                  <p className="text-gray-500">No remarks available.</p>
                )}

                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {viewData.remarks?.map((r, i) => (
                    <motion.div
                      key={i}
                      className="p-3 bg-gray-50 border rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <p>{r.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(r.timestamp).toLocaleString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-right mt-6">
                <button
                  onClick={() => setViewData(null)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "Edit Lead" : "Add New Lead"}
              </h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="email"
                  placeholder="Email 2"
                  value={formData.email2}
                  onChange={(e) =>
                    setFormData({ ...formData, email2: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="text"
                  placeholder="Phone *"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="text"
                  placeholder="Phone 2"
                  value={formData.phone2}
                  onChange={(e) =>
                    setFormData({ ...formData, phone2: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="text"
                  placeholder="Source"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2"
                />

                <select
                  value={formData.stage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stage: Number(e.target.value),
                    })
                  }
                  className="border rounded-lg px-4 py-2"
                >
                  <option value={1}>Lead</option>
                  <option value={2}>Customer</option>
                  <option value={0}>Failed</option>
                </select>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <div className="col-span-2">
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                {/* REMARKS */}
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">Remarks</h3>

                    <button
                      type="button"
                      onClick={addRemark}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Plus size={16} /> Add Remark
                    </button>
                  </div>

                  {formData.remarks.length === 0 && (
                    <p className="text-gray-500 text-sm mb-2">
                      No remarks added yet.
                    </p>
                  )}

                  {formData.remarks.map((r, index) => (
                    <div key={index} className="flex items-center gap-3 mb-2">
                      <input
                        type="text"
                        value={r.text}
                        placeholder={`Remark ${index + 1}`}
                        onChange={(e) => updateRemark(index, e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                      />

                      <button
                        type="button"
                        onClick={() => deleteRemark(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {isEditing ? "Update" : "Add"} Lead
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
