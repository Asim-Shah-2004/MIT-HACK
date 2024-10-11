import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Menu, X, Github, Twitter, Linkedin, BarChart, Users, Zap } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from 'react-router-dom'
import OdooComp from '@/components/OdooComp'


export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

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
              <Link href="/" className="flex items-center space-x-2">
                <img src="/placeholder.svg" alt="Logo" width={32} height={32} />
                <span className="text-2xl font-bold">Acme Inc</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link href="#features" className="text-sm font-medium hover:text-primary">Features</Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary">Contact</Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline">Log in</Button>
              <Button>Sign up</Button>
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
            <Link href="#features" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Features</Link>
            <Link href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Testimonials</Link>
            <Link href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Pricing</Link>
            <Link href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Contact</Link>
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
        <section className=" bg-slate-600 text-primary-foreground">
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
                  src= {"https://contiguglia.com/wp-content/uploads/2019/06/7CD05707-3C05-4A36-AF95-8DACE7380EFD-1080x675.jpeg"}
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

        <OdooComp />

        {/* Features Section */}
        <section id="features" className="py-24 sm:py-32 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the tools that will take your productivity to the next level.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                { icon: BarChart, title: "Intuitive Dashboard", description: "Get a bird's-eye view of your projects and tasks." },
                { icon: Zap, title: "Smart Automation", description: "Automate repetitive tasks and focus on what matters." },
                { icon: Users, title: "Real-time Collaboration", description: "Work seamlessly with your team, anywhere, anytime." },
                { icon: BarChart, title: "Advanced Analytics", description: "Gain insights and make data-driven decisions." },
                { icon: Zap, title: "Customizable Workflows", description: "Tailor the platform to fit your unique processes." },
                { icon: Users, title: "Secure and Scalable", description: "Enterprise-grade security that grows with your business." },
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card>
                    <CardContent className="p-6">
                      <feature.icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Hero Section 3 - AI Integration */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div
                className="order-2 lg:order-1 relative h-[400px] sm:h-[500px]"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <img
                  src="/placeholder.svg"
                  alt="AI Integration"
                  style={{ width: '100%', height: '100%', objectFit: "cover" }}
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
              <motion.div className="space-y-8 order-1 lg:order-2" variants={fadeIn}>
                <Badge variant="outline" className="text-sm mb-4">AI-Powered</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Harness the Power of AI
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our AI integration brings intelligent insights and automation to your workflow, helping you make smarter decisions faster.
                </p>
                <ul className="space-y-4">
                  {["Predictive Analytics", "Intelligent Task Prioritization", "Automated Reporting", "Sentiment Analysis"].map((item, index) => (
                    <motion.li key={index} className="flex items-center space-x-3" variants={fadeIn}>
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button size="lg">
                  Discover AI Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 sm:py-32 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Don&apos;t just take our word for it. Here&apos;s what industry leaders have to say about our platform.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  name:  "Alex Johnson",
                  role: "CEO, TechCorp",
                  content: "This platform has completely transformed how we manage our projects. The AI insights are a game-changer!"
                },
                {
                  name: "Samantha Lee",
                  role: "CTO, InnovateCo",
                  content: "The intuitive interface and powerful features have boosted our team's productivity by 35%. Highly recommended!"
                },
                {
                  name: "Michael Chen",
                  role: "Founder, StartupX",
                  content: "As a startup, we needed a solution that could scale with us. This platform has exceeded our expectations in every way."
                },
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-lg mb-4">&quot;{testimonial.content}&quot;</p>
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-muted h-12 w-12"></div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Hero Section 4 - Integration Showcase */}
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
                <Badge variant="outline" className="text-sm mb-4">Seamless Integration</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Connect Your Favorite Tools
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our platform integrates with the tools you already use, creating a seamless workflow across your entire tech stack.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {['Slack', 'GitHub', 'Trello', 'Jira', 'Asana', 'Zapier'].map((tool, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-center h-16 bg-muted rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {tool}
                    </motion.div>
                  ))}
                </div>
                <Button size="lg">
                  View All Integrations
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
                  alt="Integration Showcase"
                  style={{ width: '100%', height: '100%', objectFit: "cover" }}
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
              <p className="text-xl mb-8">
                Join thousands of satisfied customers and take your productivity to new heights.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                variants={stagger}
              >
                <motion.div variants={fadeIn}>
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Start Free Trial
                  </Button>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                    Schedule Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">API Reference</Link></li>
                <li><Link href="#" className="text-muted-foreground  hover:text-foreground">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-muted-foreground/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}