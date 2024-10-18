// import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Moon, Sun, Menu, X } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useTheme';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Chat', path: '/chat' },
    // { name: 'Marketplace', path: '/marketplace' },
    { name: 'Proposals', path: '/proposal' },
    { name: 'Events', path: '/events' },
    // { name: 'Networking', path: '/network' },
    { name: 'Warehouse', path: '/warehouse' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user)
      setUsername(user.fullName);
  }, [user, loading]);

  return (
    <motion.nav
      className={`w-full z-50 ${isDarkMode ? 'bg-gray-950' : 'bg-background/80'} backdrop-blur-sm`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${isDarkMode ? 'border-orange-700' : 'border-orange-200'}`}>
          <div className="flex items-center">
            <h1 onClick={() => navigate('/')} className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-foreground'}`}>Elev8</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-foreground hover:bg-orange-100 hover:text-orange-600'} transition-colors duration-300`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!loading && (
              <span className={`font-medium hidden md:block ${isDarkMode ? 'text-gray-300' : 'text-foreground'}`}>
                {username || 'Guest'}
              </span>
            )}
            <User onClick={() => navigate('/profile')} className={`h-8 w-8 cursor-pointer rounded-full p-1 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-orange-100 text-orange-600'}`} />
            <Button
              variant="ghost"
              className={`p-2 rounded-lg hover:bg-orange-100 ${isDarkMode ? 'hover:bg-gray-600 text-white hover:text-orange-400' : 'hover:text-orange-600'} transition-colors duration-300 md:hidden`}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-background/80'} backdrop-blur-sm`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-foreground hover:bg-orange-100 hover:text-orange-600'} transition-colors duration-300`}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
