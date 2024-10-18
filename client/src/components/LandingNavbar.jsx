import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import useTheme from '@/hooks/useTheme'

export default function LandingNavbar() {
  const { isDarkMode } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.nav
      className={`w-full z-50 bg-gray-950 backdrop-blur-sm border-b-2 border-orange-600 border-double`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 border-b border-orange-700`}>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white">
              Elev
              <span
                className="text-orange-500"
                style={{
                  textShadow: '0 0 3px rgba(255, 165, 0, 0.7), 0 0 5px rgba(255, 165, 0, 0.5), 0 0 7px rgba(255, 165, 0, 0.3)'
                }}
              >
                8
              </span>
            </h1>
          </div>
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              className={`p-2 rounded-lg hover:bg-orange-100 text-white transition-colors duration-300`}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className={` rounded-lg border-dashed border-2 p-5 text-white border-orange-600 hover:bg-gray-800 hover:text-orange-400 transition-colors duration-300`}
            >
              <Link to="/login">Log In</Link>
            </Button>
            <Button
              variant="ghost"
              className={`rounded-lg border-dashed border-2 p-5 text-white border-orange-600 hover:bg-gray-800 hover:text-orange-400 transition-colors duration-300`}
            >
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden bg-gray-800' backdrop-blur-sm`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 sm:px-3">
              <Button
                variant="ghost"
                className={`block w-full text-left px-3 py-2 rounded-md bg-gray-950 hover:bg-gray-900 text-base font-medium text-orange-400 hover:text-orange-400 transition-colors duration-300`}
                onClick={toggleMenu}
              >
                <Link to="/login" className='underline'>Log In</Link>
              </Button>
              <Button
                variant="ghost"
                className={`block w-full text-left px-3 py-2 rounded-md bg-gray-950 hover:bg-gray-900 text-base font-medium text-orange-400 hover:text-orange-400 transition-colors duration-300`}
                onClick={toggleMenu}
              >
                <Link to="/register" className='underline'>Sign Up</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
