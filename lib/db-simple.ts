// Simple file-based database using Vercel KV (Redis)
// No PostgreSQL needed - much simpler!

import { kv } from '@vercel/kv';

export interface Subject {
  id: string;
  name: string;
  description: string;
  price: number;
  pdf_url: string;
  created_at: string;
}

export interface Payment {
  id: string;
  student_email: string;
  subject_id: string;
  amount: number;
  transaction_id: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  created_at: string;
}

// Initialize database (create admin user)
export async function initDatabase() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'sourasantadutta@gmail.com';
    const existingAdmin = await getUserByEmail(adminEmail);
    
    if (!existingAdmin) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Loken@th7782', 10);
      
      await createUser(adminEmail, hashedPassword, 'admin');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// User functions
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await kv.get<User>(`user:${email}`);
    return user;
  } catch (error) {
    return null;
  }
}

export async function createUser(
  email: string,
  hashedPassword: string,
  role: 'admin' | 'student' = 'student'
): Promise<User> {
  const user: User = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    role,
    created_at: new Date().toISOString(),
  };
  
  await kv.set(`user:${email}`, user);
  return user;
}

// Subject functions
export async function getAllSubjects(): Promise<Subject[]> {
  try {
    const keys = await kv.keys('subject:*');
    const subjects: Subject[] = [];
    
    for (const key of keys) {
      const subject = await kv.get<Subject>(key);
      if (subject) subjects.push(subject);
    }
    
    return subjects.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    return [];
  }
}

export async function getSubjectById(id: string): Promise<Subject | null> {
  try {
    const subject = await kv.get<Subject>(`subject:${id}`);
    return subject;
  } catch (error) {
    return null;
  }
}

export async function createSubject(
  name: string,
  description: string,
  price: number,
  pdfUrl: string
): Promise<Subject> {
  const subject: Subject = {
    id: Date.now().toString(),
    name,
    description,
    price,
    pdf_url: pdfUrl,
    created_at: new Date().toISOString(),
  };
  
  await kv.set(`subject:${subject.id}`, subject);
  return subject;
}

export async function deleteSubject(id: string): Promise<void> {
  await kv.del(`subject:${id}`);
}

// Payment functions
export async function createPayment(
  studentEmail: string,
  subjectId: string,
  amount: number,
  transactionId: string
): Promise<Payment> {
  const payment: Payment = {
    id: Date.now().toString(),
    student_email: studentEmail,
    subject_id: subjectId,
    amount,
    transaction_id: transactionId,
    status: 'pending',
    created_at: new Date().toISOString(),
  };
  
  await kv.set(`payment:${payment.id}`, payment);
  
  // Add to user's payments list
  const userPayments = await kv.get<string[]>(`user_payments:${studentEmail}`) || [];
  userPayments.push(payment.id);
  await kv.set(`user_payments:${studentEmail}`, userPayments);
  
  return payment;
}

export async function getPaymentsByEmail(email: string): Promise<Payment[]> {
  try {
    const paymentIds = await kv.get<string[]>(`user_payments:${email}`) || [];
    const payments: Payment[] = [];
    
    for (const id of paymentIds) {
      const payment = await kv.get<Payment>(`payment:${id}`);
      if (payment) payments.push(payment);
    }
    
    return payments.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    return [];
  }
}

export async function getAllPayments(): Promise<Payment[]> {
  try {
    const keys = await kv.keys('payment:*');
    const payments: Payment[] = [];
    
    for (const key of keys) {
      const payment = await kv.get<Payment>(key);
      if (payment) payments.push(payment);
    }
    
    return payments.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    return [];
  }
}

export async function updatePaymentStatus(
  id: string,
  status: 'verified' | 'rejected'
): Promise<Payment | null> {
  const payment = await kv.get<Payment>(`payment:${id}`);
  if (!payment) return null;
  
  payment.status = status;
  await kv.set(`payment:${id}`, payment);
  
  return payment;
}

export async function hasAccessToSubject(email: string, subjectId: string): Promise<boolean> {
  try {
    const payments = await getPaymentsByEmail(email);
    return payments.some(p => p.subject_id === subjectId && p.status === 'verified');
  } catch (error) {
    return false;
  }
}
