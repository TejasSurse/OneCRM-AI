import React from 'react'
import { Bell, Search, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar(){
  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-gray-100 px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            
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
