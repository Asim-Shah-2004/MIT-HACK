// import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LandingNavbar from "@/components/LandingNavbar";
import OdooComp from "@/components/Odoo";
import Footer from "@/components/Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />

      <section className="bg-gray-950 text-primary-foreground h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div className="space-y-8" variants={fadeIn}>
              <h1 className="flex flex-col sm:flex-row items-center">
                <span className="bg-orange-500 select-none cursor-pointer text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight rounded-full p-6">
                  Revolutionize
                </span>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ml-2">
                  Your Business
                </span>
              </h1>
              <p className="text-xl sm:text-2xl">
                Streamline your processes, boost productivity, and achieve more with our cutting-edge platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" 
                  onClick={() => window.location.href = '/register'}  
                  className="text-black bg-orange-500  hover:bg-primary-foreground/90">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                {/* <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="ghost" className="bg-zinc-900 border border-slate-600">
                    Learn More
                  </Button>
                </motion.div> */}
              </div>
            </motion.div>
            <motion.div
              className="relative h-[400px] sm:h-[500px] overflow-hidden rounded-lg shadow-2xl"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="absolute inset-0 border-4 border-transparent transition-all duration-300" />
              <img
                src={"https://images.business.com/app/uploads/2011/06/12131215/Leadership-Skills.png"}
                alt="Hero Image"
                style={{ width: '100%', height: '100%', objectFit: "contain" }}
                className="transition-transform duration-300 "
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <OdooComp />

      {/* #TODO Hero section here*/}

      <hr />

      <Footer />
    </>
  );
};

export default LandingPage;