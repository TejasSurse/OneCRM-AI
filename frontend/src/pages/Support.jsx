import React, { useState } from "react";
import {
  Plus,
  Filter,
  Search,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  X,
} from "lucide-react";

const Support = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Unable to access premium features",
      customer: "Sarah Johnson",
      email: "sarah.j@company.com",
      priority: "High",
      status: "Open",
      agent: "John Smith",
      category: "Technical",
      created: "2d ago",
      updated: "Just now",
      responses: 2,
    },
    {
      id: 2,
      title: "Billing inquiry about recent charge",
      customer: "Michael Chen",
      email: "m.chen@startup.io",
      priority: "Medium",
      status: "Resolved",
      agent: "Lisa Davis",
      category: "Billing",
      created: "5d ago",
      updated: "Yesterday",
      responses: 3,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: "",
    customer: "",
    email: "",
    priority: "Medium",
    status: "Open",
    agent: "",
    category: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTicket = (e) => {
    e.preventDefault();
    const ticket = {
      ...newTicket,
      id: Date.now(),
      created: "Just now",
      updated: "Just now",
      responses: 0,
    };
    setTickets([ticket, ...tickets]);
    setShowModal(false);
    setNewTicket({
      title: "",
      customer: "",
      email: "",
      priority: "Medium",
      status: "Open",
      agent: "",
      category: "",
      description: "",
    });
  };

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800 transition-all">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Support</h1>
          <p className="text-gray-500">
            Manage support tickets and communications
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-card hover:shadow-focus"
          >
            <Plus className="w-4 h-4" /> New Ticket
          </button>
          <button className="bg-blue-100 hover:bg-blue-200 text-primary-700 px-4 py-2 rounded-lg font-medium shadow-card transition-all">
            AI Assistant
          </button>
          <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-all">
            Analytics
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Open Tickets"
          value={tickets.filter((t) => t.status === "Open").length}
          color="bg-blue-50 text-blue-700"
        />
        <StatCard
          label="In Progress"
          value="0"
          color="bg-yellow-50 text-yellow-700"
        />
        <StatCard
          label="Resolved"
          value={tickets.filter((t) => t.status === "Resolved").length}
          color="bg-green-50 text-green-700"
        />
        <StatCard
          label="Avg Satisfaction"
          value="5.0 ⭐"
          color="bg-purple-50 text-purple-700"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tickets by title, customer, or category..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
        <select className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary-500 outline-none">
          <option>All Status</option>
          <option>Open</option>
          <option>Resolved</option>
        </select>
        <select className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary-500 outline-none">
          <option>All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button className="border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition-all">
          <Filter className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Ticket Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-card">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="p-3">Ticket Details</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Priority & Status</th>
              <th className="p-3">Assignment</th>
              <th className="p-3">Timeline</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr
                key={t.id}
                className="bg-gray-50 hover:bg-gray-100 transition-all rounded-lg"
              >
                <td className="p-3">
                  <p className="font-medium text-gray-800">
                    #{t.id} - {t.title}
                  </p>
                  <p className="text-sm text-gray-500">{t.responses} responses</p>
                </td>
                <td className="p-3">
                  <p className="font-medium">{t.customer}</p>
                  <p className="text-sm text-gray-500">{t.email}</p>
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      t.priority === "High"
                        ? "bg-orange-100 text-orange-700"
                        : t.priority === "Medium"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {t.priority}
                  </span>
                  <br />
                  <span
                    className={`text-xs font-medium ${
                      t.status === "Resolved"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-3">
                  <p className="font-medium">{t.agent}</p>
                  <p className="text-sm text-gray-500">{t.category}</p>
                </td>
                <td className="p-3 text-sm text-gray-500">
                  Created: {t.created}
                  <br />
                  Updated: {t.updated}
                </td>
                <td className="p-3 flex gap-3 text-gray-500">
                  <MessageSquare className="w-5 h-5 cursor-pointer hover:text-primary-600" />
                  <Phone className="w-5 h-5 cursor-pointer hover:text-primary-600" />
                  <Mail className="w-5 h-5 cursor-pointer hover:text-primary-600" />
                  <CheckCircle className="w-5 h-5 cursor-pointer text-green-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-focus p-6 w-full max-w-lg relative transform transition-all scale-100 hover:scale-[1.01]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Ticket
            </h2>

            <form onSubmit={handleAddTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  value={newTicket.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter issue title..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Customer Name
                  </label>
                  <input
                    name="customer"
                    value={newTicket.customer}
                    onChange={handleInputChange}
                    required
                    placeholder="Customer name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={newTicket.email}
                    onChange={handleInputChange}
                    required
                    placeholder="customer@email.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={newTicket.priority}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Category
                  </label>
                  <input
                    name="category"
                    value={newTicket.category}
                    onChange={handleInputChange}
                    placeholder="e.g. Billing, Technical"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Assigned Agent
                </label>
                <input
                  name="agent"
                  value={newTicket.agent}
                  onChange={handleInputChange}
                  placeholder="Agent name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={newTicket.description}
                  onChange={handleInputChange}
                  placeholder="Add short description about the issue..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2.5 font-medium transition-all shadow-card hover:shadow-focus"
              >
                Add Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div
    className={`p-4 rounded-xl shadow-card ${color} flex flex-col justify-center`}
  >
    <p className="text-sm font-medium opacity-70">{label}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Support;
