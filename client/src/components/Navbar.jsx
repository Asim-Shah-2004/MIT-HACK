import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { User, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    return (
        <motion.nav
            className={`flex items-center justify-between p-4 shadow-md ${isDarkMode ? 'bg-dark1 text-light2' : 'bg-light2 text-dark1'}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center space-x-6">
                <h1 className="text-2xl font-bold">Elev8</h1>
                <Button
                    variant="ghost"
                    className="px-4 py-2 rounded-lg hover:bg-[#124E66] hover:text-white transition-colors duration-300"
                    onClick={() => navigate('/dashboard')}
                >
                    Dashboard
                </Button>
                <Button
                    variant="ghost"
                    className="px-4 py-2 rounded-lg hover:bg-[#124E66] hover:text-white transition-colors duration-300"
                    onClick={() => navigate('/marketplace')}
                >
                    Marketplace
                </Button>
                <Button
                    variant="ghost"
                    className="px-4 py-2 rounded-lg hover:bg-[#124E66] hover:text-white transition-colors duration-300"
                    onClick={() => navigate('/events')}
                >
                    Events
                </Button>
                <Button
                    variant="ghost"
                    className="px-4 py-2 rounded-lg hover:bg-[#124E66] hover:text-white transition-colors duration-300"
                    onClick={() => navigate('/network')}
                >
                    Networking
                </Button>
            </div>
            <div className="flex items-center space-x-4">
                <span className="font-medium">John Doe</span>
                <User className="h-8 w-8 rounded-full bg-[#748D92] p-1 text-[#D3D9D4]" />
                <Button
                    variant="ghost"
                    className="px-4 py-2 rounded-lg hover:bg-[#124E66] hover:text-white transition-colors duration-300"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
