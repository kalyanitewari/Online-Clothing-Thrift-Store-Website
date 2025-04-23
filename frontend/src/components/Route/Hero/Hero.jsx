import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative h-screen bg-gradient-to-b from-black/10 to-indigo-800/50 overflow-hidden z-[-1]">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-8" />

            {/* Content Container */}
            <div className="relative h-full flex items-center justify-center px-4">
                <div className="text-center max-w-5xl">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 flex flex-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-white">Shop @ </span>
                        <span className="text-black">Second Edition</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-200 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Shop the latest trends at the best prices
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link
                            to="/products"
                            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-200"
                        >
                            Shop Now
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Animated Shapes */}
            <motion.div
                className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <motion.div
                className="absolute -top-16 -right-16 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, -50, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </div>
    );
};

export default Hero;
