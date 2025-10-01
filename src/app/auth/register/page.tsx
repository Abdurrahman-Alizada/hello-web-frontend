import RegisterForm from '@/components/auth/RegisterForm';
import AuthLayout from '@/components/layout/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout 
      title="Create your account"
      subtitle="Already have an account? Sign in"
    >
      <RegisterForm />
    </AuthLayout>
  );
}