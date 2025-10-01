'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useSignupUserMutation } from '@/redux/reducers/auth/authThunk';
import { setUser } from '@/redux/reducers/auth/authSlice';
import { RegisterRequest } from '@/types/auth';
import { Button, FormikInput } from '@/components/ui';
import { registerSchema } from '@/lib/validationSchemas';
import { ROUTES } from '@/constants';
import Link from 'next/link';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signupUser, { isLoading }] = useSignupUserMutation();

  const handleSubmit = async (values: RegisterRequest & { confirmPassword: string }, { setStatus }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.log("Form submitted with values:", values);
    try {
      setStatus(undefined);
      const result = await signupUser({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('authUser', JSON.stringify(result.user));
      }
      dispatch(setUser(result.user));
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Registration error:', error);
      const errorMessage = error && typeof error === 'object' && 'data' in error 
        ? (error.data as { error?: { message?: string } })?.error?.message || 'Registration failed'
        : 'Registration failed';
      setStatus(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ status, errors, isValid, isSubmitting }) => {
            console.log('Form state:', { errors, isValid, isSubmitting });
            return (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <Field
                  name="name"
                  component={FormikInput}
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                />
                <Field
                  name="email"
                  component={FormikInput}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                />
                <Field
                  name="password"
                  component={FormikInput}
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <Field
                  name="confirmPassword"
                  component={FormikInput}
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>

              {status && (
                <div className="text-red-600 text-sm text-center">{status}</div>
              )}

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                Sign up
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};