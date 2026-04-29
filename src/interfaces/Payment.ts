import { User } from './User';

export interface OrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  razorpay_payment_link_id?: string;
  razorpay_payment_link_reference_id?: string;
  razorpay_payment_link_status?: string;
  razorpay_payment_method?: string;
  razorpay_payment_method_type?: string;
  razorpay_payment_created_at?: number;
  razorpay_payment_amount?: number;
  razorpay_payment_currency?: string;
  razorpay_payment_status?: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  orderId?: string;
  paymentId?: string;
}

export type { User }; 