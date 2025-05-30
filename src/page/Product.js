import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import product from '../assets/product.png';
import product1 from '../assets/product1.jpeg';
import product2 from '../assets/product2.png';
import amazon from '../assets/amazon.png';

const Product = ({ translations, currentLang }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const productPrice = 3990; // Discounted price per unit
    const originalPrice = 6990; // Original price per unit

    const handleCheckout = () => {
        navigate('/checkout', {
            state: {
                quantity,
                totalAmount: quantity * productPrice,
                productName: 'Pain Relief Oil For Muscles',
                unitPrice: productPrice
            }
        });
    };

    const productImages = [product, product1, product2, product];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-12">
                {translations[currentLang].productpage.title}
            </h1>

            {/* Trust Indicators Banner */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8 border border-green-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-gray-800">100% Natural Ingredients</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-gray-800">Clinically Tested</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        <span className="font-semibold text-gray-800">10,000+ Happy Customers</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Product Images Section */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={productImages[selectedImage]}
                            alt="DR. Joints Pain Relief Oil"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="grid grid-cols-4 gap-2">
                        {productImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Product view ${index + 1}`}
                                    className="w-full h-auto object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="space-y-8">
                    {/* Availability Section */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-bold text-gray-800">Available on Multiple Platforms</h3>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">In Stock</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                                        <img src={amazon} alt="Amazon Logo" className="h-10 w-10" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Amazon India</p>
                                        <p className="text-sm text-gray-600">Fast delivery available</p>
                                    </div>
                                </div>
                                <a 
                                    href="https://www.amazon.in/Dr-Joints-Relief-Muscle-Muscles-Stress/dp/B0BLYHKJWB/ref=sr_1_1_sspa?crid=1B72Y8L8SA326&dib=eyJ2IjoiMSJ9.mrDgKwaYgLGF0L21kbU4oaudtOe2E6susg0oT9w7ZiiQZ6HKsj4fax3w_ODQnkU3LkwjrVeHV8EQDoox0FhivrUHJNjl_6tmLQ9NWFjB9GA3a_xhV0a5CN7XmWVfREN1r_WKtFY-EtitI51XTvrwtFMstYPtf5q3qFrKJAhoo30_kFFDC_D7tfwoWUxtQUm2dt8upvWegomg8vXywicVJulWkNZjUcTG5CsbZWI22LvClkm6P1_OSNGN46d9ZWBnEAHJIhY8PFetmwiCmDPJPQouFXNnhoQ1I3Ba-_uZNHc.Sw97rwGSg_pBsn47BCnq56bo1dB5VDhzbBSojYtu1i8&dib_tag=se&keywords=dr+joints&nsdOptOutParam=true&qid=1748414833&sprefix=drjoints%2Caps%2C231&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1" 
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                                >
                                    View on Amazon
                                </a>
                            </div>
                            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Direct from Dr. Joints</p>
                                        <p className="text-sm text-gray-600">Best price & exclusive offers</p>
                                    </div>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Recommended</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="prose max-w-none">
                        <p className="text-gray-700 mb-6">
                            {translations[currentLang].productpage.content}
                        </p>
                    </div>

                    {/* Price Section */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-gray-800 flex items-center space-x-4 mb-2">
                            <span className="line-through text-red-500">₹ {originalPrice}</span>
                            <span className="text-green-600">₹ {productPrice}</span>
                            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">43% OFF</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Online payment can have a 10% discount.</p>
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-green-600 font-medium">Free shipping on all orders</span>
                        </div>
                    </div>

                    {/* Quantity and Buy Button */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <label htmlFor="quantity" className="mr-2 text-gray-700">{translations[currentLang].productpage.secondtitle}</label>
                            <input
                                type="number"
                                id="quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="w-16 px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            {translations[currentLang].productpage.buy}
                        </button>
                    </div>

                    {/* Customer Reviews Summary */}
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                            <span className="font-semibold text-gray-800">4.8/5</span>
                            <span className="text-sm text-gray-600">(2,847 reviews)</span>
                        </div>
                        <p className="text-sm text-gray-700">"Excellent results for joint pain relief" - Most common review</p>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {translations[currentLang].features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className={`p-2 rounded-full bg-gray-100 ${feature.color}`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <span className="font-medium">{feature.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;