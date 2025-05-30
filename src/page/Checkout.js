import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '@formspree/react';

// API base URL that works in both development and production environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://razorpaybackend-wgbh.onrender.com' // Use your actual production backend URL https://razorpaybackend-wgbh.onrender.com
    : 'http://localhost:5000';

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1 }
};

const DEFAULT_COUNTRY = 'India';
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY];
const VALID_PROMO_CODE = "FLASH70";

const Checkout = ({ translations, currentLang }) => {
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
        if (!location.state) {
            navigate('/product');
            return;
        }
        setOrderDetails(location.state);

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [location.state, navigate]);

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

    // Send order confirmation email
    const sendOrderConfirmationEmail = async (customerDetails, orderDetails) => {
        try {
            console.log('Sending order confirmation email to:', customerDetails.email);
            console.log('Order details:', orderDetails);
            
            const response = await fetch(`${API_BASE_URL}/send-order-confirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerEmail: customerDetails.email,
                    customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                    customerPhone: customerDetails.phone,
                    customerDetails,
                    orderDetails
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                console.error('Failed to send confirmation email:', data.message);
                return false;
            } else {
                console.log('Confirmation email sent successfully');
                return true;
            }
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            return false;
        }
    };

    // Send abandoned order email notification
    const sendAbandonedOrderEmail = async (customerDetails, orderDetails) => {
        try {
            console.log('Sending abandoned order email to:', customerDetails.email);
            
            const response = await fetch(`${API_BASE_URL}/send-abandoned-order-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerEmail: customerDetails.email,
                    customerDetails,
                    orderDetails
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                console.error('Failed to send abandoned order email:', data.message);
            } else {
                console.log('Abandoned order email sent successfully');
            }
        } catch (error) {
            console.error('Error sending abandoned order email:', error);
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
                    const customerDetails = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.streetAddress,
                        apartment: formData.apartment,
                        city: formData.townCity,
                        country: formData.country,
                    };
                    
                    const orderDetailsForEmail = {
                        orderNumber,
                        productName: orderDetails.productName,
                        quantity: orderDetails.quantity,
                        totalAmount: convertedAmount,
                        currency: currentCurrency.currency,
                        paymentMethod: "Cash on Delivery",
                        orderStatus: "Pending",
                    };

                    // Data for formspree submission
                    const formSubmitData = {
                        customerDetails,
                        orderDetails: orderDetailsForEmail
                    };

                    // First try sending the confirmation email
                    const emailSent = await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);
                    
                    if (!emailSent) {
                        console.log('Email failed, proceeding with form submission anyway');
                        // Consider notifying the user that email might not have been sent
                    }

                    // Make sure to await the Formspree submission
                    const formResponse = await handleFormspreeSubmit(formSubmitData);

                    // Check if the submission was successful
                    if (formResponse && !formResponse.error) {
                        // Update order number and show success
                        incrementOrderNumber();
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

    const handleRazorpayPayment = async () => {
        try {
            setIsSubmitting(true);
            
            // Store customer details for potential abandoned order emails
            const customerDetails = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.streetAddress,
                apartment: formData.apartment,
                city: formData.townCity,
                country: formData.country,
            };
            
            const tempOrderDetails = {
                orderNumber,
                productName: orderDetails.productName,
                quantity: orderDetails.quantity,
                totalAmount: convertedAmount,
                currency: currentCurrency.currency,
            };
            
            // First create order on server
            const response = await fetch(`${API_BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: convertedAmount,
                    currency: currentCurrency.currency,
                    receipt: `order_${orderNumber}`,
                    notes: {
                        productName: orderDetails.productName,
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        customerEmail: formData.email
                    }
                }),
            });
            
            const orderData = await response.json();
            
            if (!orderData.success) {
                throw new Error(orderData.message || "Failed to create order");
            }
            
            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'Dr. Joints',
                description: `Order for ${orderDetails.productName}`,
                order_id: orderData.order.id,
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                handler: async function (response) {
                    try {
                        // Verify payment on server
                        const verifyResponse = await fetch(`${API_BASE_URL}/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }),
                        });
                        
                        const verifyData = await verifyResponse.json();
                        
                        if (!verifyData.success) {
                            throw new Error("Payment verification failed");
                        }
                        
                        // Order details for email - add payment info
                        const orderDetailsForEmail = {
                            ...tempOrderDetails,
                            paymentMethod: "Online Payment (Razorpay)",
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            orderStatus: "Paid",
                        };

                        // Send email confirmation immediately after payment verification
                        try {
                            await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);
                            console.log("Order confirmation email sent after successful payment");
                        } catch (emailError) {
                            console.error("Failed to send order confirmation email:", emailError);
                        }

                        // Proceed with form submission regardless of email status
                        const formSubmitData = {
                            customerDetails,
                            orderDetails: orderDetailsForEmail
                        };

                        const formResponse = await handleFormspreeSubmit(formSubmitData);

                        if (formResponse && !formResponse.error) {
                            incrementOrderNumber();
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
                        // Send abandoned order email when customer dismisses payment modal
                        console.log("Payment modal dismissed - sending abandoned order email");
                        sendAbandonedOrderEmail(customerDetails, {
                            ...tempOrderDetails,
                            orderStatus: "Abandoned",
                            paymentMethod: "Online Payment (Abandoned)"
                        });
                        setIsSubmitting(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment initialization error:", error);
            setFormErrors(prev => ({
                ...prev,
                submit: "Failed to initialize payment. Please try again."
            }));
            setIsSubmitting(false);
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

    const renderOrderSummary = () => (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6" >
                {translations[currentLang].checkout.order}
            </h2>

            {/* Trust Indicators */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-green-800">Secure Checkout</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Also available on Amazon</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Money-back guarantee</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between py-2 border-t border-gray-200">
                    <label className="text-gray-700">
                        Promo Code
                    </label>
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={handlePromoCodeApply}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
                    >
                        Apply
                    </button>
                </div>
                {formErrors.promoCode && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.promoCode}</p>
                )}

                {/* Alternative Purchase Options */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Alternative Purchase Options</h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.12 2.06L7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8H14.5l1.76-5.24c.15-.45-.24-.81-.69-.81-.23 0-.45.09-.61.24z"/>
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700">Amazon Prime eligible</span>
                            </div>
                            <a href="#" className="text-xs text-orange-600 underline">View on Amazon</a>
                        </div>
                        <p className="text-xs text-gray-600">Same product, multiple trusted platforms</p>
                    </div>
                </div>

                {/* Rest of the order summary */}
                <div className="flex justify-between py-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">
                        {translations[currentLang].checkout.total}
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                        {currentCurrency.symbol} {convertedAmount}
                    </span>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between font-medium pb-4 border-b border-gray-200">
                    <span className="text-gray-600">{translations[currentLang].checkout.product}</span>
                    <span className="text-gray-600">{translations[currentLang].checkout.subtotal}</span>
                </div>

                <div className="flex justify-between py-2">
                    <span className="text-gray-700">{orderDetails?.productName} x {orderDetails?.quantity}</span>
                    <span className="text-gray-700">
                        <span className="line-through">{currentCurrency.symbol} {(6990 * orderDetails.quantity * currentCurrency.rate).toFixed(2)}</span> {currentCurrency.symbol} {convertedAmount}
                    </span>
                </div>

                <div className="flex justify-between py-2 border-t border-gray-200">
                    <span className="font-medium text-gray-700">{translations[currentLang].checkout.subtotal}</span>
                    <span className="text-gray-700">{currentCurrency.symbol} {convertedAmount}</span>
                </div>

                <div className="flex justify-between py-2 border-t border-gray-200">
                    <span className="font-medium text-gray-700">{translations[currentLang].checkout.shipping}</span>
                    <div className='flex flex-col items-end'>
                        <span className="text-green-600">Free</span>
                        <span className="text-green-600"> (Delivery within 5-7 business days)</span>
                    </div>
                </div>

                <div className="flex justify-between py-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">{translations[currentLang].checkout.total}</span>
                    <span className="text-lg font-bold text-gray-800">
                        {currentCurrency.symbol} {convertedAmount}
                    </span>
                </div>

                <div className="pt-4 space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        {translations[currentLang].checkout.mode}<span className="text-red-500">*</span>
                    </label>
                    <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Payment Method</option>
                        <option value="cod">Cash on Delivery (COD)</option>
                        <option value="online">Online Payment</option>
                    </select>
                    {formErrors.paymentMode && (
                        <p className="text-red-500 text-sm">{formErrors.paymentMode}</p>
                    )}
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg
                        transition-all duration-200 transform hover:scale-105
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

                {/* Additional Trust Elements */}
                <div className="grid grid-cols-3 gap-2 pt-4 text-center text-xs text-gray-600">
                    <div className="flex flex-col items-center">
                        <svg className="w-6 h-6 text-green-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <svg className="w-6 h-6 text-blue-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                        </svg>
                        <span>Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <svg className="w-6 h-6 text-yellow-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>4.8★ Rating</span>
                    </div>
                </div>
            </div>
        </div >
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
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
                {translations[currentLang].checkout.title}
            </h1>

            {formErrors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
                    {formErrors.submit}
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {translations[currentLang].checkout.sectitle}
                        </h2>

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

                <div>
                    {renderOrderSummary()}
                </div>
            </div>
        </div>
    );
};

export default Checkout;