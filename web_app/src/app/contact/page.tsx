export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">omkardigambar4@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+91 7624828106</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">GitHub</h3>
                    <a
                      href="https://github.com/OmkarKalagi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      github.com/OmkarKalagi
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/omkardigambar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      linkedin.com/in/omkardigambar
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 5.453 2.943 5.453 6.564c0 3.021 2.117 5.543 4.99 6.324l.017.005-.01 3.086-2.213.539V24h7.089v-8.482l-2.213-.539-.01-3.086c2.873-.781 4.99-3.303 4.99-6.324C18.581 2.943 15.638 0 12.017 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Instagram</h3>
                    <a
                      href="https://instagram.com/omkar_kalagi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      @omkar_kalagi
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">About the Developer</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Omkar Kalagi</h3>
                <p className="text-gray-600 mb-4">
                  Passionate developer specializing in web technologies and AI-powered applications.
                  This FaceATM project demonstrates the integration of modern web development with
                  cutting-edge facial recognition technology.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    <strong>Location:</strong> India
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Focus:</strong> Full-stack development, AI/ML integration, React/Next.js
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Interests:</strong> Innovative fintech solutions, biometric security, user experience design
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600 font-medium">Technology Stack:</span>
                    <span className="text-sm sm:text-base text-right">Next.js, TypeScript, Tailwind CSS, face-api.js</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600 font-medium">Backend:</span>
                    <span className="text-sm sm:text-base text-right">Flask, Python, OpenCV, scikit-learn</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600 font-medium">Deployment:</span>
                    <span className="text-sm sm:text-base text-right">Vercel (Frontend), Flask (Backend)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600 font-medium">Features:</span>
                    <span className="text-sm sm:text-base text-right">Face Recognition, PIN Verification, Transactions</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600 font-medium">Security:</span>
                    <span className="text-sm sm:text-base text-right">Local Processing, Encrypted Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Interested in Collaboration?</h2>
            <p className="text-gray-600 mb-6">
              I&apos;m always open to discussing new projects, innovative ideas, or potential collaborations
              in the field of AI, web development, or fintech solutions.
            </p>
            <div className="space-x-4">
              <a
                href="mailto:omkardigambar4@gmail.com"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/omkardigambar/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}