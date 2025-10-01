'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            YourApp
          </Link>
        </div>
        
        {/* Title */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-8 text-center">
        <div className="space-x-4 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            Help
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
}