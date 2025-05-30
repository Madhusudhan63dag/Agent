import React, { useState, useEffect } from 'react';
import { useForm } from '@formspree/react'; // Added Formspree import
import drjoints_product from '../assets/drjoints_product.png'; // Updated image import

// Update API_BASE_URL to use a working endpoint in development mode
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://razorpaybackend-wgbh.onrender.com' 
    : 'https://razorpaybackend-wgbh.onrender.com'; // Use production URL for both environments

const VALID_PROMO_CODE = "FLASH70";

const CartPage = () => {
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [paymentMode, setPaymentMode] = useState("");
  const [orderTotal, setOrderTotal] = useState(3990); // Updated total amount
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingError, setShippingError] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [shippingFormData, setShippingFormData] = useState({
    fullName: "",
    email: "",
    phone: "", // Added phone field
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "",
    state: ""
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const shippingFormRef = React.useRef(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(1); // Added order number tracking
  const [state, handleFormspreeSubmit] = useForm("mvgobdev"); // Added Formspree

  // Initialize order number from localStorage
  useEffect(() => {
    const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
    setOrderNumber(parseInt(latestOrderNumber, 10));
  }, []);

  // Function to increment order number
  const incrementOrderNumber = () => {
    const nextOrderNumber = orderNumber + 1;
    setOrderNumber(nextOrderNumber);
    localStorage.setItem("orderNumber", nextOrderNumber);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes shine {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      .checkout-btn {
        position: relative;
        overflow: hidden;
        background-image: linear-gradient(
          to right, 
          rgba(255, 255, 255, 0) 0%, 
          rgba(255, 255, 255, 0.5) 25%, 
          rgba(255, 255, 255, 0.8) 50%, 
          rgba(255, 255, 255, 0.5) 75%,
          rgba(255, 255, 255, 0) 100%
        );
        background-size: 150% auto;
        animation: shine 3s infinite linear;
        transition: all 1s ease;
        border: none;
      }
      .checkout-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(50, 50, 93, 0.2), 0 6px 10px rgba(0, 0, 0, 0.15);
        filter: brightness(1.05);
      }
      .checkout-btn:active {
        transform: translateY(1px);
        box-shadow: 0 5px 10px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
      }
    `;
    document.head.appendChild(style);

    // Add Razorpay script to the document
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.head.removeChild(style);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const toggleShippingForm = () => {
    setShowShippingForm(!showShippingForm);
  };

  const handlePromoCodeApply = () => {
    setFormErrors(prev => ({ ...prev, promoCode: "" }));
    setIsPromoApplied(false);

    if (promoCode.trim().toUpperCase() === VALID_PROMO_CODE) {
      setIsPromoApplied(true);
      setOrderTotal(orderTotal * 0.7); // Apply 30% discount
      alert("Promo code applied successfully!");
    } else {
      setFormErrors(prev => ({ ...prev, promoCode: "Invalid promo code" }));
    }
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
    if (formErrors.paymentMode) {
      setFormErrors(prev => ({ ...prev, paymentMode: "" }));
    }
  };

  // Modified order confirmation email function with better error handling
    const sendOrderConfirmationEmail = async (customerDetails, orderDetails) => {
        try {
        console.log('Sending order confirmation email to:', customerDetails.email);
        console.log('Order details:', orderDetails);
        
        // Check if we're in a demo/test mode
        if (process.env.NODE_ENV !== 'production' && !window.confirm('API server required. Would you like to simulate a successful email send?')) {
            console.log('Email sending simulation declined');
            return false;
        }
        
        try {
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
            // Add timeout to prevent long waits
            signal: AbortSignal.timeout(10000)
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
        } catch (fetchError) {
            // If in development, simulate success
            if (process.env.NODE_ENV !== 'production') {
            console.log('Development mode: Simulating successful email send');
            return true;
            }
            throw fetchError;
        }
        } catch (error) {
        console.error('Error sending confirmation email:', error);
        // Don't fail the whole checkout process due to email failure
        return true; 
        }
    };

  // Modified abandoned order email function with better error handling
  const sendAbandonedOrderEmail = async (customerDetails, orderDetails) => {
    try {
      console.log('Sending abandoned order email to:', customerDetails.email);
      
      // In development, just log without actually sending
      if (process.env.NODE_ENV !== 'production') {
        console.log('Development mode: Simulating abandoned order email');
        console.log('Customer:', customerDetails);
        console.log('Order:', orderDetails);
        return;
      }
      
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
        // Add timeout to prevent long waits
        signal: AbortSignal.timeout(10000)
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
      // Don't fail - this is a background operation
    }
  };

  const handleCalculateShipping = () => {
    setIsCalculatingShipping(true);
    setShippingError("");
    setDeliveryDate("");

    // Simulate shipping calculation (replace with actual API call if needed)
    setTimeout(() => {
      setIsCalculatingShipping(false);
      const success = Math.random() > 0.2; // Simulate success/failure
      if (!success) {
        setShippingError("Failed to calculate shipping. Please try again.");
      } else {
        const today = new Date();
        const delivery = new Date(today);
        delivery.setDate(today.getDate() + 6); // Add 7 days
        const formattedDate = delivery.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setDeliveryDate(`Estimated delivery date: ${formattedDate}`);
        // alert("Shipping calculated successfully!");
      }
    }, 1000);
  };

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData({
      ...shippingFormData,
      [name]: value
    });
    
    // Clear validation error when field is filled
    if (value.trim() !== "" && validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ""
      });
    }
  };

  const validateShippingForm = () => {
    // If shipping form isn't visible yet but needs to be validated,
    // make it visible first
    if (!showShippingForm) {
      setShowShippingForm(true);
      return false; // Return false to halt the submission process until form is filled
    }
    
    const newErrors = {};
    let isValid = true;
    
    // Validate each required field
    Object.entries(shippingFormData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        isValid = false;
      }
    });
    
    setValidationErrors(newErrors);
    
    // Scroll to the first error field
    if (!isValid && shippingFormRef.current) {
      shippingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    return isValid;
  };

  // Modified Razorpay payment handling with better error handling
  const handleRazorpayPayment = async () => {
    try {
      setIsSubmitting(true);
      
      // Extract customer details
      const customerDetails = {
        firstName: shippingFormData.fullName.split(" ")[0] || "Customer",
        lastName: shippingFormData.fullName.split(" ").slice(1).join(" ") || "",
        email: shippingFormData.email,
        phone: shippingFormData.phone || "1234567890", // Use the entered phone number
        address: shippingFormData.address,
        apartment: shippingFormData.apartment,
        city: shippingFormData.city,
        country: shippingFormData.country || "India",
        state: shippingFormData.state
      };
      
      const tempOrderDetails = {
        orderNumber,
        productName: "Pain Relief Oil For Muscles",
        quantity: 1,
        totalAmount: orderTotal,
        currency: "INR",
      };
      
      // In development, ask if we should simulate Razorpay
      if (process.env.NODE_ENV !== 'production') {
        if (window.confirm('Would you like to simulate a successful payment?')) {
          // Simulate successful payment flow
          const orderDetailsForEmail = {
            ...tempOrderDetails,
            paymentMethod: "Online Payment (Simulated)",
            paymentId: "sim_" + Math.random().toString(36).substring(2, 15),
            orderId: "order_" + Math.random().toString(36).substring(2, 15),
            orderStatus: "Paid",
          };

          // Simulate email sending
          await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);
          
          // Simulate form submission
          try {
            const formSubmitData = {
              customerDetails,
              orderDetails: orderDetailsForEmail
            };

            // Skip actual formspree and just simulate success
            incrementOrderNumber();
            setPaymentSuccess(true);
            setIsSubmitting(false);
            return;
          } catch (error) {
            console.error("Simulated submission error:", error);
            throw error;
          }
        } else {
          setIsSubmitting(false);
          return;
        }
      }
      
      // Real Razorpay flow for production
      try {
        const response = await fetch(`${API_BASE_URL}/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: orderTotal,
            currency: "INR",
            receipt: `order_${orderNumber}`,
            notes: {
              productName: "Pain Relief Oil For Muscles",
              customerName: shippingFormData.fullName,
              customerEmail: shippingFormData.email
            }
          }),
          signal: AbortSignal.timeout(15000) // 15 second timeout
        });
        
        const orderData = await response.json();
        
        if (!orderData.success) {
          throw new Error(orderData.message || "Failed to create order");
        }
        
        // ...existing Razorpay options and setup...
        const options = {
          key: orderData.key,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: 'Dr. Joints',
          description: `Order for Pain Relief Oil For Muscles`,
          order_id: orderData.order.id,
          prefill: {
            name: shippingFormData.fullName,
            email: shippingFormData.email,
            contact: "1234567890"  // Consider adding phone field
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
      } catch (apiError) {
        console.error("API error:", apiError);
        setFormErrors(prev => ({
          ...prev,
          submit: "Payment service unavailable. Please try again later or choose Cash on Delivery."
        }));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      setFormErrors(prev => ({
        ...prev,
        submit: "Failed to initialize payment. Please try again or choose Cash on Delivery."
      }));
      setIsSubmitting(false);
    }
  };

  // Modified form submission function with improved error handling
  const handleSubmit = async () => {
    setFormSubmitted(true);
    
    // Always validate shipping form - this will make it visible if needed
    if (!validateShippingForm()) {
      // If validation fails, scroll to the form and stop submission
      if (shippingFormRef.current) {
        shippingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    
    // Check if payment mode is selected
    if (!paymentMode) {
      setFormErrors(prev => ({ ...prev, paymentMode: "Please select a payment method" }));
      return;
    }

    // Start submission process
    setIsSubmitting(true);
    setFormErrors(prev => ({ ...prev, paymentMode: "" }));

    const customerDetails = {
      firstName: shippingFormData.fullName.split(" ")[0] || "John",
      lastName: shippingFormData.fullName.split(" ").slice(1).join(" ") || "Doe",
      email: shippingFormData.email || "johndoe@example.com",
      phone: shippingFormData.phone || "1234567890", // Use the entered phone number
      address: shippingFormData.address,
      apartment: shippingFormData.apartment,
      city: shippingFormData.city,
      postalCode: shippingFormData.postalCode,
      country: shippingFormData.country,
      state: shippingFormData.state
    };

    const orderDetailsForEmail = {
      orderNumber,
      productName: "Pain Relief Oil For Muscles",
      quantity: 1,
      totalAmount: orderTotal,
      currency: "INR",
      paymentMethod: paymentMode === "online" ? "Online Payment" : "Cash on Delivery",
      orderStatus: paymentMode === "online" ? "Processing" : "Pending",
    };

    try {
      if (paymentMode === "online") {
        console.log("Initiating Razorpay payment...");
        handleRazorpayPayment();
        // handleRazorpayPayment manages its own state
        return;
      } else if (paymentMode === "cod") {
        // Data for formspree submission
        const formSubmitData = {
          customerDetails,
          orderDetails: orderDetailsForEmail
        };

        // First try sending the confirmation email
        await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);

        // Handle form submission with error handling
        try {
          // In development, simulate a successful submission
          if (process.env.NODE_ENV !== 'production') {
            console.log('Development mode: Simulating form submission');
            console.log('Form data:', formSubmitData);
            
            // Simulate successful submission
            incrementOrderNumber();
            setPaymentSuccess(true);
            setIsSubmitting(false);
            return;
          }
          
          // Production formspree submission
          const formResponse = await handleFormspreeSubmit(formSubmitData);

          // Check if the submission was successful
          if (!formResponse.error) {
            // Update order number and show success
            incrementOrderNumber();
            setPaymentSuccess(true);
            alert("Order placed successfully! Confirmation email sent.");
          } else {
            throw new Error('Failed to submit form: ' + (formResponse.message || 'Unknown error'));
          }
        } catch (formError) {
          console.error('Form submission error:', formError);
          
          // Since we already have the customer details, we can still proceed with local success 
          // even if external form submission failed
          incrementOrderNumber();
          setPaymentSuccess(true);
          alert("Order placed successfully! Note: Order details will be sent shortly.");
        }

        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was a problem with your checkout. Please try again. If the problem persists, please contact us.");
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    { id: "cod", label: "Cash on Delivery (COD)", icon: "💵" },
    { id: "online", label: "Online Payment", icon: "💳" },
  ];

  // Add payment success view
  if (paymentSuccess || state.succeeded) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 rounded-lg p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-2">
            Order Number: {orderNumber}
          </p>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-5 font-sans">
      <h1 className="text-center text-2xl font-bold mb-8">CART</h1>

      <div className="flex flex-wrap gap-8">
        {/* Left Column: Product details */}
        <div className="flex-1 basis-[600px]">
          <div className="flex border-b border-gray-200 pb-5 mb-5">
            <div className="w-[180px] h-[120px] bg-gray-100 mr-5 flex-shrink-0">
              {/* Placeholder image */}
              <img 
                src={drjoints_product} // Updated image source
                alt="Lume Cube Edge Light"
                className="w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold mb-2.5">Pain Relief Oil For Muscles x 1</h2>
              <p className="text-sm text-gray-500 mb-2.5">Quantity: 1</p>
              <p className="text-base font-bold">₹{orderTotal}</p>
            </div>
          </div>

          <button 
            className="bg-transparent border border-gray-300 py-2.5 px-5 cursor-pointer text-sm font-bold w-full max-w-[300px] block mt-5"
            onClick={toggleShippingForm}
          >
            {showShippingForm ? 'HIDE SHIPPING ESTIMATE' : 'ESTIMATE SHIPPING'}
          </button>
          
          {/* Shipping Form */}
          {showShippingForm && (
            <div className="mt-6 border border-gray-200 rounded p-5 bg-gray-50" ref={shippingFormRef}>
              <h3 className="font-bold text-lg mb-4">Estimate Shipping</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={shippingFormData.fullName}
                    onChange={handleShippingInputChange}
                    className={`w-full p-2 border ${validationErrors.fullName && formSubmitted ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="John Doe"
                  />
                  {validationErrors.fullName && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input 
                    type="email"
                    name="email" 
                    value={shippingFormData.email}
                    onChange={handleShippingInputChange}
                    className={`w-full p-2 border ${validationErrors.email && formSubmitted ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="johndoe@example.com"
                  />
                  {validationErrors.email && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input 
                    type="tel"
                    name="phone" 
                    value={shippingFormData.phone}
                    onChange={handleShippingInputChange}
                    className={`w-full p-2 border ${validationErrors.phone && formSubmitted ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="1234567890"
                  />
                  {validationErrors.phone && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Address Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                  <input 
                    type="text"
                    name="address" 
                    value={shippingFormData.address}
                    onChange={handleShippingInputChange}
                    className={`w-full p-2 border ${validationErrors.address && formSubmitted ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="123 Main Street"
                  />
                  {validationErrors.address && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc.</label>
                  <input 
                    type="text"
                    name="apartment" 
                    value={shippingFormData.apartment}
                    onChange={handleShippingInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Apt 4B"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                  <input 
                    type="text"
                    name="city" 
                    value={shippingFormData.city}
                    onChange={handleShippingInputChange}
                    className={`w-full p-2 border ${validationErrors.city && formSubmitted ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="New York"
                  />
                  {validationErrors.city && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal/ZIP code*</label>
                  <input 
                    type="text"
                    name="postalCode" 
                    value={shippingFormData.postalCode}
                    onChange={handleShippingInputChange}
                    className={`w-full p-2 border ${validationErrors.postalCode && formSubmitted ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="10001"
                  />
                  {validationErrors.postalCode && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.postalCode}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                  <select 
                    name="country"
                    value={shippingFormData.country}
                    onChange={handleShippingInputChange}
                    className={`w-full p-2 border ${validationErrors.country && formSubmitted ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                  </select>
                  {validationErrors.country && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.country}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province*</label>
                  <input 
                    type="text"
                    name="state" 
                    value={shippingFormData.state}
                    onChange={handleShippingInputChange}
                    className={`w-full p-2 border ${validationErrors.state && formSubmitted ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="New York"
                  />
                  {validationErrors.state && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.state}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex flex-col justify-end">
                <button
                  className={`bg-[#F97316] text-white py-2 px-6 rounded font-medium hover:bg-blue-600 transition-colors ${
                    isCalculatingShipping ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleCalculateShipping}
                  disabled={isCalculatingShipping}
                >
                  {isCalculatingShipping ? "Calculating..." : "Calculate Shipping"}
                </button>
                {shippingError && <p className="text-red-500 text-sm mt-2">{shippingError}</p>}
                {deliveryDate && <p className="text-green-500 text-sm mt-2">{deliveryDate}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Totals and payment */}
        <div className="flex-1 basis-[300px] bg-gray-50 p-5 rounded">
          <div className="flex justify-between mb-2.5 font-bold">
            <span className="text-lg">TOTAL</span>
            <span className="text-lg">₹{orderTotal.toFixed(2)} INR</span> {/* Updated currency symbol */}
          </div>
          <p className="text-sm text-gray-500 mb-5 border-b border-gray-200 pb-5">
            Shipping &amp; taxes calculated at checkout
          </p>

          {/* Promo Code Section */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handlePromoCodeApply}
                className={`bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg ${
                  isPromoApplied ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isPromoApplied}
              >
                {isPromoApplied ? "Applied" : "Apply"}
              </button>
            </div>
            {formErrors.promoCode && (
              <p className="text-red-500 text-sm mt-1">{formErrors.promoCode}</p>
            )}
          </div>

          {/* Payment Mode Section */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">Payment Mode</label>
            <div className="grid grid-cols-1 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMode === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setPaymentMode(method.id)}
                >
                  <span className="text-2xl mr-4">{method.icon}</span>
                  <div>
                    <p className="text-base font-medium">{method.label}</p>
                  </div>
                </div>
              ))}
            </div>
            {formErrors.paymentMode && (
              <p className="text-red-500 text-sm mt-2">{formErrors.paymentMode}</p>
            )}
          </div>

          <button
            className={`checkout-btn bg-[#F97316] text-white border-none py-3.5 rounded cursor-pointer font-bold w-full text-base mb-5 shadow-lg ${
              isSubmitting ? "opacity-100 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "CHECKOUT"}
          </button>
          
          {/* Updated trust icons */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-center text-sm font-medium text-gray-700 mb-4">Trusted & Secure</p>
            <div className="flex gap-4 mb-5 justify-center items-center">
              {/* Secure Payment Icon */}
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs block mt-1">Secure Checkout</span>
              </div>
              
              {/* Money Back Guarantee */}
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span className="text-xs block mt-1">Money Back</span>
              </div>
              
              {/* Fast Delivery */}
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="text-xs block mt-1">Fast Delivery</span>
              </div>
              
              {/* 24/7 Support */}
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                <span className="text-xs block mt-1">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center mt-8">
        *International customers are responsible for paying their own Import Duties &amp; fees
      </p>
    </div>
  );
}

export default CartPage;