import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import AuthButtons from '@/components/AuthButtons'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkedIn Post Generator',
  description: 'Générez des posts LinkedIn à partir de vos images',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto py-4 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-xl font-bold text-blue-600">LinkedIn Post Generator</Link>
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition">Accueil</Link>
                <Link href="/history" className="text-gray-600 hover:text-blue-600 transition">Historique</Link>
              </nav>
            </div>
            <AuthButtons />
          </div>
        </header>
        <main className="min-h-screen bg-gray-50 pt-6">
          {children}
        </main>
      </body>
    </html>
  )
}
