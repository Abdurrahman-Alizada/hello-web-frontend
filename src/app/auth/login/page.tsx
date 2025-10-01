import LoginForm from '@/components/auth/LoginForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Sign in to your account"
      subtitle="Or register for a new account"
    >
      <LoginForm />
    </AuthLayout>
  );
}