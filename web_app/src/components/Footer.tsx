import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 text-white rounded-full p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">FaceATM</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing banking with cutting-edge facial recognition technology and secure biometric authentication.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> Home
              </Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> About
              </Link></li>
              <li><Link href="/features" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> Features
              </Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> Services
              </Link></li>
              <li><Link href="/security" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> Security
              </Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> FAQ
              </Link></li>
              <li><Link href="/train" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> Train Model
              </Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> Register
              </Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> Login
              </Link></li>
              <li><a href="https://github.com/OmkarKalagi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                <span className="mr-2">→</span> GitHub
              </a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:omkardigambar4@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  omkardigambar4@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+917624828106" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  +91 7624828106
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Contact Form
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-400 text-sm flex items-center">
              Made with <span className="text-red-500 mx-2 text-xl animate-pulse">♥</span> by Kalagi Group of Companies
            </p>
            <p className="text-gray-500 text-xs">
              Designed by <span className="text-blue-400 font-semibold">Omkar Kalagi</span>
            </p>
            <p className="text-gray-500 text-xs">
              &copy; {currentYear} FaceATM. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}