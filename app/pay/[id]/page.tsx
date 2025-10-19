'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import PixelBlast from '@/components/PixelBlast';
import { Subject } from '@/lib/db-simple';
import { formatCurrency } from '@/lib/utils';
import { QrCode, ArrowLeft } from 'lucide-react';

export default function PaymentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const subjectId = params.id as string;

  const [subject, setSubject] = useState<Subject | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (subjectId) {
      fetchSubject();
    }
  }, [subjectId]);

  const fetchSubject = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      const foundSubject = data.find((s: Subject) => s.id === subjectId);
      
      // Override price with fixed price
      if (foundSubject) {
        foundSubject.price = 20;
      }
      
      setSubject(foundSubject);
      // Set static QR code image
      setQrCodeUrl('/payment-qr.png');
    } catch (error) {
      console.error('Error fetching subject:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email || !subject) return;

    setLoading(true);

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: subject.id,
          amount: subject.price,
          transactionId,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit payment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Error submitting payment');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 z-0">
          <PixelBlast variant="circle" pixelSize={6} color="#B19EEF" transparent />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Payment Submitted!</h2>
            <p className="text-gray-300 mb-6">
              Your payment is under verification. You will receive access once the admin verifies
              your transaction.
            </p>
            <div className="space-y-3">
              <a
                href="/my-notes"
                className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                View My Notes
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
        <div className="max-w-4xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold mb-6">Complete Payment</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Subject Details */}
              <div>
                <h2 className="text-xl font-bold mb-4">Subject Details</h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-6">
                  <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-gray-300 mb-4">{subject.description}</p>
                  <p className="text-3xl font-bold text-purple-400">
                    {formatCurrency(subject.price)}
                  </p>
                </div>

                {/* Payment Instructions */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Payment Instructions:</h3>
                  <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                    <li>Scan the QR code with any UPI app</li>
                    <li>Complete the payment</li>
                    <li>Copy the transaction ID from your UPI app</li>
                    <li>Enter the transaction ID below and submit</li>
                    <li>Wait for admin verification</li>
                  </ol>
                </div>
              </div>

              {/* QR Code and Form */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Scan to Pay
                </h2>

                {qrCodeUrl && (
                  <div className="bg-white rounded-lg p-6 mb-6 flex justify-center">
                    <img src={qrCodeUrl} alt="Payment QR Code - Sourasanta Dutta" className="w-full max-w-sm" />
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="transactionId" className="block text-sm font-medium mb-2">
                      Transaction ID / UPI Reference Number
                    </label>
                    <input
                      id="transactionId"
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter transaction ID"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-semibold rounded-lg transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Submit Payment'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
