// import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  BarChart,
  Shield,
  Globe,
  CalendarDays
} from 'lucide-react';
import annotateImage from '@/assets/annotate.png';

const features = [
  { icon: Briefcase, name: 'Project Management', alt: 'Trello' },
  { icon: Users, name: 'Team Collaboration', alt: 'Asana' },
  { icon: FileText, name: 'Document Sharing', alt: 'Google Docs' },
  { icon: MessageSquare, name: 'Instant Messaging', alt: 'Slack' },
  { icon: Calendar, name: 'Scheduling', alt: 'Calendly' },
  { icon: BarChart, name: 'Analytics', alt: 'Tableau' },
  { icon: Shield, name: 'Security', alt: 'LastPass' },
  { icon: Globe, name: 'Networking', alt: 'Linkedin' },
  { icon: CalendarDays, name: 'Event Management', alt: 'Luma' },
];

const OdooComp = () => {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">

      <section className="container mx-auto px-4 pt-20 text-center relative z-20">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Empower Your SME with Elev
          <span
            className="text-orange-500"
            style={{
              textShadow: '0 0 3px rgba(255, 165, 0, 0.7), 0 0 5px rgba(255, 165, 0, 0.5), 0 0 7px rgba(255, 165, 0, 0.3)'
            }}
          >
            8
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          One platform for all your collaboration needs
        </motion.p>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-20 py-20 relative z-20 flex justify-center items-center">
        {/* Show image when toggle is on */}
        {showAlternatives && (
          <motion.img
            src={annotateImage}
            alt="Annotation"
            className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none hidden md:block"
            initial={{ opacity: 0, visibility: 'hidden' }}
            animate={{ opacity: isLoaded ? 1 : 0, visibility: isLoaded ? 'visible' : 'hidden' }}
            transition={{ duration: 0.5 }}
            onLoad={handleLoad}
          />
        )}

        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 relative">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="bg-white p-4 rounded-lg shadow-lg text-center max-h-34"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >

                <feature.icon className="w-8 h-8 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <motion.p
                  className="text-gray-600 text-md"
                  animate={{
                    color: showAlternatives ? '#ef4444' : '#4b5563',
                    fontWeight: showAlternatives ? 700 : 400,
                  }}
                >
                  {showAlternatives ? `Use ${feature.alt} instead` : 'Integrated in Elev8'}
                </motion.p>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-4 flex justify-center items-center relative z-20">
        <Switch
          id="show-alternatives"
          className={`transition-transform duration-300 ${showAlternatives ? 'bg-blue-600' : 'bg-gray-300'}`}
          checked={showAlternatives}
          onCheckedChange={setShowAlternatives}
        />
        <Label htmlFor="show-alternatives" className="ml-3 text-lg font-medium text-gray-700">
          {showAlternatives ? 'Without Elev8' : 'With Elev8'}
        </Label>
      </section>
    </div>
  );
};

export default OdooComp;
