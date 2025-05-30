import React, { useState } from 'react';
import product from '../assets/product_icons.png'

const Checkout_test2 = () => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-8 border-b pb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <img src="/logo.png" alt="Dr. Joints Logo" className="h-10" />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:flex-1 space-y-6">
            {/* Contact Section */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Email address" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" /> 
                  Keep me updated with offers and new products
                </label>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
                  <input 
                    type="tel" 
                    id="mobile" 
                    placeholder="For delivery updates" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
              </div>
            </section>

            {/* Delivery Section */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                  <select 
                    id="country" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company (optional)</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">Apartment/Suite (optional)</label>
                  <input 
                    type="text" 
                    id="apartment" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select 
                    id="state" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select State</option>
                    <option value="AP">Andhra Pradesh</option>
                    <option value="DL">Delhi</option>
                    <option value="KA">Karnataka</option>
                    <option value="MH">Maharashtra</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="UP">Uttar Pradesh</option>
                    {/* Add more state options */}
                  </select>
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                  <input 
                    type="text" 
                    id="zip" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
              </div>
            </section>

            {/* Shipping Method Section */}
            {/* <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Method</h2>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="shipping" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                  <span className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">Standard Delivery</span>
                    <span className="block text-sm text-gray-500">3-5 business days</span>
                  </span>
                  <span className="ml-auto font-medium">Free</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="shipping" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">Express Delivery</span>
                    <span className="block text-sm text-gray-500">1-2 business days</span>
                  </span>
                  <span className="ml-auto font-medium">₹100</span>
                </label>
              </div>
            </section> */}

            {/* Payment Section */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="razorpay" 
                    checked={paymentMethod === 'razorpay'} 
                    onChange={() => setPaymentMethod('razorpay')} 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" 
                  />
                  <span className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">Razorpay</span>
                    <span className="block text-sm text-gray-500">Pay securely with credit/debit card or UPI</span>
                  </span>
                  <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-8 ml-auto" />
                </label>
                
                <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')} 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" 
                  />
                  <span className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">Cash on Delivery</span>
                    <span className="block text-sm text-gray-500">Pay when you receive your order</span>
                  </span>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
              
              {/* Product List */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-4 pb-4 border-b">
                  <img src={product} alt="AirTag Cash Strap" className="w-24 h-16 rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Pain Relief Oil For Muscles</h4>
                    <p className="text-sm text-gray-500">Qty: 1</p>
                    <div className="mt-1 flex items-center">
                      <span className="text-lg font-medium">₹3,990</span>
                      <span className="ml-2 text-sm line-through text-gray-500">₹6,990</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Discount Code */}
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  placeholder="Discount Code" 
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                />
                <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Apply
                </button>
              </div>
              
              {/* Price Details */}
              <div className="space-y-2 py-4 border-t border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹3,990</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹0</span>
                </div>
              </div>
              
              {/* Total */}
              <div className="flex justify-between pt-4 mb-6">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">₹3,990</span>
              </div>
              
              {/* Benefits */}
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Genuine Products Guaranteed
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    15-Day Easy Return Policy
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Fast & Free Shipping
                  </li>
                </ul>
              </div>
              
              {/* Place Order Button */}
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-medium text-lg transition-colors">
                Place Order
              </button>
              
              {/* Footer Links */}
              <div className="flex justify-center text-xs text-gray-500 space-x-4 mt-6">
                <a href="/refund-policy" className="hover:text-gray-700">Refund Policy</a>
                <a href="/privacy-policy" className="hover:text-gray-700">Privacy Policy</a>
                <a href="/terms-of-service" className="hover:text-gray-700">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout_test2;