'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PixelBlast from '@/components/PixelBlast';
import { Subject, Payment } from '@/lib/db';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Upload, Trash2, Check, X } from 'lucide-react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'subjects' | 'payments'>('subjects');

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('20'); // Fixed price
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    if ((session?.user as any)?.role === 'admin') {
      fetchSubjects();
      fetchPayments();
    }
  }, [session]);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments?all=true');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('file', file);

      const response = await fetch('/api/subjects', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setName('');
        setDescription('');
        setPrice('20'); // Reset to fixed price
        setFile(null);
        fetchSubjects();
        alert('Subject uploaded successfully!');
      } else {
        alert('Failed to upload subject');
      }
    } catch (error) {
      console.error('Error uploading subject:', error);
      alert('Error uploading subject');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this subject?')) return;

    try {
      const response = await fetch(`/api/subjects?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubjects();
        alert('Subject deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const handlePaymentUpdate = async (paymentId: number, status: 'verified' | 'rejected') => {
    try {
      const response = await fetch('/api/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, status }),
      });

      if (response.ok) {
        fetchPayments();
        alert(`Payment ${status} successfully!`);
      }
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if ((session?.user as any)?.role !== 'admin') {
    return null;
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
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <a
              href="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              ← Back to Home
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'subjects'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Subjects
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'payments'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Payments
            </button>
          </div>

          {activeTab === 'subjects' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Upload className="w-6 h-6" />
                  Upload New Subject
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., Mathematics Chapter 1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Brief description of the content..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price (INR)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      min="20"
                      max="20"
                      step="1"
                      readOnly
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-not-allowed"
                      placeholder="20.00"
                    />
                    <p className="text-xs text-gray-400 mt-1">Fixed price for all subjects: ₹20</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">PDF File</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-semibold rounded-lg transition-colors"
                  >
                    {uploading ? 'Uploading...' : 'Upload Subject'}
                  </button>
                </form>
              </div>

              {/* Subjects List */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6">Existing Subjects</h2>

                <div className="space-y-4">
                  {subjects.length === 0 ? (
                    <p className="text-gray-400">No subjects uploaded yet</p>
                  ) : (
                    subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{subject.name}</h3>
                            <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                              {subject.description}
                            </p>
                            <p className="text-purple-400 font-semibold">
                              {formatCurrency(subject.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(subject.id)}
                            className="ml-4 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6">Payment Verification</h2>

              <div className="space-y-4">
                {payments.length === 0 ? (
                  <p className="text-gray-400">No payments to verify</p>
                ) : (
                  payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="bg-white/5 rounded-lg p-6 border border-white/10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-400">Student Email</p>
                          <p className="font-semibold">{payment.student_email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Subject</p>
                          <p className="font-semibold">{payment.subject_name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Amount</p>
                          <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Transaction ID</p>
                          <p className="font-semibold">{payment.transaction_id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Date</p>
                          <p className="font-semibold">{formatDate(payment.created_at)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <p
                            className={`font-semibold ${
                              payment.status === 'verified'
                                ? 'text-green-400'
                                : payment.status === 'rejected'
                                ? 'text-red-400'
                                : 'text-yellow-400'
                            }`}
                          >
                            {payment.status.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {payment.status === 'pending' && (
                        <div className="flex gap-4">
                          <button
                            onClick={() => handlePaymentUpdate(payment.id, 'verified')}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            Verify
                          </button>
                          <button
                            onClick={() => handlePaymentUpdate(payment.id, 'rejected')}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
