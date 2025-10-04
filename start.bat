@echo off
echo 🎭 Starting FaceATM - Facial Recognition Banking System
echo ==================================================
echo.

REM Check if we're in the right directory
if not exist "app.py" (
    echo ❌ Error: Please run this script from the face_atm project root directory
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js to run the frontend.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ to run the backend.
    pause
    exit /b 1
)

echo ✅ Dependencies check passed
echo.

REM Install Python dependencies if requirements.txt exists
if exist "requirements.txt" (
    echo 📦 Installing Python dependencies...
    pip install -r requirements.txt
    echo ✅ Python dependencies installed
)

REM Install Node.js dependencies if web_app exists
if exist "web_app" (
    echo 📦 Installing Node.js dependencies...
    cd web_app
    npm install
    cd ..
    echo ✅ Node.js dependencies installed
)

echo.
echo 🚀 Starting servers...
echo    Frontend (Next.js): http://localhost:3000
echo    Backend (Flask):    http://localhost:5000
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start the application
python app.py
