import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const orderData = location.state?.orderData || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
            <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Thank You for Your Order!</h2>
          <p className="mt-2 text-lg text-gray-600">
            Your order has been successfully placed.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
            <p className="mt-1 text-sm text-gray-500">
              Order number: #{orderData.orderNumber}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderData.customerName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Product</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderData.productName} (x{orderData.quantity})</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderData.amount || `${orderData.currency} ${orderData.totalAmount}`}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderData.paymentMethod}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderData.shippingAddress}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="mt-10">
          <Link to="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;