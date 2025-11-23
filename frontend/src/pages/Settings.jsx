import React, { useState } from "react";
import { X, Save, Lock, Bell, User } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Tejas Surse",
    email: "tejassunilsurse2004@gmail.com",
    phone: "+91 93224 55304",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    alert("Profile saved successfully!");
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800 transition-all">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Profile Section */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-card mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <User size={20} /> Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium shadow-card hover:shadow-focus transition-all"
        >
          <Save size={16} /> Save Profile
        </button>
      </div>

      {/* Notifications Section */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-card mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Bell size={20} /> Notifications
        </h2>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="email"
              checked={notifications.email}
              onChange={handleNotificationChange}
              className="w-4 h-4"
            />
            Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="sms"
              checked={notifications.sms}
              onChange={handleNotificationChange}
              className="w-4 h-4"
            />
            SMS Notifications
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="push"
              checked={notifications.push}
              onChange={handleNotificationChange}
              className="w-4 h-4"
            />
            Push Notifications
          </label>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-card mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Lock size={20} /> Security
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="new"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleChangePassword}
          className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium shadow-card hover:shadow-focus transition-all"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
