import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Form() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    email2: "",
    dob: "",
    phone: "",
    phone2: "",
    stage: "1",
    status: "active",
    description: "",
    remarks: [], // <-- Added remarks as array
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("❌ Server error");
    }
  };

  const stepVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const ProgressBar = () => (
    <div className="flex gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1 rounded-full ${
            i < step ? "bg-blue-600" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-2">User Management</h1>
      <p className="text-center mb-6 text-gray-500">
        Add new users to your system
      </p>

      {!submitted ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-2">User Registration</h2>
            <p className="text-sm text-gray-500 mb-4">
              Step {step} of {totalSteps} ·{" "}
              {step === 1
                ? "Personal Information"
                : step === 2
                ? "Contact Details"
                : step === 3
                ? "User Status"
                : "Remarks & Review"}
            </p>

            <ProgressBar />

            {/* Step 1 */}
            {step === 1 && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Secondary Email
                  </label>
                  <input
                    type="email"
                    name="email2"
                    value={formData.email2}
                    onChange={handleChange}
                    placeholder="john.doe@example.com (optional)"
                    className="w-full border rounded-lg p-3"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Optional secondary email address
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    disabled
                    className="px-6 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Next →
                  </button>
                </div>
              </form>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+123456789"
                    className="w-full border rounded-lg p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Secondary Phone
                  </label>
                  <input
                    type="tel"
                    name="phone2"
                    value={formData.phone2}
                    onChange={handleChange}
                    placeholder="+987654321 (optional)"
                    className="w-full border rounded-lg p-3"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Optional secondary contact number
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Next →
                  </button>
                </div>
              </form>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stage *
                  </label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="1">Lead</option>
                    <option value="2">Customer</option>
                    <option value="0">Fail</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">
                    Current stage in the customer journey
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">
                    For customers – active or inactive
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description about the user"
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Next →
                  </button>
                </div>
              </form>
            )}

            {/* Step 4 - Remarks & Review */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Remarks</h3>

                {formData.remarks.map((r, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={r.type}
                      onChange={(e) => {
                        const newRemarks = [...formData.remarks];
                        newRemarks[index].type = e.target.value;
                        newRemarks[index].timestamp = new Date();
                        setFormData({ ...formData, remarks: newRemarks });
                      }}
                      placeholder="Enter remark"
                      className="flex-1 border rounded-lg p-3"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newRemarks = formData.remarks.filter(
                          (_, i) => i !== index
                        );
                        setFormData({ ...formData, remarks: newRemarks });
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      remarks: [
                        ...formData.remarks,
                        { type: "", timestamp: new Date() },
                      ],
                    })
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  + Add Remark
                </button>

                <h3 className="text-lg font-medium mt-6">Review Information</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                  {JSON.stringify(formData, null, 2)}
                </pre>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Submit ✔
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
              ✔
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">Successfully Submitted!</h2>
          <p className="text-gray-500 mb-6">
            The new user information has been saved.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFormData({
                name: "",
                email: "",
                email2: "",
                dob: "",
                phone: "",
                phone2: "",
                stage: "1",
                status: "active",
                description: "",
                remarks: [],
              });
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Another User
          </button>
        </motion.div>
      )}
    </div>
  );
}
