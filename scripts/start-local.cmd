@echo off
rem Opens PayArk Academy on this computer.
rem Starts the local server if it isn't already running, waits for it, then opens the browser.
rem The desktop shortcut "PayArk Academy (local)" runs this file.

set "APP_URL=http://localhost:3000/llm"
cd /d "%~dp0.."

netstat -ano | findstr /r /c:":3000 .*LISTENING" >nul
if %errorlevel%==0 goto open

if not exist node_modules (
  echo Installing packages for the first run...
  call npm install
)

echo Starting PayArk Academy... (keep this window open; close it to stop the app)
start "PayArk Academy server" /min cmd /k "npm run dev"

rem Wait up to 60 seconds for the server to answer.
for /l %%i in (1,1,60) do (
  powershell -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 http://localhost:3000 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
  if not errorlevel 1 goto open
  timeout /t 1 /nobreak >nul
)

:open
start "" "%APP_URL%"
exit /b 0
