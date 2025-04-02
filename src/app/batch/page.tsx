'use client';

import { useState } from 'react';
import { RotationResults } from '@/types/rotations';
import BatchConverter from '@/components/conversion/BatchConverter';
import BatchResults from '@/components/conversion/BatchResults';
import Link from 'next/link';

export default function BatchPage() {
  const [results, setResults] = useState<RotationResults[] | null>(null);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Batch Conversion</h1>
            <p className="mt-2 text-sm text-gray-600">
              Convert multiple rotations at once. Enter one rotation per line.
            </p>
          </div>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to Single Conversion
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6">
            <BatchConverter onResults={setResults} />
          </div>

          {results && results.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <BatchResults results={results} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 