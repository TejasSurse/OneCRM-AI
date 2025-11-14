import React from 'react'
import { Bell, Search, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar(){
  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-gray-100 px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="relative">
              <input className="w-72 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-300" placeholder="Search leads, customers..." />
              <Search className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.95 }} className="p-2 rounded-lg hover:bg-gray-100">
            <Bell />
            <span className="sr-only">Notifications</span>
          </motion.button>
          <motion.button whileHover={{ rotate: 10 }} className="p-2 rounded-lg hover:bg-gray-100">
            <Settings />
          </motion.button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  )
}
