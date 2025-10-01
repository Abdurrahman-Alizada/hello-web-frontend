'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DashboardLayout>
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
            {user ? (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold mb-4 text-blue-900">Welcome, {user.name}!</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <strong className="text-gray-700">Email:</strong>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <strong className="text-gray-700">Role:</strong>
                    <p className="text-gray-900 capitalize">{user.role}</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <strong className="text-gray-700">Email Verified:</strong>
                    <p className={`font-medium ${user.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                      {user.isEmailVerified ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Please log in to access the dashboard.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}