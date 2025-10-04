'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I register for FaceATM?",
          a: "Registration is simple! Click the 'Register' button, fill in your details (name, account number, initial deposit, and 4-digit PIN), then capture your face from multiple angles using your camera. The system will save your biometric data securely."
        },
        {
          q: "What do I need to start using FaceATM?",
          a: "You'll need a device with a camera (webcam, smartphone, or tablet), an internet connection, and a valid ID for registration. Make sure you're in a well-lit area for optimal face capture."
        },
        {
          q: "How long does registration take?",
          a: "The entire registration process takes about 2-3 minutes. You'll need to capture at least 5 face images from different angles, which takes about 30 seconds, followed by model training which completes in under a minute."
        },
        {
          q: "Is there a minimum deposit requirement?",
          a: "Yes, you need to make an initial deposit when creating your account. The minimum amount varies, but typically starts from $10 or equivalent in your currency."
        }
      ]
    },
    {
      category: "Face Recognition & Login",
      questions: [
        {
          q: "How does face recognition login work?",
          a: "Simply look at your camera when prompted. Our AI system will analyze your facial features and match them against your registered profile. If verified, you'll be asked to enter your 4-digit PIN for additional security."
        },
        {
          q: "What if the system doesn't recognize my face?",
          a: "Ensure you're in good lighting, remove glasses/masks if worn during registration, and position your face clearly in the camera frame. If issues persist, you may need to retrain your model or contact support."
        },
        {
          q: "Can I use the system with glasses or facial hair?",
          a: "Yes! However, for best results, maintain consistency. If you wore glasses during registration, wear them during login. Major changes in appearance may require model retraining."
        },
        {
          q: "Is my biometric data safe?",
          a: "Absolutely! Your facial data is encrypted and stored locally. We use advanced security protocols and never share your biometric information with third parties."
        },
        {
          q: "Can someone use my photo to access my account?",
          a: "No. Our system includes liveness detection that verifies you're a real person, not a photo or video. This prevents spoofing attacks."
        }
      ]
    },
    {
      category: "Training the Model",
      questions: [
        {
          q: "What is model training and why is it important?",
          a: "Model training is the process where our AI learns your unique facial features. This creates a personalized recognition model that can accurately identify you. It's essential for secure authentication."
        },
        {
          q: "How do I train or retrain my model?",
          a: "After registration, the system automatically trains your model. To retrain, go to your dashboard settings and select 'Retrain Model'. You'll need to capture new face images and wait for the training to complete."
        },
        {
          q: "How long does model training take?",
          a: "Training typically takes 30-60 seconds, depending on your internet speed and device performance. You'll see a progress indicator during the process."
        },
        {
          q: "When should I retrain my model?",
          a: "Retrain if you experience frequent recognition failures, or if your appearance has changed significantly (new hairstyle, facial hair, glasses, etc.)."
        }
      ]
    },
    {
      category: "Transactions & Banking",
      questions: [
        {
          q: "How do I deposit money?",
          a: "After logging in, navigate to your dashboard, click 'Deposit', enter the amount, and confirm. Your balance will be updated instantly."
        },
        {
          q: "What's the maximum withdrawal amount?",
          a: "You can withdraw up to your available balance. There are no fixed limits, but you cannot withdraw more than what you have in your account."
        },
        {
          q: "Are there any transaction fees?",
          a: "Standard deposits and withdrawals are free. Special services or external transfers may incur nominal fees, which will be displayed before confirmation."
        },
        {
          q: "Can I view my transaction history?",
          a: "Yes! Your dashboard displays a complete history of all deposits and withdrawals, including dates, amounts, and current balance."
        },
        {
          q: "How quickly are transactions processed?",
          a: "All transactions are processed in real-time. Your balance updates immediately after each deposit or withdrawal."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          q: "How secure is FaceATM?",
          a: "FaceATM uses bank-grade security with 256-bit encryption, multi-factor authentication (face + PIN), liveness detection, and real-time fraud monitoring. Your data is protected by multiple security layers."
        },
        {
          q: "What if I lose my device?",
          a: "Your account is protected by facial recognition, so no one else can access it. However, contact our support team immediately to temporarily suspend your account if needed."
        },
        {
          q: "Do you store my face images?",
          a: "We store encrypted facial feature templates, not actual photos. These templates are mathematical representations that cannot be reverse-engineered into images."
        },
        {
          q: "Can I delete my account?",
          a: "Yes, you can request account deletion from your dashboard settings. All your data, including biometric information, will be permanently deleted."
        },
        {
          q: "Is my financial data encrypted?",
          a: "Yes, all data transmission is encrypted using SSL/TLS protocols, and stored data is encrypted at rest. We comply with international data protection standards."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "What browsers are supported?",
          a: "FaceATM works best on modern browsers: Chrome, Firefox, Safari, and Edge (latest versions). Camera access permissions must be enabled."
        },
        {
          q: "My camera isn't working. What should I do?",
          a: "Check your browser settings to ensure camera permissions are enabled for our website. Also verify that no other application is using your camera."
        },
        {
          q: "Can I use FaceATM on mobile devices?",
          a: "Yes! FaceATM is fully responsive and works on smartphones and tablets. Just ensure you have a stable internet connection and camera access."
        },
        {
          q: "What if I encounter an error?",
          a: "Try refreshing the page first. If the issue persists, clear your browser cache, check your internet connection, or contact our 24/7 support team."
        },
        {
          q: "How do I contact customer support?",
          a: "You can reach us via email at omkardigambar4@gmail.com, call us at +91 7624828106, or use the contact form on our Contact page. We're available 24/7."
        }
      ]
    },
    {
      category: "Account Management",
      questions: [
        {
          q: "Can I change my PIN?",
          a: "Yes, you can change your 4-digit PIN from your account settings after logging in. You'll need to verify your identity through face recognition first."
        },
        {
          q: "What if I forget my PIN?",
          a: "Contact our support team with your account details. After identity verification, you can reset your PIN through a secure process."
        },
        {
          q: "Can I have multiple accounts?",
          a: "Each biometric profile is tied to one account. For multiple accounts, you would need separate registrations with different account numbers."
        },
        {
          q: "How do I update my account information?",
          a: "Log in to your dashboard and navigate to 'Account Settings' where you can update your contact information and preferences."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Find answers to common questions about FaceATM, facial recognition banking, and our services
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {faqs.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  const element = document.getElementById(`category-${index}`)
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} id={`category-${categoryIndex}`} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-600">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex
                  const isOpen = openIndex === globalIndex
                  
                  return (
                    <div key={faqIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                        <svg
                          className={`w-6 h-6 text-blue-600 transform transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-600 bg-blue-50 border-t border-blue-100">
                          <p className="pt-4">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any inquiries
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
              Contact Support
            </Link>
            <a href="mailto:omkardigambar4@gmail.com" className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Quick Start Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center">
              <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Register</h3>
              <p className="text-sm opacity-90">Create your account and capture face images</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center">
              <div className="bg-white text-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Train Model</h3>
              <p className="text-sm opacity-90">Wait for AI to learn your facial features</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 text-center">
              <div className="bg-white text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Start Banking</h3>
              <p className="text-sm opacity-90">Login with your face and manage finances</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
