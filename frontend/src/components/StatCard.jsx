import React from 'react'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'

/**
 * props:
 * - title, value, subtitle, icon (React element)
 */
export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3">
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.06}
        className="perspective-1000"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-card border border-transparent hover:shadow-focus"
          style={{ willChange: 'transform' }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 text-white">
              {icon}
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-400">{title}</div>
              <div className="mt-1 text-2xl font-semibold text-gray-800">{value}</div>
              {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
            </div>
          </div>
        </motion.div>
      </Tilt>
    </div>
  )
}
