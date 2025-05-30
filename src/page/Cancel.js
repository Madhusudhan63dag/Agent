import React from 'react';

const CancelPolicy = () => {
    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Cancellation Policy</h1>
                <p className="text-gray-700 mb-4">Last Updated: December 2024</p>

                <h2 className="text-2xl font-semibold mb-4">1. Cancellation Period</h2>
                <p className="text-gray-700 mb-4">• Orders can be canceled within 24 hours of placing the order.</p>
                <p className="text-gray-700 mb-4">• After 24 hours, we begin processing and shipping your order, and cancellations will not be possible.</p>

                <h2 className="text-2xl font-semibold mb-4">2. How to Cancel Your Order</h2>
                <p className="text-gray-700 mb-4">To cancel your order, please follow these steps:</p>
                <ol className="list-decimal list-inside mb-4">
                    <li className="text-gray-700 mb-2">Contact Us Immediately: Reach out to our customer support team at +919908016333 within 24 hours of your order.</li>
                    <li className="text-gray-700 mb-2">Provide Order Details: Include your order number and reason for cancellation in your message to help us process your request faster.</li>
                </ol>

                <h2 className="text-2xl font-semibold mb-4">3. Cancellations Post-Shipping</h2>
                <p className="text-gray-700 mb-4">• If your order has already been shipped, we will not be able to cancel it. In this case, you may return the product after receiving it.</p>
                <p className="text-gray-700 mb-4">• To initiate a return, please refer to our Return Policy for further instructions.</p>

                <h2 className="text-2xl font-semibold mb-4">4. Refund Process</h2>
                <p className="text-gray-700 mb-4">• Full Refunds: If your cancellation request is processed before the product is shipped, you will receive a full refund.</p>
                <p className="text-gray-700 mb-4">• Partial Refunds: If you cancel the order after the product has been shipped, the cost of the product will be refunded with less shipping charges, once we receive the returned item in its original condition.</p>

                <h2 className="text-2xl font-semibold mb-4">5. Non-Cancellable Conditions</h2>
                <p className="text-gray-700 mb-4">• Opened/Used Products: Once the product has been opened or used, cancellations will not be accepted. Please check the product carefully upon delivery.</p>
                <p className="text-gray-700 mb-4">• Special Promotions or Offers: Orders placed under special promotions or discounts may be subject to different cancellation terms, which will be specified during the purchase process.</p>

                <p className="text-gray-700 mb-4">We aim to provide a seamless experience, and our customer service team is here to assist you with any issues you may encounter.</p>
                <p className="text-gray-700">Thank you for choosing Dr. Joints Pain Relief Oil. We appreciate your understanding and support!</p>
            </div>
        </div>
    );
};

export default CancelPolicy;
