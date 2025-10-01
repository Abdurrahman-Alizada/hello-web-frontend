'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux';

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
            {user ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
                <div className="space-y-2">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Email Verified:</strong> {user.isEmailVerified ? 'Yes' : 'No'}</p>
                </div>
              </div>
            ) : (
              <p>Please log in to access the dashboard.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}