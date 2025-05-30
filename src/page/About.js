import React, { useEffect } from 'react'
import FAQ from '../components/FAQ';
import { ShieldCheck, Users, Heart, Award, Check, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = ({ currentLang, translations }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const stats = [
        { number: '10K+', label: 'Happy Customers' },
        { number: '100%', label: 'Natural Ingredients' },
        { number: '15+', label: 'Years Experience' },
        { number: '24/7', label: 'Customer Support' }
    ];

    const values = [
        {
            icon: ShieldCheck,
            title: 'Quality Assurance',
            description: 'We maintain highest standards in our products'
        },
        {
            icon: Users,
            title: 'Customer First',
            description: 'Your wellness is our top priority'
        },
        {
            icon: Heart,
            title: 'Natural Care',
            description: 'Pure Ayurvedic ingredients for better health'
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'Committed to delivering the best results'
        }
    ];

    const achievements = [
        "GMP Certified Manufacturing",
        "ISO 9001:2015 Certified",
        "Expert Ayurvedic Practitioners",
        "Advanced R&D Facility"
    ];

    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section with Animated Overlay */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
                    <div className="text-center" data-aos="fade-up">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                            {translations[currentLang].about.title}
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Transforming lives through natural healing solutions with the power of Ayurveda
                        </p>
                        {/* <div className="mt-8 flex justify-center gap-4">
                            <button className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-all">
                                Learn More
                            </button>
                            <button className="px-8 py-3 border border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all">
                                Contact Us
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Mission Section with Floating Cards */}
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative" data-aos="fade-right">
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-green-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <img
                            src={translations[currentLang].aboutpage.img}
                            alt="Our mission"
                            className="relative rounded-2xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                            <p className="text-3xl font-bold text-blue-900">15+ Years</p>
                            <p className="text-gray-600">of Excellence</p>
                        </div>
                    </div>

                    <div className="space-y-8" data-aos="fade-left">
                        <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
                            Our Mission
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                            Empowering Health Through <span className="text-blue-600">Natural Solutions</span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {translations[currentLang].about.content1}
                        </p>
                        <div className="space-y-4">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section with Animation */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-2" data-aos="zoom-in" data-aos-delay={index * 100}>
                                <div className="w-16 h-16 mx-auto bg-blue-800/50 rounded-xl flex items-center justify-center mb-4">
                                    <p className="text-4xl font-bold">{stat.number}</p>
                                </div>
                                <p className="text-blue-200 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values Section with Hover Effects */}
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Core Values
                    </h2>
                    <p className="text-gray-600">
                        Built on principles that prioritize your well-being and satisfaction
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div 
                            key={index} 
                            className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <value.icon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-600 group-hover:text-gray-900 transition-colors">{value.description}</p>
                            <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-sm font-medium">Learn more</span>
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 py-24">
                <FAQ currentLang={currentLang} translations={translations} />
            </div>
        </div>
    );
};

export default About;