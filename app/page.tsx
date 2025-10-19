'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import PixelBlast from '@/components/PixelBlast';
import StaggeredMenu from '@/components/StaggeredMenu';
import { Subject } from '@/lib/db-simple';
import { formatCurrency } from '@/lib/utils';
import { BookOpen, Lock } from 'lucide-react';

export default function HomePage() {
  const { data: session } = useSession();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Subjects', ariaLabel: 'View all subjects', link: '/#subjects' },
    ...(session?.user
      ? [
          { label: 'My Notes', ariaLabel: 'View my purchased notes', link: '/my-notes' },
          ...(((session.user as any)?.role === 'admin')
            ? [{ label: 'Admin', ariaLabel: 'Admin panel', link: '/admin' }]
            : []),
        ]
      : [
          { label: 'Login', ariaLabel: 'Login to your account', link: '/login' },
          { label: 'Register', ariaLabel: 'Create new account', link: '/register' },
        ]),
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Menu */}
      <div className="fixed top-0 left-0 w-full z-50">
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          colors={['#B19EEF', '#5227FF']}
          logoUrl="/logo.svg"
          accentColor="#5227FF"
          isFixed={false}
        />
      </div>

      {/* Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              StudyHelper
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Access premium study materials with secure payment
            </p>
            <a
              href="#subjects"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              Browse Subjects
            </a>
          </div>
        </section>

        {/* Subjects Section */}
        <section id="subjects" className="min-h-screen py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Available Subjects
            </h2>

            {loading ? (
              <div className="text-center text-gray-400">Loading subjects...</div>
            ) : subjects.length === 0 ? (
              <div className="text-center text-gray-400">
                <p className="text-xl mb-4">No subjects available yet</p>
                {((session?.user as any)?.role === 'admin') && (
                  <Link
                    href="/admin"
                    className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Add First Subject
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <BookOpen className="w-8 h-8 text-purple-400" />
                      <span className="text-2xl font-bold text-purple-400">
                        {formatCurrency(subject.price)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{subject.name}</h3>
                    <p className="text-gray-300 mb-6 line-clamp-3">{subject.description}</p>
                    <Link
                      href={`/pay/${subject.id}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      <Lock className="w-4 h-4" />
                      Purchase Access
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
