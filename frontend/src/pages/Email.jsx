import React, { useState } from "react";
import { Plus, Send, Filter, Brush, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmailCampaigns() {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [emailBody, setEmailBody] = useState("<p>Write your email here...</p>");

  const campaigns = [
    { name: "AI Automation Upgrade Offer", sentTo: "145 Contacts", date: "01 Nov 2024", status: "Scheduled" },
    { name: "Festive Discount Email", sentTo: "210 Contacts", date: "15 Oct 2024", status: "Delivered" },
    { name: "Product Feedback Mail", sentTo: "90 Contacts", date: "25 Sep 2024", status: "In Progress" },
  ];

  // Function for formatting text in the editor
  const formatText = (command) => document.execCommand(command, false, null);

  return (
    <div className="p-6 space-y-6">

      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Mail size={30} /> Email Campaigns
        </h1>

        <div className="flex gap-3">
          <button
            className="bg-gray-200 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-300 transition"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} /> Filters
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} /> Create Campaign
          </button>
        </div>
      </div>

      {/* Filters */}
      {filterOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="border rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <select className="border p-2 rounded-xl">
            <option>Status: All</option>
            <option>Delivered</option>
            <option>Scheduled</option>
            <option>In Progress</option>
          </select>

          <select className="border p-2 rounded-xl">
            <option>Industry: All</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
            <option>Education</option>
          </select>

          <input type="date" className="border p-2 rounded-xl" />
        </motion.div>
      )}

      {/* Send All Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700">
          <Send size={18} /> Send All Emails
        </button>
      </div>

      {/* Campaign Table */}
      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500">
              <th className="px-5 py-3">Campaign Name</th>
              <th className="px-5 py-3">Sent To</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition text-gray-700">
                <td className="px-5 py-3">{c.name}</td>
                <td className="px-5 py-3">{c.sentTo}</td>
                <td className="px-5 py-3">{c.date}</td>
                <td className="px-5 py-3">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Campaign Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-2xl shadow w-full max-w-3xl space-y-5"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">New Campaign</h2>
                <button onClick={() => setShowModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <input
                type="text"
                placeholder="Email Subject"
                className="border p-2 w-full rounded-xl"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              {/* Simple Rich Text Editor */}
              <div className="border rounded-xl p-2 space-y-2">
                <div className="flex gap-2 mb-2">
                  <button onClick={() => formatText("bold")} className="px-2 py-1 border rounded">B</button>
                  <button onClick={() => formatText("italic")} className="px-2 py-1 border rounded">I</button>
                  <button onClick={() => formatText("underline")} className="px-2 py-1 border rounded">U</button>
                </div>
                <div
                  contentEditable
                  className="min-h-[150px] border p-2 rounded"
                  dangerouslySetInnerHTML={{ __html: emailBody }}
                  onInput={(e) => setEmailBody(e.currentTarget.innerHTML)}
                ></div>
              </div>

              <div className="flex justify-between">
                <button className="bg-gray-200 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-300 transition">
                  <Brush size={18} /> Rewrite with AI ✨
                </button>

                <button className="bg-black text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition">
                  <Send size={18} /> Send Email
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
