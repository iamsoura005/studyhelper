import { NextResponse } from 'next/server';
import { initDatabase, createUser, getUserByEmail } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await initDatabase();

    // Create admin user if not exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@studyhelper.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await getUserByEmail(adminEmail);
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await createUser(adminEmail, hashedPassword, 'admin');
    }

    return NextResponse.json({ 
      message: 'Database initialized successfully',
      adminEmail: adminEmail
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}
