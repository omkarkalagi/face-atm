export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FaceATM</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Pioneering the future of secure, contactless banking with cutting-edge facial recognition technology
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-4">
                FaceATM was created to revolutionize the banking experience by eliminating the need for physical cards, PINs, and passwords. Our mission is to provide a secure, fast, and convenient way for users to access their accounts using only their face.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                We believe that biometric authentication is the future of financial security, combining unparalleled convenience with enterprise-grade protection.
              </p>
              <div className="flex space-x-4 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">99.9%</div>
                  <div className="text-gray-600">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">&lt;2s</div>
                  <div className="text-gray-600">Recognition Time</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">100%</div>
                  <div className="text-gray-600">Secure</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <svg className="w-64 h-64 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Powered by Advanced Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Deep Learning Models</h3>
              <p className="text-gray-600">
                Utilizing state-of-the-art neural networks trained on millions of facial images to ensure accurate recognition even in challenging conditions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Encrypted Storage</h3>
              <p className="text-gray-600">
                All biometric data is encrypted and stored locally, ensuring your privacy and security are never compromised.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Real-time Processing</h3>
              <p className="text-gray-600">
                Lightning-fast facial recognition processing enables instant authentication without any noticeable delay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            How FaceATM Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Face Capture & Enrollment</h3>
                  <p className="text-gray-600">
                    During registration, we capture multiple images of your face from different angles. Our AI extracts unique facial features to create your biometric template.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Feature Extraction</h3>
                  <p className="text-gray-600">
                    Advanced algorithms analyze facial landmarks, distances, and unique patterns to create a mathematical representation of your face.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Secure Authentication</h3>
                  <p className="text-gray-600">
                    When you login, your face is compared against stored templates. Our system verifies your identity with industry-leading accuracy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">PIN Verification</h3>
                  <p className="text-gray-600">
                    For added security, a PIN verification step ensures that even if someone looks similar, they cannot access your account without your PIN.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Access Granted</h3>
                  <p className="text-gray-600">
                    Once authenticated, you have full access to your dashboard where you can perform deposits, withdrawals, and view transaction history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Developed By</h2>
          <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-5xl font-bold text-white">OK</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Omkar Kalagi</h3>
            <p className="text-blue-600 mb-4">Full Stack Developer & AI Enthusiast</p>
            <p className="text-gray-600 mb-6">
              Passionate about creating innovative solutions that combine AI, security, and user experience. Specializing in building cutting-edge web applications with modern technologies.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/OmkarKalagi" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/omkardigambar/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                LinkedIn
              </a>
              <a href="mailto:omkardigambar4@gmail.com" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the future of banking today. Sign up now and enjoy secure, contactless transactions.
          </p>
          <a
            href="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-lg"
          >
            Create Your Account
          </a>
        </div>
      </section>
    </div>
  )
}
