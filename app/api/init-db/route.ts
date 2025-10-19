import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/db-simple';

export async function GET() {
  try {
    await initDatabase();

    return NextResponse.json({ 
      message: 'Database initialized successfully (using Vercel KV)',
      adminEmail: process.env.ADMIN_EMAIL || 'sourasantadutta@gmail.com',
      note: 'No PostgreSQL setup needed!'
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}
