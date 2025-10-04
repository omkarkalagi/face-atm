'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as faceapi from 'face-api.js'

interface Transaction {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  timestamp: string
}

interface UserData {
  pin: string
  faceDescriptor: number[]
  balance: number
  transactions: Transaction[]
}

export default function Login() {
  const [step, setStep] = useState(1)
  const [pin, setPin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [matchedUserId, setMatchedUserId] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    loadModels()
  }, [])

  // Start video when models are loaded
  useEffect(() => {
    if (modelsLoaded && step === 1) {
      startVideo()
      
      // Cleanup function
      return () => {
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream
          stream.getTracks().forEach(track => track.stop())
        }
      }
    }
  }, [modelsLoaded, step])

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models')
      ])
      setModelsLoaded(true)
    } catch {
      setError('Failed to load face recognition models')
    }
  }

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user' 
        } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(e => {
            console.error('Error playing video:', e)
            setError('Failed to start camera. Please ensure no other application is using it.')
          })
        }
      }
    } catch (err) {
      console.error('Camera error:', err)
      setError('Camera access denied. Please allow camera permissions and ensure no other app is using the camera.')
    }
  }

  const verifyFace = async () => {
    if (!videoRef.current) return

    setIsLoading(true)
    setError('')
    try {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (!detections) {
        setError('No face detected. Please ensure your face is clearly visible.')
        setIsLoading(false)
        return
      }

      const users = JSON.parse(localStorage.getItem('faceatm_users') || '{}')
      let bestMatch = { userId: '', distance: Infinity }

      for (const [uid, userData] of Object.entries(users)) {
        const storedDescriptor = (userData as UserData).faceDescriptor
        if (storedDescriptor) {
          const distance = faceapi.euclideanDistance(detections.descriptor, storedDescriptor)
          if (distance < 0.6 && distance < bestMatch.distance) { // Threshold for face match
            bestMatch = { userId: uid, distance }
          }
        }
      }

      if (bestMatch.userId) {
        setMatchedUserId(bestMatch.userId)
        setStep(2)
      } else {
        setError('Face not recognized. Please ensure you are registered or try again.')
      }
    } catch {
      setError('Face verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePinSubmit = () => {
    const users = JSON.parse(localStorage.getItem('faceatm_users') || '{}')
    const user = users[matchedUserId]

    if (user && user.pin === pin) {
      localStorage.setItem('faceatm_current_user', matchedUserId)
      router.push(`/dashboard/${matchedUserId}`)
    } else {
      setError('Invalid PIN. Please try again.')
    }
  }

  if (!modelsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading face recognition models...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Login to FaceATM</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Face Verification</h2>
              <p className="text-gray-600 mb-4">
                Position your face in the center of the camera for verification.
              </p>
              <div className="relative mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full rounded-lg border"
                  style={{ maxHeight: '480px' }}
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              </div>
              <button
                onClick={verifyFace}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify Face'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 2: Enter PIN</h2>
              <p className="text-gray-600 mb-4">
                Face verified for user: <strong>{matchedUserId}</strong>
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN (4 digits)
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your 4-digit PIN"
                  />
                </div>
                <button
                  onClick={handlePinSubmit}
                  disabled={!pin || pin.length !== 4}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setStep(1)
                    setPin('')
                    setMatchedUserId('')
                  }}
                  className="w-full mt-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Try Different Face
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}