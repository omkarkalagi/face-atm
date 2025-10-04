'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TrainModel() {
  const [isTraining, setIsTraining] = useState(false)
  const [trainingStatus, setTrainingStatus] = useState('')
  const [trainedCount, setTrainedCount] = useState(0)

  const handleTrainModel = async () => {
    setIsTraining(true)
    setTrainingStatus('Initializing training process...')
    
    try {
      // Call backend training endpoint
      const response = await fetch('http://localhost:5000/train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (data.ok) {
        setTrainedCount(data.trained || 0)
        setTrainingStatus(`✅ Training completed successfully! ${data.trained} face(s) trained.`)
      } else {
        setTrainingStatus(`❌ Training failed: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      setTrainingStatus(`❌ Error: ${error}. Make sure the backend server is running.`)
    } finally {
      setIsTraining(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Train Your Model</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Train the AI to recognize your face for secure authentication
          </p>
        </div>
      </section>

      {/* Training Instructions */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How Model Training Works</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-3 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">What is Model Training?</h3>
                  <p className="text-gray-600">
                    Model training is the process where our AI system learns your unique facial features from the images you captured during registration. This creates a personalized recognition model that can accurately identify you during login.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 text-purple-600 rounded-full p-3 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">How Long Does It Take?</h3>
                  <p className="text-gray-600">
                    Training typically takes 30-60 seconds, depending on the number of face images in the dataset and your system's processing power. You'll see a status message when training is complete.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-600 rounded-full p-3 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">When Should I Train?</h3>
                  <p className="text-gray-600">
                    Train your model immediately after registration, or retrain if your appearance changes significantly (new hairstyle, glasses, facial hair) or if you're experiencing recognition issues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Training Action */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Train Your Model?</h2>
            <p className="mb-6 opacity-90">
              Click the button below to start the training process. Make sure you have already registered and captured face images.
            </p>
            
            <button
              onClick={handleTrainModel}
              disabled={isTraining}
              className={`${
                isTraining
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              } px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
            >
              {isTraining ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Training in Progress...
                </span>
              ) : (
                'Start Training'
              )}
            </button>

            {trainingStatus && (
              <div className={`mt-6 p-4 rounded-lg ${
                trainingStatus.includes('✅') 
                  ? 'bg-green-100 text-green-800' 
                  : trainingStatus.includes('❌')
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                <p className="font-semibold">{trainingStatus}</p>
                {trainedCount > 0 && (
                  <p className="text-sm mt-2">
                    Your model has been trained with {trainedCount} face sample(s)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Important Notes */}
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Important Notes</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Make sure the Flask backend server is running on port 5000</li>
                  <li>• You must have face images in the dataset folder before training</li>
                  <li>• Training will process all face images in the dataset directory</li>
                  <li>• After training, you can immediately use face recognition login</li>
                  <li>• Retrain anytime if your appearance changes significantly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Steps */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Complete Setup Process</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Register Your Account</h3>
                <p className="text-gray-600">Create account with name, account number, deposit, and PIN</p>
              </div>
              <Link href="/register" className="ml-auto bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-semibold whitespace-nowrap">
                Register
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Capture Face Images</h3>
                <p className="text-gray-600">Take multiple photos from different angles (done during registration)</p>
              </div>
              <span className="ml-auto text-green-500 font-semibold">✓ Auto</span>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 border-2 border-purple-600">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-800">Train Your Model</h3>
                <p className="text-gray-600">Click the button above to start AI training</p>
              </div>
              <span className="ml-auto text-purple-600 font-semibold">← You Are Here</span>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Login with Your Face</h3>
                <p className="text-gray-600">Access your account using facial recognition</p>
              </div>
              <Link href="/login" className="ml-auto bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors font-semibold whitespace-nowrap">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            If you encounter any issues during training, check our FAQ or contact support
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/faq" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View FAQ
            </Link>
            <Link href="/contact" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
