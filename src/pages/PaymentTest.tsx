import React, { useState } from 'react';
import PaymentButton from '../components/PaymentButton';
import { PaymentResponse } from '../interfaces/Payment';

const PaymentTest: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [userData, setUserData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    phone: '9876543210'
  });
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const handlePaymentSuccess = (response: PaymentResponse) => {
    console.log('Payment successful:', response);
    setPaymentStatus(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentStatus(`Payment failed: ${error.message}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Test Payment</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount (INR)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-center mb-6">
          <PaymentButton
            amount={amount}
            userData={userData}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>

        {paymentStatus && (
          <div className={`p-4 rounded ${
            paymentStatus.includes('successful') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {paymentStatus}
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-bold mb-2">Test Card Details:</h3>
          <ul className="list-disc pl-5">
            <li>Card Number: 4111 1111 1111 1111</li>
            <li>Expiry: Any future date</li>
            <li>CVV: Any 3 digits</li>
            <li>Name: Any name</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentTest; 