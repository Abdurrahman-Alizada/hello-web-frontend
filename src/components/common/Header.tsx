'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logoutUser } from '@/redux/reducers/auth/authSlice';
import { Button } from '@/components/ui/Button';

export default function Header() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              YourApp
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/profile" className="text-gray-500 hover:text-gray-900">
                  Profile
                </Link>
                <Link href="/users" className="text-gray-500 hover:text-gray-900">
                  Users
                </Link>
              </>
            )}
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.name}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}