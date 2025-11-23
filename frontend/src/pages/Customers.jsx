import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Upload, Download, Gift, Eye, Trash2 } from "lucide-react";
import axios from "axios";

export default function Customers() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [pns, setPns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    description: "",
    products: [],
    services: [],
    contractValue: "",
    startDate: "",
    status: "active",
  });

  // Fetch All Customers + All PNS
  useEffect(() => {
    fetchEverything();
  }, []);

  const fetchEverything = async () => {
    setLoading(true);
    try {
      const [custRes, pnsRes] = await Promise.all([
        axios.get("http://localhost:3000/user/getAllCustomers"),
        axios.get("http://localhost:3000/pns/getAllPNS"),
      ]);

      setCustomers(custRes.data.data || []);
      setPns(pnsRes.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching customers or products/services");
    }
    setLoading(false);
  };

  // ======================
  //   Add / Update Customer
  // ======================
  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Name + Email required");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      description: form.description,
      stage: 2,
      status: form.status,
      products: form.products,
      services: form.services,
      contractValue: Number(form.contractValue) || 0,
      startDate: form.startDate || "",
    };

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/user/updateUser/${editId}`,
          payload
        );
      } else {
        await axios.post("http://localhost:3000/user/addUser", payload);
      }

      setShowModal(false);
      setEditId(null);
      resetForm();
      fetchEverything();
    } catch (err) {
      console.error(err);
      alert("Error saving customer");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      description: "",
      products: [],
      services: [],
      contractValue: "",
      startDate: "",
      status: "active",
    });
  };

  // ======================
  //   Delete Customer
  // ======================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await axios.delete(`http://localhost:3000/user/deleteUser/${id}`);
      fetchEverything();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ======================
  //   Toggle select PNS
  // ======================
  const toggleP = (id) => {
    setForm((f) => ({
      ...f,
      products: f.products.includes(id)
        ? f.products.filter((x) => x !== id)
        : [...f.products, id],
    }));
  };

  const toggleS = (id) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((x) => x !== id)
        : [...f.services, id],
    }));
  };

  // ======================
  //   Filter Customers
  // ======================
  const filtered = customers.filter((c) => {
    const s = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(s) ||
      c.email.toLowerCase().includes(s) ||
      String(c.phone).includes(s)
    );
  });

  // ======================
  //   View Modal Hydration
  // ======================
  const hydrate = (c) => {
    return {
      ...c,
      products: c.products || [],
      services: c.services || [],
    };
  };

  // ======================
  //   Render UI
  // ======================
  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Customer Management</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          />

          <button
            onClick={() => {
              resetForm();
              setEditId(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <UserPlus size={18} /> Add Customer
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-5 rounded-xl">
          <p>Total Customers</p>
          <h2 className="text-2xl font-bold">{customers.length}</h2>
        </div>
        <div className="bg-green-50 p-5 rounded-xl">
          <p>Active</p>
          <h2 className="text-2xl font-bold">
            {customers.filter((c) => c.status === "active").length}
          </h2>
        </div>
        <div className="bg-yellow-50 p-5 rounded-xl">
          <p>Total Revenue</p>
          <h2 className="text-2xl font-bold">
            ₹
            {customers
              .reduce((sum, c) => sum + (c.totalRevenue || 0), 0)
              .toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th>Status</th>
              <th>Products</th>
              <th>Services</th>
              <th>Revenue</th>
              <th className="px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr
                key={c._id}
                className="border-t hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.email}</div>
                </td>
                <td>{c.status}</td>
                <td>{(c.products || []).length}</td>
                <td>{(c.services || []).length}</td>
                <td>₹{c.totalRevenue}</td>

                <td className="px-4 py-3 text-right">
                  <button
                    className="text-blue-600 mr-3"
                    onClick={() => setViewData(hydrate(c))}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    className="text-green-600 mr-3"
                    onClick={() => {
                      setEditId(c._id);
                      setForm({
                        name: c.name,
                        email: c.email,
                        phone: c.phone,
                        company: c.company,
                        description: c.description,
                        products: c.products.map((p) => p._id),
                        services: c.services.map((s) => s._id),
                        contractValue: c.contractValue || "",
                        startDate: c.startDate || "",
                        status: c.status,
                      });
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(c._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======================== */}
      {/* VIEW MODAL */}
      {/* ======================== */}
      <AnimatePresence>
        {viewData && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setViewData(null)}
          >
            <motion.div
              className="bg-white p-6 rounded-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{viewData.name}</h2>

              <p>Email: {viewData.email}</p>
              <p>Phone: {viewData.phone}</p>
              <p>Company: {viewData.company}</p>

              <h3 className="mt-4 font-semibold">Products</h3>
              {(viewData.products || []).map((p) => (
                <p key={p._id}>• {p.name} — ₹{p.cost}</p>
              ))}

              <h3 className="mt-4 font-semibold">Services</h3>
              {(viewData.services || []).map((s) => (
                <p key={s._id}>• {s.name} — ₹{s.cost}</p>
              ))}

              <h3 className="mt-4 font-semibold">
                Total Revenue: ₹{viewData.totalRevenue}
              </h3>

              <button
                onClick={() => setViewData(null)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================== */}
      {/* ADD / EDIT CUSTOMER */}
      {/* ======================== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-xl w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">
                {editId ? "Update Customer" : "Add Customer"}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                />

                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                />

                <input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                />

                <input
                  placeholder="Company"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                />

                <input
                  placeholder="Contract Value"
                  value={form.contractValue}
                  onChange={(e) =>
                    setForm({ ...form, contractValue: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                />

                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                />

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="border px-3 py-2 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="border px-3 py-2 rounded col-span-2"
                  rows={3}
                />
              </div>

              {/* PNS LIST */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Products */}
                <div>
                  <h3 className="font-semibold mb-2">Products</h3>
                  <div className="max-h-40 overflow-y-auto border p-2 rounded">
                    {pns
                      .filter((x) => x.type === "product")
                      .map((p) => (
                        <label key={p._id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={form.products.includes(p._id)}
                            onChange={() => toggleP(p._id)}
                          />
                          {p.name} (₹{p.cost})
                        </label>
                      ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="font-semibold mb-2">Services</h3>
                  <div className="max-h-40 overflow-y-auto border p-2 rounded">
                    {pns
                      .filter((x) => x.type === "service")
                      .map((s) => (
                        <label key={s._id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={form.services.includes(s._id)}
                            onChange={() => toggleS(s._id)}
                          />
                          {s.name} (₹{s.cost})
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-5 gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editId ? "Update" : "Add Customer"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
