export default function Training() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8">Face Recognition Technology</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">How Face Recognition Works</h2>
              <p className="text-gray-600 mb-4">
                Face recognition is a biometric technology that identifies or verifies a person&apos;s identity using their facial features.
                Our system uses advanced machine learning algorithms to analyze facial landmarks and create unique digital signatures.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Facial Landmark Detection</h3>
                  <p className="text-gray-600">
                    The system identifies 68 key points on the face, including eyes, nose, mouth, and jawline.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Feature Extraction</h3>
                  <p className="text-gray-600">
                    Unique facial features are extracted and converted into a mathematical representation called a face descriptor.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Accuracy and Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">High Accuracy</h3>
                  <p className="text-gray-600">
                    Our system achieves over 99% accuracy in controlled environments.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
                  <p className="text-gray-600">
                    Face verification takes less than 2 seconds on modern devices.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Secure</h3>
                  <p className="text-gray-600">
                    Face data is processed locally and never stored on external servers.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Best Practices for Use</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Important Tips for Best Results
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Ensure good lighting and avoid backlighting</li>
                        <li>Position your face directly in front of the camera</li>
                        <li>Remove glasses or hats that might obscure facial features</li>
                        <li>Keep a neutral expression during registration and login</li>
                        <li>Use the same device for consistent results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Component</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Technology</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Face Detection</td>
                      <td className="border border-gray-300 px-4 py-2">TinyFaceDetector</td>
                      <td className="border border-gray-300 px-4 py-2">Locates faces in images/video</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Landmark Detection</td>
                      <td className="border border-gray-300 px-4 py-2">68-Point Model</td>
                      <td className="border border-gray-300 px-4 py-2">Identifies facial features</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Feature Extraction</td>
                      <td className="border border-gray-300 px-4 py-2">Face Recognition Net</td>
                      <td className="border border-gray-300 px-4 py-2">Creates unique face descriptors</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Matching Algorithm</td>
                      <td className="border border-gray-300 px-4 py-2">Euclidean Distance</td>
                      <td className="border border-gray-300 px-4 py-2">Compares face descriptors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Privacy and Security</h2>
              <p className="text-gray-600 mb-4">
                Your privacy is our top priority. Face recognition data is processed entirely on your device and is never transmitted to external servers.
                Face descriptors are stored locally in your browser&apos;s storage and can be cleared at any time.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Data Protection Notice
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        FaceATM does not collect, store, or share your biometric data. All processing occurs locally on your device.
                        For production use, consider additional security measures and compliance with local privacy regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}