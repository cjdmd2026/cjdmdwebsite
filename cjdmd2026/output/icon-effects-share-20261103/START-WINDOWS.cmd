@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Or run: python -m http.server 4173 --bind 127.0.0.1
  pause
  exit /b 1
)
echo Open http://127.0.0.1:4173 in your browser.
node serve.mjs
pause
