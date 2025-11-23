import React, { useState, useEffect } from "react";
import { Plus, Filter, Search, X, Trash, Edit } from "lucide-react";
import axios from "axios";

const ProductsServices = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    type: "product",
    cost: "",
    description: "",
  });

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  // ==========================
  //   FETCH ITEMS
  // ==========================
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/pns/getAllPNS");
      setItems(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching products/services");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ==========================
  //   INPUT HANDLER
  // ==========================
  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // ==========================
  //   ADD / EDIT HANDLER
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.type || !newItem.cost) {
      alert("Name, type & cost required!");
      return;
    }

    const payload = {
      name: newItem.name,
      type: newItem.type.toLowerCase(),
      cost: Number(newItem.cost),
      description: newItem.description,
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/pns/updatePNS/${editingId}`,
          payload
        );
      } else {
        await axios.post("http://localhost:3000/pns/addPNS", payload);
      }

      setShowModal(false);
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewItem({
      name: "",
      type: "product",
      cost: "",
      description: "",
    });
  };

  // ==========================
  //   DELETE ITEM
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await axios.delete(`http://localhost:3000/pns/deletePNS/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ==========================
  //   FILTER + SEARCH
  // ==========================
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterType === "All" ? true : item.type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products & Services</h1>
          <p className="text-gray-500">Manage dynamic offerings</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded-lg py-2 px-3"
        >
          <option>All</option>
          <option>product</option>
          <option>service</option>
        </select>

        <button className="border p-2 rounded-lg hover:bg-gray-100">
          <Filter className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-50 p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col gap-2"
            >
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-sm text-gray-500">
                Type: {item.type.toUpperCase()}
              </p>
              <p className="text-sm text-gray-500">Price: ₹{item.cost}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setNewItem({
                      name: item.name,
                      type: item.type,
                      cost: item.cost,
                      description: item.description,
                    });
                    setShowModal(true);
                  }}
                  className="text-blue-600 flex items-center gap-1"
                >
                  <Edit size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 flex items-center gap-1"
                >
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Item" : "Add New Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={newItem.type}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    name="cost"
                    value={newItem.cost}
                    onChange={handleInputChange}
                    type="number"
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium shadow hover:bg-blue-700"
              >
                {editingId ? "Update Item" : "Add Item"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsServices;
