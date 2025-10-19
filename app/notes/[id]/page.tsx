'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import PixelBlast from '@/components/PixelBlast';
import { ArrowLeft, Download, Lock } from 'lucide-react';

export default function NotesViewerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const subjectId = params.id as string;

  const [subject, setSubject] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email && subjectId) {
      checkAccess();
    }
  }, [session, subjectId]);

  const checkAccess = async () => {
    try {
      // Fetch subject details
      const subjectsRes = await fetch('/api/subjects');
      const subjects = await subjectsRes.json();
      const foundSubject = subjects.find((s: any) => s.id === parseInt(subjectId));
      setSubject(foundSubject);

      // Check if user has verified payment for this subject
      const paymentsRes = await fetch('/api/payments');
      const payments = await paymentsRes.json();
      const verifiedPayment = payments.find(
        (p: any) => p.subject_id === parseInt(subjectId) && p.status === 'verified'
      );

      setHasAccess(!!verifiedPayment);
    } catch (error) {
      console.error('Error checking access:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 z-0">
          <PixelBlast variant="circle" pixelSize={6} color="#B19EEF" transparent />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-300 mb-6">
              You don't have access to this content. Please purchase and verify your payment first.
            </p>
            <div className="space-y-3">
              <a
                href={`/pay/${subjectId}`}
                className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                Purchase Access
              </a>
              <a
                href="/"
                className="block w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0 bg-gray-900">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={0.8}
          transparent
        />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="bg-black/50 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a
              href="/my-notes"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Notes
            </a>
            <h1 className="text-xl font-bold">{subject?.name}</h1>
            <a
              href={subject?.pdf_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
            {subject?.pdf_url ? (
              <iframe
                src={`${subject.pdf_url}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-[calc(100vh-200px)]"
                title={subject.name}
              />
            ) : (
              <div className="flex items-center justify-center h-96">
                <p className="text-gray-400">PDF not available</p>
              </div>
            )}
          </div>

          {/* Alternative: Display PDF info if iframe doesn't work */}
          <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-300">
              <strong>Note:</strong> If the PDF doesn't display above, you can download it using the
              button in the header.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
