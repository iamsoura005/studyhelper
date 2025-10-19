'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PixelBlast from '@/components/PixelBlast';
import { formatCurrency, formatDate } from '@/lib/utils';
import { BookOpen, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function MyNotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const [paymentsRes, subjectsRes] = await Promise.all([
        fetch('/api/payments'),
        fetch('/api/subjects'),
      ]);

      const paymentsData = await paymentsRes.json();
      const subjectsData = await subjectsRes.json();

      setPayments(paymentsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubjectById = (id: string) => {
    return subjects.find((s) => s.id === id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-400';
      case 'rejected':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          transparent
        />
      </div>

      <div className="relative z-10 min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">My Notes</h1>
            <a
              href="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              ← Back to Home
            </a>
          </div>

          {payments.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
              <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">No Purchases Yet</h2>
              <p className="text-gray-300 mb-6">
                You haven't purchased any study materials yet. Browse our subjects to get started!
              </p>
              <a
                href="/#subjects"
                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                Browse Subjects
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {payments.map((payment) => {
                const subject = getSubjectById(payment.subject_id);
                return (
                  <div
                    key={payment.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <BookOpen className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">
                              {subject?.name || 'Unknown Subject'}
                            </h3>
                            <p className="text-gray-300 mb-3">
                              {subject?.description || 'No description available'}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">
                                  {formatDate(payment.created_at)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Amount: </span>
                                <span className="font-semibold text-purple-400">
                                  {formatCurrency(payment.amount)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Transaction ID: </span>
                                <span className="font-mono text-sm">{payment.transaction_id}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className={`flex items-center gap-2 font-semibold ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          <span className="uppercase text-sm">{payment.status}</span>
                        </div>

                        {payment.status === 'verified' && subject && (
                          <a
                            href={`/notes/${subject.id}`}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                          >
                            View Notes
                          </a>
                        )}

                        {payment.status === 'pending' && (
                          <div className="text-sm text-gray-400 text-right">
                            Waiting for admin verification
                          </div>
                        )}

                        {payment.status === 'rejected' && (
                          <div className="text-sm text-red-400 text-right">
                            Payment rejected. Please contact support.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
