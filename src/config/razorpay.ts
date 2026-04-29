export const RAZORPAY_CONFIG = {
  key: process.env.REACT_APP_RAZORPAY_KEY_ID || '',
  amount: 0, // This will be set dynamically
  currency: 'INR',
  name: 'Ant Courses',
  description: 'Course Registration Payment',
  image: '/logo.png',
  prefill: {
    name: '',
    email: '',
    contact: '',
  },
  theme: {
    color: '#3399cc',
  },
  modal: {
    ondismiss: () => {
      console.log('Payment modal dismissed');
    }
  }
}; 