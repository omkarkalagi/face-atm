'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-white text-blue-600 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <span className="text-2xl font-bold">FaceATM</span>
          </Link>

          <nav className="hidden lg:flex space-x-6 items-center">
            <Link href="/" className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105">
              About
            </Link>
            <Link href="/features" className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105">
              Features
            </Link>
            <Link href="/services" className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105">
              Services
            </Link>
            <Link href="/security" className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105">
              Security
            </Link>
            <Link href="/faq" className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105">
              FAQ
            </Link>
            <Link href="/documentation" className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105">
              Docs
            </Link>
            <Link href="/train" className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105">
              Train
            </Link>
            <a 
              href="/Report_face_atm.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-all duration-300 font-medium hover:scale-105 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Report</span>
            </a>
            <Link href="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold">
              Register
            </Link>
            <Link href="/login" className="border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold">
              Login
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-blue-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-blue-500 pt-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/features" className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Features
              </Link>
              <Link href="/services" className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link href="/security" className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Security
              </Link>
              <Link href="/faq" className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
              <Link href="/documentation" className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Documentation
              </Link>
              <Link href="/train" className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Train Model
              </Link>
              <a 
                href="/Report_face_atm.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Report</span>
              </a>
              <Link href="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-center" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
              <Link href="/login" className="border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-center" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}