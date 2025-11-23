





import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Customers from "./pages/Customers";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Form from "./components/Form";
import EmailCampaigns from "./pages/Email";
import ProductsServices from "./pages/Services";
const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-50 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin/leads" element={<Leads />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/support" element={<Support />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/email" element={<EmailCampaigns/>}/>
            <Route path="/admin/userform" element={<Form />} />
            <Route path="/admin/pns" element={<ProductsServices />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;








// import UserForm from "./components/Form";



//       <UserForm/>