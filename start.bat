@echo off
title Riyansh Amrit — Luxury Ayurvedic Commerce
color 0A

echo ====================================================================
echo        RIYANSH AMRIT ^| AYURVEDIC LUXURY STOREFRONT LAUNCHER
echo ====================================================================
echo.

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing project dependencies...
    call npm install --legacy-peer-deps
)

echo.
echo [1] Start Vite Development Server (Port 3000) [Recommended]
echo [2] Build and Run Production Express Server
echo [3] Run TypeScript Linter Check
echo.
set /p choice="Select an option (1-3) [Default 1]: "

if "%choice%"=="2" (
    echo.
    echo [INFO] Building production bundle...
    call npm run build
    echo [INFO] Starting Express server...
    start http://localhost:3000
    node server.js
) else if "%choice%"=="3" (
    echo.
    echo [INFO] Running TypeScript checks...
    call npm run lint
    pause
) else (
    echo.
    echo [INFO] Starting Vite dev server...
    start http://localhost:3000
    call npm run dev
)
