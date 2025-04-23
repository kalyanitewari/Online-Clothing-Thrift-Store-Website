import React from 'react'
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import { motion } from 'framer-motion';

const Categories = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Branding Section */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                {brandingData && brandingData.map((i, index) => (
                    <motion.div 
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-start space-x-4">
                            <div className="text-blue-600">
                                {i.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{i.title}</h3>
                                <p className="text-gray-600 mt-1">{i.Description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Categories Section */}
            <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoriesData && categoriesData.map((i) => {
                        const handleSubmit = (i) => {
                            navigate(`/products?category=${i.title}`);
                        }
                        return (
                            <motion.div
                                key={i.id}
                                className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
                                onClick={() => handleSubmit(i)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <img
                                    src={i.image_Url}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    alt={i.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h5 className="text-white text-2xl font-semibold mb-2">
                                        {i.title}
                                    </h5>
                                    {i.subTitle && (
                                        <p className="text-white/80 text-sm">{i.subTitle}</p>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}

export default Categories