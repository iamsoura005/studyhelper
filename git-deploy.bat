@echo off
echo ========================================
echo Committing Supabase configuration...
echo ========================================
git add .
git commit -m "Configure Supabase database and update deployment guides"
git push
echo.
echo ========================================
echo SUCCESS! Code pushed to GitHub
echo Repository: https://github.com/iamsoura005/studyhelper
echo.
echo Next Steps:
echo 1. Create Supabase database (see SUPABASE_SETUP.md)
echo 2. Deploy to Vercel (see DEPLOYMENT_READY.md)
echo 3. Initialize database at /api/init-db
echo ========================================
pause
