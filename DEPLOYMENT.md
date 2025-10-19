# StudyHelper - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Preparation

- [ ] All dependencies installed (`npm install`)
- [ ] Code builds successfully (`npm run build`)
- [ ] No TypeScript errors (`npm run build`)
- [ ] Environment variables configured
- [ ] Git repository initialized
- [ ] Code pushed to GitHub

### ✅ Environment Configuration

- [ ] `POSTGRES_URL` configured
- [ ] `BLOB_READ_WRITE_TOKEN` configured
- [ ] `NEXTAUTH_SECRET` generated (use `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` set to production URL
- [ ] `ADMIN_EMAIL` configured
- [ ] `ADMIN_PASSWORD` set (use strong password)
- [ ] `NEXT_PUBLIC_UPI_ID` configured
- [ ] `NEXT_PUBLIC_UPI_NAME` configured

### ✅ Database Setup

- [ ] Database created (Vercel Postgres, Supabase, etc.)
- [ ] Connection string tested
- [ ] Database initialized (visit `/api/init-db`)
- [ ] Admin user created successfully
- [ ] Tables created (users, subjects, payments)

### ✅ Storage Setup

- [ ] Blob storage created (Vercel Blob)
- [ ] Storage token obtained
- [ ] Upload permissions verified
- [ ] Test file upload works

### ✅ Testing

- [ ] Homepage loads correctly
- [ ] Login/Register works
- [ ] Admin panel accessible
- [ ] Subject upload works
- [ ] Payment QR code generates
- [ ] Payment submission works
- [ ] Admin can verify payments
- [ ] PDF viewer works
- [ ] Download functionality works

## Vercel Deployment Steps

### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - StudyHelper MVP"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/studyhelper.git
git branch -M main
git push -u origin main
```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Step 3: Set Up Vercel Postgres

1. In Vercel dashboard, go to **Storage** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Configure:
   - **Database Name:** studyhelper-db
   - **Region:** Choose closest to your users
5. Click **"Create"**
6. Go to **".env.local"** tab
7. Copy all `POSTGRES_*` variables

### Step 4: Set Up Vercel Blob

1. In Vercel dashboard, go to **Storage** tab
2. Click **"Create Database"**
3. Select **"Blob"**
4. Configure:
   - **Store Name:** studyhelper-files
5. Click **"Create"**
6. Copy `BLOB_READ_WRITE_TOKEN`

### Step 5: Configure Environment Variables

In Vercel dashboard, go to **Settings** → **Environment Variables**

Add these variables for **Production**, **Preview**, and **Development**:

```
POSTGRES_URL=<paste_from_vercel_postgres>
POSTGRES_PRISMA_URL=<paste_from_vercel_postgres>
POSTGRES_URL_NON_POOLING=<paste_from_vercel_postgres>
BLOB_READ_WRITE_TOKEN=<paste_from_vercel_blob>
NEXTAUTH_SECRET=<generate_with_openssl>
NEXTAUTH_URL=https://your-app.vercel.app
ADMIN_EMAIL=admin@studyhelper.com
ADMIN_PASSWORD=<your_secure_password>
NEXT_PUBLIC_UPI_ID=yourname@paytm
NEXT_PUBLIC_UPI_NAME=Your Full Name
```

### Step 6: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Click on deployment URL

### Step 7: Initialize Production Database

Visit: `https://your-app.vercel.app/api/init-db`

Expected response:
```json
{
  "message": "Database initialized successfully",
  "adminEmail": "admin@studyhelper.com"
}
```

### Step 8: Verify Deployment

1. Visit homepage
2. Login as admin
3. Upload a test subject
4. Create a student account
5. Test payment flow
6. Verify payment as admin
7. Access notes as student

## Custom Domain Setup (Optional)

### Step 1: Add Domain in Vercel

1. Go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `studyhelper.com`)
4. Click **"Add"**

### Step 2: Configure DNS

Add these records to your domain provider:

