@echo off
echo ========================================
echo Committing secure configuration...
echo ========================================
git add .
git commit -m "Fix security: Remove real password from .env.example"
git push
echo.
echo ========================================
echo SUCCESS! Secure configuration pushed
echo ========================================
echo.
echo IMPORTANT:
echo - .env.example is now safe (no real passwords)
echo - Create local .env file for development
echo - Add real passwords to Vercel for production
echo.
echo See: LOCAL_ENV_SETUP.md for instructions
echo ========================================
pause
