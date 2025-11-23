import React from 'react'
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  MessageCircle, 
  Settings,
  Mails
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion'

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={18} />, link: "/" },
  { name: "Leads", icon: <Users size={18} />, link: "admin/leads" },
  { name: "Customers", icon: <UserSquare2 size={18} />, link: "admin/customers" },
  { name: "Email Campaigns", icon: <Mails size={18} />, link: "admin/email" },
  { name: "Products & Services", icon: <Settings size={18} />, link: "admin/pns" },
  { name: "Support", icon: <MessageCircle size={18} />, link: "admin/support" },
  { name: "Settings", icon: <Settings size={18} />, link: "admin/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-[#0C1A27] to-[#071019] text-white min-h-screen p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
       
        <div>
          <div className="text-lg font-bold tracking-wider">OneCRM AI</div>
          <div className="text-[11px] text-white/70">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map(item => (
          <NavLink
            key={item.name}
            to={item.link}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
              ${isActive ? 'bg-white/10 shadow-lg backdrop-blur-sm' : 'hover:bg-white/5'}`
            }
          >
            <motion.div whileHover={{ x: 6 }} className="text-white/90">
              {item.icon}
            </motion.div>
            <span className="text-sm tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6">
        <button className="w-full bg-white text-[#0C1A27] font-semibold py-2 rounded-lg shadow hover:scale-[1.03] transition-all">
          Upgrade to Pro
        </button>
      </div>
    </aside>
  );
}
