import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllSubjects, createSubject, deleteSubject } from '@/lib/db';
import { uploadPDF, deletePDF } from '@/lib/storage';

export async function GET() {
  try {
    const subjects = await getAllSubjects();
    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const file = formData.get('file') as File;

    if (!name || !description || !price || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pdfUrl = await uploadPDF(file);
    const subject = await createSubject(name, description, price, pdfUrl);

    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    console.error('Error creating subject:', error);
    return NextResponse.json({ error: 'Failed to create subject' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Subject ID required' }, { status: 400 });
    }

    await deleteSubject(parseInt(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting subject:', error);
    return NextResponse.json({ error: 'Failed to delete subject' }, { status: 500 });
  }
}
