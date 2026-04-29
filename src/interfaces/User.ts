export interface User {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  courseId?: string;
  courseTitle?: string;
  coursePrice?: number;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  orderId?: string;
  registeredOn?: Date;
} 