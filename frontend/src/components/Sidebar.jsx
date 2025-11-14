import React from 'react'
import { LayoutDashboard, Users, UserSquare2, MessageCircle, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion'

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={18} />, link: "/" },
  { name: "Leads", icon: <Users size={18} />, link: "/leads" },
  { name: "Customers", icon: <UserSquare2 size={18} />, link: "/customers" },
  { name: "Support", icon: <MessageCircle size={18} />, link: "/support" },
  { name: "Settings", icon: <Settings size={18} />, link: "/settings" },
];

export default function Sidebar(){
  return (
    <aside className="w-72 bg-gradient-to-b from-primary-700 to-primary-800 text-white min-h-screen p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </div>
        <div>
          <div className="text-lg font-bold">CRM Pro</div>
          <div className="text-xs text-white/80">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map(item => (
          <NavLink
            key={item.name}
            to={item.link}
            className={({isActive}) => `group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/10 shadow' : 'hover:bg-white/6'}`}
          >
            <motion.div whileHover={{ x: 6 }} className="text-white/90">{item.icon}</motion.div>
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6">
        <button className="w-full bg-white text-primary-700 font-semibold py-2 rounded-lg shadow-sm hover:scale-105 transition-transform">
          Upgrade to Pro
        </button>
      </div>
    </aside>
  )
}
