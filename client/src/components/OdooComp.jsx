import { useState } from 'react'
import { motion } from 'framer-motion'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Briefcase,
    Users,
    FileText,
    MessageSquare,
    Calendar,
    BarChart,
    Shield,
    Globe,
    Mail
} from 'lucide-react'
import annotateImage from '@/assets/annotate.png'  // Adjust the import path as needed

const features = [
    { icon: Briefcase, name: 'Project Management', alt: 'Asana' },
    { icon: Users, name: 'Team Collaboration', alt: 'Slack' },
    { icon: FileText, name: 'Document Sharing', alt: 'Google Docs' },
    { icon: MessageSquare, name: 'Instant Messaging', alt: 'Microsoft Teams' },
    { icon: Calendar, name: 'Scheduling', alt: 'Calendly' },
    { icon: BarChart, name: 'Analytics', alt: 'Tableau' },
    { icon: Shield, name: 'Security', alt: 'LastPass' },
    { icon: Globe, name: 'Remote Access', alt: 'TeamViewer' },
    { icon: Mail, name: 'Email Integration', alt: 'Outlook' },
]

export default function OdooComp() {
    const [showAlternatives, setShowAlternatives] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
            {showAlternatives && (
                <motion.img
                    src={annotateImage}
            
                    alt="Annotation"
                    className="hidden lg:block absolute inset-0 mt-[260px] h-[800px] object-cover z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            )}

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center relative z-20">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Empower Your SME with CollabSME
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
            <section className="container mx-auto px-4 py-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            className="bg-white p-6 rounded-lg shadow-lg text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                            <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                            <motion.p
                                className="text-gray-600"
                                animate={{
                                    color: showAlternatives ? '#ef4444' : '#4b5563',
                                    fontWeight: showAlternatives ? 700 : 400
                                }}
                            >
                                {showAlternatives ? `Use ${feature.alt} instead` : 'Integrated in CollabSME'}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Toggle Switch */}
            <section className="container mx-auto px-4 py-10 flex justify-center items-center relative z-20">
                <Switch
                    id="show-alternatives"
                    checked={showAlternatives}
                    onCheckedChange={setShowAlternatives}
                />
                <Label htmlFor="show-alternatives" className="ml-2">
                    {showAlternatives ? 'Without CollabSME' : 'With CollabSME'}
                </Label>
            </section>
        </div>
    )
}
