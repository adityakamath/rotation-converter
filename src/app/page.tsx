'use client';

import ConversionForm from '@/components/conversion/ConversionForm';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">3D Rotation Converter</h1>
            <p className="mt-2 text-sm text-gray-600">
              Convert between different 3D rotation formats with real-time visualization.
            </p>
          </div>
          <Link
            href="/batch"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Batch Conversion →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ConversionForm />
        </div>
      </div>
    </main>
  );
}
