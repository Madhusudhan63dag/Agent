import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '@formspree/react';
import product from '../assets/product.png';
import product1 from '../assets/product1.jpeg';
import product2 from '../assets/product2.png';
import visa from '../assets/visa.svg';  // You'll need to add these images
import mastercard from '../assets/mastercard.svg';
import rupay from '../assets/upi-id.svg';
import razorpay from '../assets/paypal.svg';
import AwardsSection from '../components/Awaid';
// import secure from '';

const PAYMENT_IMAGES = {
    visa: "../assets/visa.svg",
    mastercard: "../assets/mastercard.svg",
    rupay: "../assets/amex.svg",
    razorpay: "https://razorpay.com/assets/razorpay-glyph.svg",
    secure: "https://cdn-icons-png.flaticon.com/512/6195/6195702.png",
    pci: "https://cdn-icons-png.flaticon.com/512/6107/6107137.png",
    ssl: "https://cdn-icons-png.flaticon.com/512/7947/7947657.png"
};

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1 }
};

const DEFAULT_COUNTRY = 'India';
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY];
const VALID_PROMO_CODE = "FLASH70";



const Checkout_two = ({ translations, currentLang }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [promoCode, setPromoCode] = useState("");
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [state, handleFormspreeSubmit] = useForm("mvgobdev");
    const [orderNumber, setOrderNumber] = useState(1); // Initial order number
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const productPrice = 3990; // Discounted price per unit
    const originalPrice = 6990; // Original price per unit
    const productImages = [product1, product2];


    useEffect(() => {
        // Simulate fetching the latest order number from the backend
        const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
        setOrderNumber(parseInt(latestOrderNumber, 10));
    }, []);
    const incrementOrderNumber = () => {
        const nextOrderNumber = orderNumber + 1;
        setOrderNumber(nextOrderNumber);
        localStorage.setItem("orderNumber", nextOrderNumber); // Persist order number locally
    };
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: DEFAULT_COUNTRY,
        streetAddress: '',
        apartment: '',
        townCity: '',
        phone: '',
        email: '',
        paymentMode: ''
    });
    // Update currency and convert amount when country changes
    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Convert amount from INR to selected currency
            const baseAmount = orderDetails.totalAmount; // Total amount in INR
            const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails]);
    // Original useEffects for initialization and script loading...
    useEffect(() => {
        // Initialize orderDetails with default values
        setOrderDetails({
            quantity: quantity,
            totalAmount: quantity * productPrice,
            productName: 'Pain Relief Oil For Muscles',
            unitPrice: productPrice
        });

        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [quantity]); // Add quantity as dependency

    // Update orderDetails whenever quantity changes
    useEffect(() => {
        setOrderDetails(prev => ({
            ...prev,
            quantity: quantity,
            totalAmount: quantity * productPrice
        }));
    }, [quantity]);
    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.country.trim()) errors.country = 'Country is required';
        if (!formData.streetAddress.trim()) errors.streetAddress = 'Street address is required';
        if (!formData.townCity.trim()) errors.townCity = 'Town/City is required';

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.paymentMode) errors.paymentMode = 'Please select a payment mode';

        return errors;
    };
    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            let baseAmount = orderDetails.totalAmount; // Total amount in INR
            let discountPercentage = 10;

            // Apply 10% discount for online payment
            if (formData.paymentMode === 'online') {
                baseAmount *= (1 - discountPercentage / 100);
            }

            const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails, formData.paymentMode]);
    const handlePromoCodeApply = () => {
        if (promoCode.trim().toUpperCase() === VALID_PROMO_CODE) {
            setIsPromoApplied(true);
            setFormErrors(prev => ({ ...prev, promoCode: "" }));
        } else {
            setIsPromoApplied(false);
            setFormErrors(prev => ({ ...prev, promoCode: "Invalid promo code" }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                if (formData.paymentMode === 'online') {
                    handleRazorpayPayment();
                } else if (formData.paymentMode === 'cod') {
                    // Prepare the data for COD orders
                    const formSubmitData = {
                        customerDetails: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            address: formData.streetAddress,
                            apartment: formData.apartment,
                            city: formData.townCity,
                            country: formData.country,
                        },
                        orderDetails: {
                            orderNumber, // Add order number
                            productName: orderDetails.productName,
                            quantity: orderDetails.quantity,
                            totalAmount: convertedAmount, // Use the discounted amount
                            paymentMethod: "Cash on Delivery",
                            orderStatus: "Pending",
                        },
                    };

                    // Make sure to await the Formspree submission
                    const formResponse = await handleFormspreeSubmit(formSubmitData);

                    // Check if the submission was successful
                    if (formResponse && !formResponse.error) {
                        setPaymentSuccess(true);
                    } else {
                        throw new Error('Failed to submit form to Formspree');
                    }

                    setIsSubmitting(false);
                }
            } catch (error) {
                console.error('Submission error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: 'Failed to process order. Please try again.'
                }));
                setIsSubmitting(false);
            }
        }
    };
    const renderFormField = (name, label, type = "text", required = true) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${formErrors[name] ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors[name] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
            )}
        </div>
    );
    const handleRazorpayPayment = () => {
        const options = {
            key: 'rzp_live_tGJjXr7rvi6keg',
            amount: convertedAmount * 100,
            currency: currentCurrency.currency,
            name: 'Your Company Name',
            description: `Order for ${orderDetails.productName}`,
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            handler: async function (response) {
                try {
                    const formSubmitData = {
                        customerDetails: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            address: formData.streetAddress,
                            apartment: formData.apartment,
                            city: formData.townCity,
                            country: formData.country,
                        },
                        orderDetails: {
                            orderNumber, // Add order number
                            productName: orderDetails.productName,
                            quantity: orderDetails.quantity,
                            totalAmount: convertedAmount, // Use the discounted amount
                            currency: currentCurrency.currency,
                            paymentMethod: "Online Payment (Razorpay)",
                            paymentId: response.razorpay_payment_id,
                            orderStatus: "Paid",
                        },
                    };

                    const formResponse = await handleFormspreeSubmit(formSubmitData);

                    if (formResponse && !formResponse.error) {
                        incrementOrderNumber(); // Increment order number after successful submission
                        setPaymentSuccess(true);
                    } else {
                        throw new Error("Failed to submit form to Formspree");
                    }

                    setIsSubmitting(false);
                } catch (error) {
                    console.error("Order submission error:", error);
                    setFormErrors(prev => ({
                        ...prev,
                        submit: "Payment successful but failed to send order details. Please contact support.",
                    }));
                    setIsSubmitting(false);
                }
            },
            modal: {
                ondismiss: function () {
                    setIsSubmitting(false);
                }
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };
    const PaymentModeSelector = ({ selectedMode, onChange }) => (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
                {translations[currentLang].checkout.mode}<span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200">
                    <input
                        type="radio"
                        name="paymentMode"
                        value="online"
                        checked={selectedMode === 'online'}
                        onChange={(e) => onChange({ target: { name: 'paymentMode', value: e.target.value } })}
                        className="h-5 w-5 text-blue-600"
                    />
                    <div className="ml-4">
                        <span className="font-medium text-gray-900">Pay Securely Online</span>
                        <p className="text-sm text-green-600">Get 10% instant discount</p>
                    </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200">
                    <input
                        type="radio"
                        name="paymentMode"
                        value="cod"
                        checked={selectedMode === 'cod'}
                        onChange={(e) => onChange({ target: { name: 'paymentMode', value: e.target.value } })}
                        className="h-5 w-5 text-blue-600"
                    />
                    <div className="ml-4">
                        <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
                        <p className="text-sm text-gray-500">Pay when you receive</p>
                    </div>
                </label>
            </div>
        </div>
    );

    const renderOrderSummary = () => (
        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">{translations[currentLang].checkout.product}</span>
                    <span className="text-gray-600">{translations[currentLang].checkout.subtotal}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">{orderDetails?.productName}</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            x{orderDetails?.quantity}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="line-through text-gray-400 text-sm">
                            {currentCurrency.symbol} {(6990 * orderDetails.quantity * currentCurrency.rate).toFixed(2)}
                        </span>
                        <span className="block font-medium text-gray-900">
                            {currentCurrency.symbol} {convertedAmount}
                        </span>
                    </div>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="flex justify-between items-center py-3 border-t border-gray-200">
                <span className="font-medium text-gray-700">{translations[currentLang].checkout.shipping}</span>
                <div className="text-right">
                    <span className="text-green-600 font-medium">Free</span>
                    <span className="block text-sm text-gray-500">Delivery within 5-7 business days</span>
                </div>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center py-4 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-800">{translations[currentLang].checkout.total}</span>
                <span className="text-lg font-bold text-blue-600">
                    {currentCurrency.symbol} {convertedAmount}
                </span>
            </div>

            {/* Payment Mode Selection */}
            <div className="mt-6">
                <PaymentModeSelector
                    selectedMode={formData.paymentMode}
                    onChange={handleInputChange}
                />
                {formErrors.paymentMode && (
                    <p className="text-red-500 text-sm mt-2">{formErrors.paymentMode}</p>
                )}
            </div>

            {/* Discount Banner */}
            <div className="mt-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🎉</span>
                    <p className="text-center font-medium">
                        Enjoy a 10% discount when you prepay online! ✨
                    </p>
                </div>
            </div>

            {/* Secure Payment Section */}
            {/* ...existing secure payment partners code... */}

            {/* Submit Button */}
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-4 px-6 rounded-xl
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {translations[currentLang].checkout.processing}
                    </div>
                ) : (
                    translations[currentLang].checkout.order
                )}
            </button>
        </div>
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (!orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (paymentSuccess || state.succeeded) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className="bg-green-50 rounded-lg p-8 border border-green-200">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                        {translations[currentLang].checkout.successfully}
                    </h2>
                    <p className="text-gray-600 mb-2">
                        {translations[currentLang].checkout.orderNumber}: {orderNumber}
                    </p>
                    <p className="text-gray-600 mb-6">
                        {translations[currentLang].checkout.thank}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        {translations[currentLang].checkout.continue}
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section with Enhanced Design */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 mb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        {translations[currentLang].checkout.title}
                    </h1>
                    <p className="text-center text-blue-100 max-w-2xl mx-auto">
                        Complete your purchase securely with our trusted payment options
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-12">
                {/* Product Selection Section with Glass Morphism */}
                <div className='flex flex-col md:flex-row items-start gap-8 mb-12'>
                    <div className="w-full bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white border-opacity-20">
                        <div className="mb-8 w-full">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Product Images Section - Fixed sizing */}
                                <div className="md:w-1/2 space-y-4">
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={productImages[selectedImage]}
                                            alt="DR. Joints Pain Relief Oil"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 gap-3">
                                        {productImages.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`aspect-square border-2 rounded-lg overflow-hidden
                                                    ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}
                                                    hover:border-blue-300 transition-colors duration-200`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Product view ${index + 1}`}
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Info Section - Better spacing */}
                                <div className="md:w-1/2 flex flex-col justify-start space-y-6 p-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-xl font-bold text-gray-800 flex items-center gap-4 mb-2">
                                            <span className="line-through text-red-500">₹ {originalPrice}</span>
                                            <span className="text-green-600 text-2xl">₹ {productPrice}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Limited time offer</p>
                                    </div>

                                    <div className="space-y-4">
                                        <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                                            {translations[currentLang].productpage.secondtitle}
                                        </label>
                                        <div className="flex items-center">
                                            <div className="flex items-center bg-white shadow-md rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-200">
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-xl font-medium rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    min="1"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                    className="w-16 px-3 py-2 text-center text-gray-700 font-medium border-x border-gray-200 focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity(prev => prev + 1)}
                                                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-xl font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {quantity > 1 && (
                                                <span className="ml-4 text-sm text-green-600 font-medium animate-fade-in">
                                                    {quantity} items selected
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AwardsSection />

                {/* Main Checkout Grid with Enhanced Styling */}
                <div className="grid lg:grid-cols-2 gap-12 mt-12">
                    {/* Billing Details Section */}
                    <div className="space-y-8">
                        <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white border-opacity-20 transition-all duration-300 hover:shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {translations[currentLang].checkout.sectitle}
                                </h2>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {renderFormField("firstName", translations[currentLang].checkout.firstname)}
                                    {renderFormField("lastName", translations[currentLang].checkout.lastname)}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {translations[currentLang].checkout.country}<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                                            <option key={country} value={country}>
                                                {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {renderFormField("streetAddress", translations[currentLang].checkout.address)}
                                {renderFormField("apartment", translations[currentLang].checkout.clientaddress, "text", false)}
                                {renderFormField("townCity", translations[currentLang].checkout.city)}
                                {renderFormField("phone", translations[currentLang].checkout.phone, "tel")}
                                {renderFormField("email", translations[currentLang].checkout.email, "email")}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div>
                        <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white border-opacity-20 sticky top-4 transition-all duration-300 hover:shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {translations[currentLang].checkout.order}
                                </h2>
                            </div>
                            {renderOrderSummary()}
                        </div>
                    </div>
                </div>

                {/* Trust Badges Section */}
                <div className="mt-16 text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
                            <div className="text-3xl mb-2">🔒</div>
                            <h3 className="font-semibold">Secure Payment</h3>
                            <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                        </div>
                        <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
                            <div className="text-3xl mb-2">🚚</div>
                            <h3 className="font-semibold">Fast Delivery</h3>
                            <p className="text-sm text-gray-600">5-7 business days</p>
                        </div>
                        <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
                            <div className="text-3xl mb-2">💯</div>
                            <h3 className="font-semibold">Money Back</h3>
                            <p className="text-sm text-gray-600">30-day guarantee</p>
                        </div>
                        <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
                            <div className="text-3xl mb-2">🎉</div>
                            <h3 className="font-semibold">Special Offers</h3>
                            <p className="text-sm text-gray-600">Regular discounts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout_two;