'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useLoginUserMutation } from '@/redux/reducers/auth/authThunk';
import { setUser } from '@/redux/reducers/auth/authSlice';
import { Button } from '@/components/ui/Button';
import { FormikInput } from '@/components/ui/Input';
import { loginSchema } from '@/lib/validationSchemas';
import { LoginRequest } from '@/types/auth';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (values: LoginRequest, { setStatus }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      setStatus(undefined);
      const result = await loginUser(values).unwrap();
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('authUser', JSON.stringify(result.user));
      }
      dispatch(setUser(result.user));
      router.push(ROUTES.DASHBOARD);
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error 
        ? (error.data as { error?: { message?: string } })?.error?.message || 'Login failed'
        : 'Login failed';
      setStatus(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ status }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
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
                Sign in
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link href={ROUTES.REGISTER} className="text-blue-600 hover:text-blue-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
    </div>
  );
};

export default LoginForm;