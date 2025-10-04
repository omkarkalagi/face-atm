'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as faceapi from 'face-api.js'

export default function Register() {
  const [step, setStep] = useState(1)
  const [userId, setUserId] = useState('')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [faceDescriptor, setFaceDescriptor] = useState<number[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ])
        setModelsLoaded(true)
      } catch (err) {
        console.error('Error loading models:', err)
        setError('Failed to load face recognition models. Please refresh the page.')
      }
    }
    loadModels()
  }, [])

  // Start video stream when models are loaded and step is 2
  useEffect(() => {
    if (!modelsLoaded) return
    
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
    
    if (step === 2) {
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

  const captureFace = async () => {
    if (!videoRef.current || !canvasRef.current || !modelsLoaded) {
      setError('Camera not ready. Please wait...')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (detection) {
        const displaySize = { 
          width: videoRef.current.videoWidth || 640, 
          height: videoRef.current.videoHeight || 480 
        }
        faceapi.matchDimensions(canvasRef.current, displaySize)
        
        const resizedDetections = faceapi.resizeResults(detection, displaySize)
        const ctx = canvasRef.current.getContext('2d')
        
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
        }

        // Convert Float32Array to regular array for storage
        setFaceDescriptor(Array.from(detection.descriptor as unknown as number[]))
        setStep(3) // Move to confirmation step
      } else {
        setError('No face detected. Please ensure your face is clearly visible.')
      }
    } catch (err) {
      console.error('Face detection error:', err)
      setError('Face capture failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = () => {
    if (!userId || !pin || !confirmPin || !faceDescriptor) {
      setError('Please fill all fields and capture your face.')
      return
    }

    if (pin !== confirmPin) {
      setError('PINs do not match.')
      return
    }

    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem('faceatm_users') || '{}')
    if (users[userId]) {
      setError('User ID already exists.')
      return
    }

    users[userId] = {
      pin,
      faceDescriptor,
      balance: 0,
      transactions: []
    }
    
    localStorage.setItem('faceatm_users', JSON.stringify(users))
    router.push('/login')
  }

  if (!modelsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading face recognition models...</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Register for FaceATM</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Enter Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a unique user ID"
                  />
                </div>
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
                    placeholder="Enter 4-digit PIN"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm PIN
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your PIN"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!userId || !pin || !confirmPin || pin !== confirmPin}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next: Capture Face
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 2: Capture Your Face</h2>
              <p className="text-gray-600 mb-4">
                Position your face in the center of the camera and ensure good lighting.
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
              <div className="flex space-x-4">
                <button
                  onClick={captureFace}
                  disabled={isLoading}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Capturing...' : 'Capture Face'}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 3: Confirm Registration</h2>
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Face captured successfully! Click Register to complete your account.
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleRegister}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Register Account
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Recapture Face
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}