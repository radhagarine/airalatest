import Link from 'next/link'
import { Inter } from 'next/font/google'
import { AiraLogo } from '@/components/ui/aira-logo'

const inter = Inter({ subsets: ['latin'] })

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center">
      <AiraLogo />
    </Link>
  );
}

