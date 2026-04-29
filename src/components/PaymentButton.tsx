import React, { useEffect, useState } from 'react';
import { initializeRazorpay, openRazorpay } from '../services/payment';
import { PaymentResponse } from '../interfaces/Payment';

interface PaymentButtonProps {
  amount: number;
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: any) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  userData,
  onSuccess,
  onError,
}) => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    const loadRazorpay = async () => {
      const loaded = await initializeRazorpay();
      setIsRazorpayLoaded(Boolean(loaded));
    };
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    try {
      if (!isRazorpayLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // Configure Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Ant Courses',
        description: 'Course Registration Payment',
        image: '/logo.png',
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
        handler: (response: PaymentResponse) => {
          if (onSuccess) {
            onSuccess(response);
          }
        },
        modal: {
          ondismiss: () => {
            if (onError) {
              onError(new Error('Payment cancelled by user'));
            }
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment failed:', error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!isRazorpayLoaded}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isRazorpayLoaded ? 'Pay Now' : 'Loading...'}
    </button>
  );
};

export default PaymentButton; 