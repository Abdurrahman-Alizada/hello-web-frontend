'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DashboardLayout>
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
            
            <div className="p-6">
              {user ? (
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <Button variant="secondary" size="sm">
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="p-3 bg-gray-50 rounded border">
                        {user.name}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="p-3 bg-gray-50 rounded border">
                        {user.email}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <div className="p-3 bg-gray-50 rounded border capitalize">
                        {user.role}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Verification
                      </label>
                      <div className="p-3 bg-gray-50 rounded border">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isEmailVerified 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4 border-t">
                    <Button>
                      Edit Profile
                    </Button>
                    <Button variant="secondary">
                      Change Password
                    </Button>
                    {!user.isEmailVerified && (
                      <Button variant="secondary">
                        Verify Email
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Please log in to view your profile.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}