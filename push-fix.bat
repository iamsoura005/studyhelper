@echo off
git commit -m "Add Vercel environment variable fix guide"
git push
echo.
echo ========================================
echo PUSHED TO GITHUB!
echo ========================================
echo.
echo NOW FIX VERCEL:
echo 1. Open: https://vercel.com/dashboard
echo 2. Go to: Settings - Environment Variables
echo 3. DELETE old POSTGRES_URL variables
echo 4. ADD new ones with actual connection strings
echo.
echo See: VERCEL_FIX_NOW.md for step-by-step guide
echo ========================================
pause
