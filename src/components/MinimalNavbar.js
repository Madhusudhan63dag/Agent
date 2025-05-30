import React from 'react';
import logo from '../assets/logo.png';

const MinimalNavbar = () => {
    return (
        <nav className="bg-white shadow-md relative border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-20 sm:h-24">
                    {/* Centered Logo and Product Name */}
                    <div className="flex items-center space-x-4">
                        <img 
                            src={logo} 
                            alt="Dr. Joints Logo" 
                            className="h-10 sm:h-14 md:h-18 w-auto object-contain" 
                        />
                        <div className="text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Dr. Joints
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-blue-600 font-medium">
                                Pain Relief Formula
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MinimalNavbar;
