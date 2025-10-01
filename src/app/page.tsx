import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import PublicLayout from '@/components/layout/PublicLayout';

export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <Features />
    </PublicLayout>
  );
}
