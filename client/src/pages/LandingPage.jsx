import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Menu, X, Github, Twitter, Linkedin, BarChart, Users, Zap } from "lucide-react"
import { motion, useScroll } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'
import OdooComp from '@/components/OdooComp'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2" aria-label="Home">
                <img src="/elev8logotrans.png" alt="Elev8 Logo" width={80} />
                <span className="text-2xl font-bold">Elev8</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link to="#features" className="text-sm font-medium hover:text-primary">Features</Link>
              <Link to="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</Link>
              <Link to="#pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
              <Link to="#contact" className="text-sm font-medium hover:text-primary">Contact</Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/login')}>Log in</Button>
              <Button onClick={() => navigate('/login', { state: { initialIsRegistered: false } })}>Sign up</Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {isMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="#features" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Features</Link>
            <Link to="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Testimonials</Link>
            <Link to="#pricing" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Pricing</Link>
            <Link to="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Contact</Link>
          </nav>
          <div className="pt-4 pb-3 border-t border-muted">
            <div className="px-2 space-y-1">
              <Button className="w-full justify-start" variant="ghost">Log in</Button>
              <Button className="w-full justify-start">Sign up</Button>
            </div>
          </div>
        </motion.div>
      )}

      <main className="flex-grow">
        {/* Hero Section 1 */}
        <section className="bg-slate-600 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div className="space-y-8" variants={fadeIn}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Revolutionize Your Workflow
                </h1>
                <p className="text-xl sm:text-2xl">
                  Streamline your processes, boost productivity, and achieve more with our cutting-edge platform.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="text-primary bg-primary-foreground hover:bg-primary-foreground/90">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="ghost" className="bg-zinc-900">
                    Learn More
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="relative h-[400px] sm:h-[500px]"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <img
                  src={"https://contiguglia.com/wp-content/uploads/2019/06/7CD05707-3C05-4A36-AF95-8DACE7380EFD-1080x675.jpeg"}
                  alt="Hero Image"
                  style={{ width: '100%', height: '100%', objectFit: "cover" }}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Hero Section 2 - Product Showcase */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div className="space-y-8" variants={fadeIn}>
                <Badge variant="outline" className="text-sm mb-4">Intuitive Design</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Powerful Features, Simple Interface
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our platform combines powerful functionality with an intuitive user interface, making it easy for your team to adopt and master.
                </p>
                <ul className="space-y-4">
                  {["Drag-and-Drop Interface", "Customizable Dashboards", "Real-Time Collaboration"].map((item, index) => (
                    <motion.li key={index} className="flex items-center space-x-3" variants={fadeIn}>
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button size="lg">
                  Explore Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                className="relative h-[400px] sm:h-[500px]"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <img
                  src="/placeholder.svg"
                  alt="Product Interface"
                  style={{ width: '100%', height: '100%', objectFit: "cover" }}
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-muted py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["User 1", "User 2", "User 3"].map((user, index) => (
                <Card key={index} className="p-6">
                  <CardContent>
                    <p className="text-lg font-semibold">"{user} loved the ease of use!"</p>
                    <p className="mt-2 text-muted-foreground">- {user}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Flexible Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["Basic", "Pro", "Enterprise"].map((plan, index) => (
                <Card key={index} className="p-6">
                  <CardContent>
                    <h3 className="text-2xl font-semibold mb-4">{plan}</h3>
                    <p className="text-xl font-bold mb-4">$19/month</p>
                    <ul className="space-y-2">
                      <li>Feature 1</li>
                      <li>Feature 2</li>
                      <li>Feature 3</li>
                    </ul>
                    <Button className="mt-4 w-full">Choose Plan</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Get In Touch</h2>
            <form className="max-w-lg mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" required className="block w-full border border-gray-300 rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" required className="block w-full border border-gray-300 rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea required className="block w-full border border-gray-300 rounded-md px-4 py-2" rows="4"></textarea>
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-600 text-primary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 Elev8. All Rights Reserved.</p>
          <div className="mt-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
