#!/bin/bash

echo "🎭 Starting FaceATM - Facial Recognition Banking System"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "app.py" ]; then
    echo "❌ Error: Please run this script from the face_atm project root directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js to run the frontend."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ to run the backend."
    exit 1
fi

echo "✅ Dependencies check passed"
echo ""

# Install Python dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "📦 Installing Python dependencies..."
    pip install -r requirements.txt
    echo "✅ Python dependencies installed"
fi

# Install Node.js dependencies if web_app exists
if [ -d "web_app" ]; then
    echo "📦 Installing Node.js dependencies..."
    cd web_app
    npm install
    cd ..
    echo "✅ Node.js dependencies installed"
fi

echo ""
echo "🚀 Starting servers..."
echo "   Frontend (Next.js): http://localhost:3000"
echo "   Backend (Flask):    http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start the application
python app.py
