import { sql } from '@vercel/postgres';

export interface Subject {
  id: number;
  name: string;
  description: string;
  price: number;
  pdf_url: string;
  created_at: Date;
}

export interface Payment {
  id: number;
  student_email: string;
  subject_id: number;
  amount: number;
  transaction_id: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: Date;
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'student';
  created_at: Date;
}

// Initialize database tables
export async function initDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create subjects table
    await sql`
      CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        pdf_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create payments table
    await sql`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        student_email VARCHAR(255) NOT NULL,
        subject_id INTEGER REFERENCES subjects(id),
        amount DECIMAL(10, 2) NOT NULL,
        transaction_id VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Subject queries
export async function getAllSubjects(): Promise<Subject[]> {
  const { rows } = await sql<Subject>`SELECT * FROM subjects ORDER BY created_at DESC`;
  return rows;
}

export async function getSubjectById(id: number): Promise<Subject | null> {
  const { rows } = await sql<Subject>`SELECT * FROM subjects WHERE id = ${id}`;
  return rows[0] || null;
}

export async function createSubject(
  name: string,
  description: string,
  price: number,
  pdfUrl: string
): Promise<Subject> {
  const { rows } = await sql<Subject>`
    INSERT INTO subjects (name, description, price, pdf_url)
    VALUES (${name}, ${description}, ${price}, ${pdfUrl})
    RETURNING *
  `;
  return rows[0];
}

export async function deleteSubject(id: number): Promise<void> {
  await sql`DELETE FROM subjects WHERE id = ${id}`;
}

// Payment queries
export async function createPayment(
  studentEmail: string,
  subjectId: number,
  amount: number,
  transactionId: string
): Promise<Payment> {
  const { rows } = await sql<Payment>`
    INSERT INTO payments (student_email, subject_id, amount, transaction_id, status)
    VALUES (${studentEmail}, ${subjectId}, ${amount}, ${transactionId}, 'pending')
    RETURNING *
  `;
  return rows[0];
}

export async function getPaymentsByEmail(email: string): Promise<Payment[]> {
  const { rows } = await sql<Payment>`
    SELECT * FROM payments WHERE student_email = ${email} ORDER BY created_at DESC
  `;
  return rows;
}

export async function getAllPayments(): Promise<Payment[]> {
  const { rows } = await sql<Payment>`
    SELECT p.*, s.name as subject_name 
    FROM payments p 
    LEFT JOIN subjects s ON p.subject_id = s.id 
    ORDER BY p.created_at DESC
  `;
  return rows;
}

export async function updatePaymentStatus(
  id: number,
  status: 'verified' | 'rejected'
): Promise<Payment> {
  const { rows } = await sql<Payment>`
    UPDATE payments SET status = ${status} WHERE id = ${id} RETURNING *
  `;
  return rows[0];
}

export async function hasAccessToSubject(email: string, subjectId: number): Promise<boolean> {
  const { rows } = await sql<Payment>`
    SELECT * FROM payments 
    WHERE student_email = ${email} 
    AND subject_id = ${subjectId} 
    AND status = 'verified'
  `;
  return rows.length > 0;
}

// User queries
export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
  return rows[0] || null;
}

export async function createUser(
  email: string,
  hashedPassword: string,
  role: 'admin' | 'student' = 'student'
): Promise<User> {
  const { rows } = await sql<User>`
    INSERT INTO users (email, password, role)
    VALUES (${email}, ${hashedPassword}, ${role})
    RETURNING *
  `;
  return rows[0];
}
