# StudyHelper - Complete Setup Guide

## Quick Start (Local Development)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Use Vercel Postgres or any PostgreSQL database)
POSTGRES_URL=postgresql://username:password@host:5432/database
POSTGRES_PRISMA_URL=postgresql://username:password@host:5432/database?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://username:password@host:5432/database

# Blob Storage (Use Vercel Blob or any S3-compatible storage)
BLOB_READ_WRITE_TOKEN=your_blob_token_here

# NextAuth Configuration
NEXTAUTH_SECRET=generate_a_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Admin Account
ADMIN_EMAIL=admin@studyhelper.com
ADMIN_PASSWORD=admin123

# UPI Payment Details
NEXT_PUBLIC_UPI_ID=yourname@upi
NEXT_PUBLIC_UPI_NAME=Your Name
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Initialize Database

Visit: http://localhost:3000/api/init-db

This will:
- Create all necessary database tables
- Create the admin user with credentials from `.env`

### Step 5: Login as Admin

1. Go to http://localhost:3000/login
2. Use the admin credentials from your `.env` file
3. Access the admin panel at http://localhost:3000/admin

## Vercel Deployment Guide

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

### Step 3: Set Up Vercel Postgres

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Choose a name for your database
5. Select a region (choose closest to your users)
6. Click **Create**
7. Go to **.env.local** tab and copy all Postgres environment variables
8. Add them to your project's Environment Variables

### Step 4: Set Up Vercel Blob Storage

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database**
3. Select **Blob**
4. Choose a name for your blob store
5. Click **Create**
6. Copy the `BLOB_READ_WRITE_TOKEN`
7. Add it to your project's Environment Variables

### Step 5: Configure Environment Variables

In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
POSTGRES_URL=<from_vercel_postgres>
POSTGRES_PRISMA_URL=<from_vercel_postgres>
POSTGRES_URL_NON_POOLING=<from_vercel_postgres>
BLOB_READ_WRITE_TOKEN=<from_vercel_blob>
NEXTAUTH_SECRET=<generate_random_string>
NEXTAUTH_URL=https://your-app.vercel.app
ADMIN_EMAIL=admin@studyhelper.com
ADMIN_PASSWORD=<your_secure_password>
NEXT_PUBLIC_UPI_ID=yourname@upi
NEXT_PUBLIC_UPI_NAME=Your Name
```

### Step 6: Deploy

1. Click **Deploy** in Vercel dashboard
2. Wait for deployment to complete
3. Visit your deployed URL

### Step 7: Initialize Production Database

Visit: `https://your-app.vercel.app/api/init-db`

## Using Alternative Database Providers

### Option 1: Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get connection string from Settings → Database
3. Use the connection string for `POSTGRES_URL`

### Option 2: Railway

1. Create a project at [railway.app](https://railway.app)
2. Add PostgreSQL service
3. Copy connection string
4. Use for `POSTGRES_URL`

### Option 3: Neon

1. Create a project at [neon.tech](https://neon.tech)
2. Get connection string
3. Use for `POSTGRES_URL`

## Using Alternative Storage Providers

### Option 1: AWS S3

1. Create S3 bucket
2. Install AWS SDK: `npm install @aws-sdk/client-s3`
3. Update `lib/storage.ts` to use S3 SDK
4. Add AWS credentials to environment variables

### Option 2: Cloudflare R2

1. Create R2 bucket
2. Get access keys
3. Update storage configuration
4. Add credentials to environment

## Testing the Application

### Test User Flow

1. **Register a new student account:**
   - Go to `/register`
   - Create account with email/password

2. **Browse subjects:**
   - View available subjects on homepage
   - Click on a subject to see details

3. **Make a payment:**
   - Click "Purchase Access"
   - Scan QR code with UPI app (or note the payment details)
   - Enter transaction ID
   - Submit payment

4. **Admin verification:**
   - Login as admin
   - Go to Payments tab
   - Verify the payment

5. **Access notes:**
   - Login as student
   - Go to "My Notes"
   - Click "View Notes" on verified purchase
   - View/download PDF

### Test Admin Flow

1. **Login as admin:**
   - Use admin credentials

2. **Upload a subject:**
   - Go to Admin panel
   - Fill in subject details
   - Upload PDF file
   - Submit

3. **Verify payments:**
   - Switch to Payments tab
   - Review pending payments
   - Approve or reject

## Troubleshooting

### Database Connection Errors

**Error:** "Connection refused" or "Database not found"

**Solution:**
- Verify database URL is correct
- Check if database is running
- Ensure IP is whitelisted (for cloud databases)
- Try the non-pooling connection string

### File Upload Errors

**Error:** "Failed to upload PDF"

**Solution:**
- Check blob storage token is valid
- Verify file size is under limit (default 50MB)
- Ensure proper CORS settings
- Check network connectivity

### Authentication Issues

**Error:** "Invalid credentials" or "Session not found"

**Solution:**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies
- Restart development server

### QR Code Not Generating

**Error:** QR code doesn't appear

**Solution:**
- Verify `NEXT_PUBLIC_UPI_ID` is set
- Check `NEXT_PUBLIC_UPI_NAME` is set
- Ensure qrcode package is installed
- Check browser console for errors

## Production Checklist

Before going live, ensure:

- [ ] All environment variables are set correctly
- [ ] Database is initialized (`/api/init-db` visited)
- [ ] Admin account is created and accessible
- [ ] Test payment flow works end-to-end
- [ ] PDF upload and viewing works
- [ ] SSL certificate is active (HTTPS)
- [ ] Custom domain is configured (optional)
- [ ] Backup strategy is in place
- [ ] Error monitoring is set up (optional)
- [ ] Analytics is configured (optional)

## Security Best Practices

1. **Use strong passwords:**
   - Admin password should be complex
   - Encourage users to use strong passwords

2. **Keep secrets secure:**
   - Never commit `.env` to version control
   - Rotate `NEXTAUTH_SECRET` periodically
   - Use environment variables for all secrets

3. **Regular updates:**
   - Keep dependencies updated
   - Monitor security advisories
   - Apply patches promptly

4. **Access control:**
   - Review admin access regularly
   - Implement rate limiting (optional)
   - Monitor suspicious activity

## Performance Optimization

1. **Enable caching:**
   - Use Vercel Edge caching
   - Implement Redis for sessions (optional)

2. **Optimize images:**
   - Use Next.js Image component
   - Compress images before upload

3. **Database optimization:**
   - Add indexes on frequently queried columns
   - Use connection pooling
   - Monitor query performance

4. **CDN for static assets:**
   - Vercel automatically uses CDN
   - Consider separate CDN for large files

## Monitoring and Maintenance

1. **Set up monitoring:**
   - Vercel Analytics (built-in)
   - Sentry for error tracking (optional)
   - Uptime monitoring (optional)

2. **Regular backups:**
   - Automated database backups
   - Blob storage backups
   - Test restore procedures

3. **Log monitoring:**
   - Check Vercel logs regularly
   - Set up alerts for errors
   - Monitor payment verification queue

## Support

For issues or questions:
- Check the README.md
- Review this SETUP.md
- Open an issue on GitHub
- Contact: admin@studyhelper.com

## Next Steps

After setup is complete:

1. Customize the branding (logo, colors)
2. Add more payment methods (optional)
3. Implement email notifications (optional)
4. Add search functionality (optional)
5. Create mobile app (optional)
6. Add analytics dashboard (optional)

Happy teaching! 📚
