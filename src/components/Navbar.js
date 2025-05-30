import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';



const Navbar = ({ currentLang, setCurrentLang, translations, languages }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    console.log('Current Language:', currentLang);
    console.log('Translations:', translations);

    const nav = translations[currentLang]?.nav;

    console.log('Nav:', nav);

    if (!nav) {
        return null; // or some fallback UI
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isLangMenuOpen) setIsLangMenuOpen(false);
    };

    const toggleLangMenu = () => {
        setIsLangMenuOpen(!isLangMenuOpen);
    };

    const handleLangSelect = (langCode) => {
        setCurrentLang(langCode);
        setIsLangMenuOpen(false);
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-lg relative">
            {/* Rotating Text Banner */}
            <div className="bg-orange-500 text-white text-center py-2">
                <marquee behavior="scroll" direction="left">
                    Make your payment online and save 10% instantly on your purchase! It’s fast, secure, and convenient. Take advantage of this limited-time offer and enjoy extra savings today. Don't miss out—start saving now! 🎉✨
                </marquee>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href={nav.homelink || "#"}>
                            <img src={logo} alt="Dr. Joints Logo" className="h-8 sm:h-12 md:h-16" />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href={nav.homelink || "#"}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.home}
                        </a>
                        <a href={nav.aboutUslink || "#"}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.aboutUs}
                        </a>
                        <a href={nav.productlink || "#"}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.product}
                        </a>
                        <a href={nav.returnPolicylink || "#"}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.returnPolicy}
                        </a>
                        <a href={nav.Checkoutlink || "#"}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.Checkout}
                        </a>
                        <a href={nav.contactUslink || "#"}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.contactUs}
                        </a>
                        <a href={nav.bloglink || "#"}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.blog}
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-blue-600 p-2"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <a href={nav.homelink || "#"}
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.home}
                        </a>
                        <a href={nav.aboutUslink || "#"}
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.aboutUs}
                        </a>
                        <a href={nav.productlink || "#"}
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.product}
                        </a>
                        <a href={nav.returnPolicylink || "#"}
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.returnPolicy}
                        </a>
                        <a href={nav.Checkoutlink || "#"}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.Checkout}
                        </a>
                        <a href={nav.contactUslink || "#"}
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.contactUs}
                        </a>
                        <a href={nav.bloglink || "#"}
                            className="block text-gray-700 hover:text-blue-600 px-3 py-2">
                            {nav.blog}
                        </a>

                        {/* Mobile Language Selector */}
                        <div className="px-3 py-2">
                            <button
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                                onClick={toggleLangMenu}
                            >
                                <Globe size={20} />
                                <span>Select Language</span>
                            </button>
                            {isLangMenuOpen && (
                                <div className="mt-2 py-2 space-y-1">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleLangSelect(lang.code)}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;