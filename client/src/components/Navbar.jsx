import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { User, Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        document.body.classList.toggle('dark', !isDarkMode);
    };

    return (
        <motion.nav
            className={`flex items-center justify-between p-4 shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center space-x-6">
                <h1 className="text-2xl font-bold">Elev8</h1>
                <Button variant="ghost">Dashboard</Button>
                <Button variant="ghost">Marketplace</Button>
                <Button variant="ghost">Events</Button>
                <Button variant="ghost">Networking</Button>
            </div>
            <div className="flex items-center space-x-4">
                <span className="font-medium">John Doe</span>
                <User className="h-8 w-8 rounded-full bg-blue-100 p-1 text-blue-600" />
                <Button variant="ghost" onClick={toggleTheme}>
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
