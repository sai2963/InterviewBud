'use client'
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-2xl font-bold">
                Interview Bud
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <motion.div variants={itemVariants} className="group">
              <Link 
                href="/submissions"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-700/50"
              >
                Submissions
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <Link 
                href="/submissions/new"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-700/50"
              >
                New
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/login"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Login
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/register"
                className="text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
              >
                Register
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;