**For root domain (studyhelper.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Update Environment Variable

Update `NEXTAUTH_URL` to your custom domain:
```
NEXTAUTH_URL=https://studyhelper.com
```

### Step 4: Redeploy

Trigger a new deployment for changes to take effect.

## Post-Deployment Tasks

### Security

- [ ] Change default admin password
- [ ] Enable 2FA on Vercel account
- [ ] Review access logs regularly
- [ ] Set up rate limiting (optional)
- [ ] Configure CORS if needed

### Monitoring

- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (Sentry, optional)
- [ ] Set up uptime monitoring (optional)
- [ ] Create backup schedule

### Content

- [ ] Upload initial study materials
- [ ] Test all uploaded PDFs
- [ ] Verify QR codes work
- [ ] Test payment verification flow

### Communication

- [ ] Share URL with students
- [ ] Provide login instructions
- [ ] Document payment process
- [ ] Set up support channel

## Troubleshooting Common Issues

### Issue: Build Fails

**Error:** `Type error: Cannot find module...`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Issue: Database Connection Error

**Error:** `Connection refused` or `Database not found`

**Solution:**
- Verify `POSTGRES_URL` is correct
- Check database is running
- Ensure IP whitelisting (if required)
- Try `POSTGRES_URL_NON_POOLING`

### Issue: Environment Variables Not Working

**Error:** Variables are `undefined`

**Solution:**
- Ensure variables are set in Vercel dashboard
- Check variable names match exactly
- Redeploy after adding variables
- Use `NEXT_PUBLIC_` prefix for client-side variables

### Issue: PDF Upload Fails

**Error:** `Failed to upload PDF`

**Solution:**
- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check file size (max 50MB by default)
- Ensure blob storage is created
- Check network connectivity

### Issue: QR Code Not Showing

**Error:** QR code doesn't render

**Solution:**
- Set `NEXT_PUBLIC_UPI_ID` in environment variables
- Set `NEXT_PUBLIC_UPI_NAME` in environment variables
- Redeploy after setting variables
- Check browser console for errors

### Issue: Admin Panel Not Accessible

**Error:** Redirected to homepage

**Solution:**
- Visit `/api/init-db` first
- Verify admin credentials
- Clear browser cookies
- Check middleware configuration

### Issue: PDF Viewer Not Working

**Error:** PDF doesn't display

**Solution:**
- Ensure PDF URL is accessible
- Check CORS settings
- Try downloading instead of viewing
- Verify blob storage permissions

## Performance Optimization

### Enable Edge Caching

Add to `next.config.mjs`:
```javascript
experimental: {
  serverActions: true,
},
```

### Optimize Images

Use Next.js Image component:
```tsx
import Image from 'next/image';
```

### Database Optimization

Add indexes:
```sql
CREATE INDEX idx_payments_email ON payments(student_email);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_subjects_created ON subjects(created_at);
```

### Enable Compression

Vercel automatically enables gzip/brotli compression.

## Backup Strategy

### Database Backups

**Vercel Postgres:**
- Automatic daily backups
- Point-in-time recovery available
- Manual backup: Export from dashboard

**Manual Backup:**
```bash
pg_dump $POSTGRES_URL > backup.sql
```

### Blob Storage Backups

- Download all files periodically
- Store in separate location
- Test restore process

## Monitoring and Analytics

### Vercel Analytics

Enable in dashboard:
1. Go to **Analytics** tab
2. Click **"Enable Analytics"**
3. View metrics on dashboard

### Error Tracking

Install Sentry (optional):
```bash
npm install @sentry/nextjs
```

Configure in `sentry.config.js`

### Custom Logging

Add to API routes:
```typescript
console.log('[INFO]', 'Payment verified:', paymentId);
console.error('[ERROR]', 'Upload failed:', error);
```

## Scaling Considerations

### When to Scale

- More than 1000 users
- High concurrent uploads
- Large file storage needs
- Multiple regions needed

### Scaling Options

1. **Database:** Upgrade Vercel Postgres plan
2. **Storage:** Upgrade Blob storage plan
3. **Compute:** Vercel scales automatically
4. **CDN:** Already included with Vercel

## Maintenance Schedule

### Daily
- Check payment verification queue
- Monitor error logs
- Respond to support requests

### Weekly
- Review analytics
- Check storage usage
- Update content

### Monthly
- Update dependencies
- Review security
- Backup verification
- Performance review

## Support Checklist

### For Students

Provide:
- [ ] Registration instructions
- [ ] Payment guide with screenshots
- [ ] FAQ document
- [ ] Support email/chat

### For Admins

Document:
- [ ] How to upload subjects
- [ ] How to verify payments
- [ ] How to handle refunds
- [ ] Emergency procedures

## Success Metrics

Track these KPIs:
- Number of registered students
- Subjects uploaded
- Payments processed
- Verification time
- Student satisfaction
- System uptime

---

## 🎉 Deployment Complete!

Your StudyHelper platform is now live and ready to serve students!

**Next Steps:**
1. Share the URL with your students
2. Monitor the admin panel regularly
3. Keep the platform updated
4. Gather feedback and improve

**Need Help?**
- Check README.md for features
- Check SETUP.md for configuration
- Check QUICKSTART.md for basics
- Open GitHub issue for bugs

Good luck with your educational platform! 📚✨
