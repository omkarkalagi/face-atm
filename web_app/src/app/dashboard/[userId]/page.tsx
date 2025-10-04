'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

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

export default function Dashboard() {
  const params = useParams()
  const userId = params?.userId as string
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw'>('deposit')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const currentUser = localStorage.getItem('faceatm_current_user')
    if (!currentUser || currentUser !== userId) {
      router.push('/login')
      return
    }

    const users = JSON.parse(localStorage.getItem('faceatm_users') || '{}')
    const user = users[userId]
    if (user) {
      setUserData(user)
    } else {
      router.push('/login')
    }
  }, [userId, router])

  const handleTransaction = () => {
    const numAmount = parseFloat(amount)
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount.')
      return
    }

    if (transactionType === 'withdraw' && userData!.balance < numAmount) {
      setError('Insufficient balance.')
      return
    }

    const users = JSON.parse(localStorage.getItem('faceatm_users') || '{}')
    const newBalance = transactionType === 'deposit'
      ? userData!.balance + numAmount
      : userData!.balance - numAmount

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: numAmount,
      timestamp: new Date().toISOString()
    }

    const updatedUserData = {
      ...userData!,
      balance: newBalance,
      transactions: [newTransaction, ...userData!.transactions]
    }

    users[userId] = updatedUserData
    localStorage.setItem('faceatm_users', JSON.stringify(users))
    setUserData(updatedUserData)
    setAmount('')
    setSuccess(`${transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'} of $${numAmount.toFixed(2)} successful!`)
    setError('')
  }

  const handleLogout = () => {
    localStorage.removeItem('faceatm_current_user')
    router.push('/')
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Welcome, {userId}!</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Balance Card */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
              <p className="text-3xl font-bold text-blue-600">
                ${userData.balance.toFixed(2)}
              </p>
            </div>

            {/* Transaction Form */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Make a Transaction</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Type
                  </label>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value as 'deposit' | 'withdraw')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="deposit">Deposit</option>
                    <option value="withdraw">Withdraw</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    step="0.01"
                    min="0"
                  />
                </div>
                <button
                  onClick={handleTransaction}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}
                </button>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            {userData.transactions.length === 0 ? (
              <p className="text-gray-500">No transactions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-t">
                        <td className="px-4 py-2">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 capitalize">
                          {transaction.type}
                        </td>
                        <td className="px-4 py-2">
                          <span className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}