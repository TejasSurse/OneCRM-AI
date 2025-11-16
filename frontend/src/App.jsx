import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Customers from "./pages/Customers";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import UserForm from "./components/Form";

import EmailBuilder from "./pages/EmailBuilder"; 

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-50 min-h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/addUser" element={<UserForm />} />

            {/* New Dynamic Email Builder */}
            <Route path="/email-builder" element={<EmailBuilder />} /> 
            
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
