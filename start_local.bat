@echo off
setlocal

:: Get the directory where the script is located
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

echo 🚀 Starting Video Sentiment Analyzer (Local Access Only)...

:: --- Step 1: Start ML Backend ---
echo.
echo --- Starting ML Backend ---
start cmd /k "python ml_backend_enhanced.py"
echo ML Backend started in a new window. Waiting a few seconds for it to initialize...
timeout /t 5 /nobreak > NUL

:: --- Step 2: Start Frontend ---
echo.
echo --- Starting Frontend (Next.js) ---
cd sentiment-analyzer-frontend
start cmd /k "npm run dev"
echo Frontend started in a new window. Waiting a few seconds for it to initialize...
timeout /t 5 /nobreak > NUL
cd ..

echo.
echo --- Application Started ---
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo ❤️ Health Check: http://localhost:5000/health
echo.
echo 📱 Access the application at: http://localhost:3000
echo.
echo Press any key to exit this window (this will NOT close the backend/frontend windows).
pause > NUL
endlocal
