# Vercel Deployment Guide for StudyHelper

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- GitHub account with the repository pushed
- Vercel account (sign up at https://vercel.com)
- Supabase account for database (https://supabase.com)
- Vercel Blob storage (included with Vercel)

### 2. Set Up Supabase Database

1. Go to https://supabase.com and create a new project
2. Wait for the project to be ready
3. Go to **Settings** → **Database**
4. Copy the **Connection String** (Pooler mode)
5. You'll need three connection strings:
   - `POSTGRES_URL` - Transaction pooler
   - `POSTGRES_PRISMA_URL` - Session pooler  
   - `POSTGRES_URL_NON_POOLING` - Direct connection

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository: `iamsoura005/studyhelper`
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next

4. Add Environment Variables (click "Environment Variables"):

```env
# Database (Supabase)
POSTGRES_URL=postgresql://postgres:[password]@[host]:6543/postgres?pgbouncer=true
POSTGRES_PRISMA_URL=postgresql://postgres:[password]@[host]:6543/postgres?pgbouncer=true&connect_timeout=15
POSTGRES_URL_NON_POOLING=postgresql://postgres:[password]@[host]:5432/postgres

# NextAuth
NEXTAUTH_SECRET=generate-a-random-32-character-string-here
NEXTAUTH_URL=https://your-app-name.vercel.app

# Admin Credentials
ADMIN_EMAIL=admin@studyhelper.com
ADMIN_PASSWORD=Admin@123

# UPI Payment Details
NEXT_PUBLIC_UPI_ID=sourasantadutta@oksbi
NEXT_PUBLIC_UPI_NAME=Sourasanta Dutta

# Fixed Price
NEXT_PUBLIC_FIXED_PRICE=20
```

5. Click **Deploy**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

### 4. Set Up Vercel Blob Storage

1. After deployment, go to your project dashboard
2. Click **Storage** tab
3. Click **Create Database** → **Blob**
4. Create a new Blob store
5. Copy the `BLOB_READ_WRITE_TOKEN`
6. Add it to your environment variables:
   - Go to **Settings** → **Environment Variables**
   - Add `BLOB_READ_WRITE_TOKEN` with the token value
7. Redeploy the project

### 5. Initialize Database

1. Once deployed, visit: `https://your-app-name.vercel.app/api/init-db`
2. You should see: `{"message":"Database initialized successfully"}`
3. This creates all necessary tables and the admin user

### 6. Test the Application

1. Visit your app: `https://your-app-name.vercel.app`
2. Login as admin:
   - Email: `admin@studyhelper.com`
   - Password: `Admin@123`
3. Upload a test subject
4. Test the payment flow

### 7. Important: Save the QR Code Image

⚠️ **CRITICAL STEP:**

The QR code image at `public/payment-qr.png` is currently empty. You need to:

1. Download the QR code image from your screenshot
2. In Vercel dashboard, go to **Deployments**
3. Click on the latest deployment
4. Go to **Source** tab
5. Navigate to `public/payment-qr.png`
6. Replace with your actual QR code image

**OR** redeploy after adding the image locally:

```bash
# Save your QR code image to public/payment-qr.png
# Then commit and push
git add public/payment-qr.png
git commit -m "Add payment QR code"
git push

# Vercel will auto-deploy
```

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_URL` | Supabase connection string (pooled) | `postgresql://...` |
| `POSTGRES_PRISMA_URL` | Supabase Prisma connection | `postgresql://...` |
| `POSTGRES_URL_NON_POOLING` | Direct connection | `postgresql://...` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token | `vercel_blob_rw_...` |
| `NEXTAUTH_SECRET` | Random secret (32+ chars) | Use: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `https://your-app.vercel.app` |
| `ADMIN_EMAIL` | Admin email | `admin@studyhelper.com` |
| `ADMIN_PASSWORD` | Admin password | `Admin@123` |
| `NEXT_PUBLIC_UPI_ID` | Your UPI ID | `sourasantadutta@oksbi` |
| `NEXT_PUBLIC_UPI_NAME` | Your name | `Sourasanta Dutta` |
| `NEXT_PUBLIC_FIXED_PRICE` | Fixed price per subject | `20` |

## 🔐 Security Checklist

- [ ] Change `ADMIN_PASSWORD` to a strong password
- [ ] Generate a strong `NEXTAUTH_SECRET`
- [ ] Never commit `.env` files to Git
- [ ] Enable Vercel's security features
- [ ] Set up domain with HTTPS
- [ ] Review Supabase security rules

## 🐛 Troubleshooting

### Database Connection Issues
- Verify Supabase connection strings are correct
- Check if Supabase project is active
- Ensure IP allowlist includes Vercel's IPs (or set to allow all)

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript has no errors

### Payment QR Not Showing
- Verify `public/payment-qr.png` exists and is a valid image
- Check browser console for errors
- Ensure image is committed to Git

### Admin Can't Login
- Visit `/api/init-db` to initialize database
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in env vars
- Clear browser cache and cookies

## 📊 Post-Deployment

### Monitor Your App
- Check Vercel Analytics
- Monitor Supabase database usage
- Review Blob storage usage

### Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain

### Scaling
- Vercel auto-scales based on traffic
- Upgrade Supabase plan if needed
- Monitor Blob storage limits

## 🎉 Success!

Your StudyHelper platform is now live! 

- **App URL:** https://your-app-name.vercel.app
- **Admin Panel:** https://your-app-name.vercel.app/admin
- **GitHub Repo:** https://github.com/iamsoura005/studyhelper

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Supabase logs
3. Check browser console for errors
4. Verify all environment variables are set

---

**Built with ❤️ by Sourasanta Dutta**
