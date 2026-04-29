import { RAZORPAY_CONFIG } from '../config/razorpay';
import { PaymentResponse } from '../interfaces/Payment';
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpay = async (
  amount: number, 
  userData: any,
  onSuccess: (response: PaymentResponse) => void,
  onError: (error: any) => void
) => {
  try {
    // Configure Razorpay
    const options = {
      ...RAZORPAY_CONFIG,
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
        // Handle successful payment
        console.log('Payment successful:', response);
        onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal dismissed');
          onError(new Error('Payment cancelled by user'));
        }
      }
    };

    // Open Razorpay checkout
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Razorpay initialization failed:', error);
    onError(error);
  }
}; 