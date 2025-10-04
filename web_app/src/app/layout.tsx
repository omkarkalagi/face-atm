import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css?__next_css__'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FaceATM - Secure Facial Recognition ATM',
  description: 'Experience the future of banking with our advanced facial recognition ATM system.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}