import React from 'react';

export const productSliderStyles = `
  .product-slider {
    --swiper-theme-color: #4169E1;
    --swiper-pagination-bullet-inactive-color: #CBD5E0;
    --swiper-pagination-bullet-inactive-opacity: 0.5;
  }
`;

export const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    date: "May 15, 2025",
    location: "Delhi",
    rating: 5,
    content: "The Shani Raksha Kavach has brought tremendous positive change in my life. My financial situation improved within weeks of wearing it."
  },
  {
    id: 2,
    name: "Priya Sharma",
    date: "April 28, 2025",
    location: "Mumbai",
    rating: 5,
    content: "I was facing many obstacles in my career. This blessed kavach has helped me overcome them and find success."
  },
  {
    id: 3,
    name: "Amit Patel",
    date: "May 2, 2025",
    location: "Gujarat",
    rating: 4,
    content: "After wearing this kavach, I've noticed a significant improvement in my health and overall well-being."
  }
];

export const COUNTRY_CURRENCY_MAP = {
  'India': { currency: 'INR', symbol: '₹', rate: 1 },
  'United States': { currency: 'USD', symbol: '$', rate: 0.012 },
  'United Kingdom': { currency: 'GBP', symbol: '£', rate: 0.0095 },
  'Canada': { currency: 'CAD', symbol: 'CA$', rate: 0.016 },
  'Australia': { currency: 'AUD', symbol: 'A$', rate: 0.018 },
  'UAE': { currency: 'AED', symbol: 'د.إ', rate: 0.045 },
  'Singapore': { currency: 'SGD', symbol: 'S$', rate: 0.016 }
};

export const PaymentModeSelector = ({ selectedMode, onChange, translations = {} }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-700">{translations?.checkout?.paymentMethod || 'Payment Method'} <span className="text-red-500">*</span></h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors ${selectedMode === 'cod' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}>
          <input
            type="radio"
            name="paymentMode"
            value="cod"
            checked={selectedMode === 'cod'}
            onChange={onChange}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <div className="ml-3">
            <span className="font-medium">Cash on Delivery</span>
            <p className="text-xs text-gray-500">Pay when you receive</p>
          </div>
        </label>
        
        <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors ${selectedMode === 'online' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}>
          <input
            type="radio"
            name="paymentMode"
            value="online"
            checked={selectedMode === 'online'}
            onChange={onChange}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <div className="ml-3">
            <span className="font-medium">Online Payment</span>
            <p className="text-xs text-gray-500 flex items-center">
              <span>Card, UPI, Net Banking </span>
              <span className="inline-block ml-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">15% Off</span>
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export const MobileCallButton = () => {
  return (
    <a 
      href="tel:+919908030444" 
      className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg animate-call-button"
    >
      <svg className="w-8 h-8 text-white animate-call-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>
  );
};

export const validateForm = (formData, translations = {}) => {
  const errors = {};
  
  if (!formData.firstName) {
    errors.firstName = translations?.errors?.firstName || "First name is required";
  }
  
  if (!formData.lastName) {
    errors.lastName = translations?.errors?.lastName || "Last name is required";
  }
  
  if (!formData.streetAddress) {
    errors.streetAddress = translations?.errors?.streetAddress || "Street address is required";
  }
  
  if (!formData.townCity) {
    errors.townCity = translations?.errors?.townCity || "Town/City is required";
  }
  
  if (!formData.phone) {
    errors.phone = translations?.errors?.phone || "Phone number is required";
  }
  
  if (!formData.email) {
    errors.email = translations?.errors?.email || "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = translations?.errors?.emailValid || "Email is invalid";
  }
  
  if (!formData.paymentMode) {
    errors.paymentMode = translations?.errors?.paymentMode || "Please select a payment method";
  }
  
  return errors;
};

export const handleSubmit = () => {
  // Placeholder function
  console.log("Form submitted");
};

export const handleRazorpayPayment = () => {
  // Placeholder function
  console.log("Razorpay payment initiated");
};