# 🚀 StudyHelper - Quick Reference Card

## ⚡ Essential Information

### 📍 Project Links
- **GitHub:** https://github.com/iamsoura005/studyhelper
- **Status:** ✅ Ready for Deployment

### 🔑 Your Details
- **UPI ID:** sourasantadutta@oksbi
- **UPI Name:** Sourasanta Dutta
- **Fixed Price:** ₹20 per subject

### 👤 Default Admin Login
- **Email:** admin@studyhelper.com
- **Password:** Admin@123

---

## ⚠️ CRITICAL: Before Deployment

### 1. Save QR Code Image
```bash
# The file exists but is EMPTY
# You must replace it with your actual QR code image
File: public/payment-qr.png

# After saving the image:
git add public/payment-qr.png
git commit -m "Add QR code image"
git push
```

---

## 🚀 Deploy to Vercel (5 Steps)

### Step 1: Set Up Supabase (5 min)
1. Go to https://supabase.com
2. Create new project
3. Copy 3 connection strings from Settings → Database

### Step 2: Deploy to Vercel (3 min)
1. Go to https://vercel.com/new
2. Import: `iamsoura005/studyhelper`
3. Click Deploy

### Step 3: Add Environment Variables (5 min)
In Vercel dashboard, add these variables:

```env
POSTGRES_URL=<from_supabase>
POSTGRES_PRISMA_URL=<from_supabase>
POSTGRES_URL_NON_POOLING=<from_supabase>
NEXTAUTH_SECRET=<generate_random_32_chars>
NEXTAUTH_URL=https://your-app.vercel.app
ADMIN_EMAIL=admin@studyhelper.com
ADMIN_PASSWORD=Admin@123
NEXT_PUBLIC_UPI_ID=sourasantadutta@oksbi
NEXT_PUBLIC_UPI_NAME=Sourasanta Dutta
NEXT_PUBLIC_FIXED_PRICE=20
```

### Step 4: Set Up Blob Storage (2 min)
1. In Vercel project → Storage → Create Blob
2. Copy `BLOB_READ_WRITE_TOKEN`
3. Add to environment variables
4. Redeploy

### Step 5: Initialize Database (1 min)
Visit: `https://your-app.vercel.app/api/init-db`

---

## 📋 Quick Commands

### Local Development
```bash
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm start               # Start production server
```

### Git Commands
```bash
git status              # Check status
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to GitHub
```

---

## 🔧 Troubleshooting

### QR Code Not Showing
→ Check `public/payment-qr.png` exists and is valid image

### Can't Login as Admin
→ Visit `/api/init-db` first to create admin account

### Database Error
→ Check Supabase connection strings in environment variables

### Build Fails
→ Check Vercel build logs for specific error

---

## 📞 Important URLs

After deployment, your app will have these URLs:

- **Homepage:** `https://your-app.vercel.app`
- **Admin Panel:** `https://your-app.vercel.app/admin`
- **Login:** `https://your-app.vercel.app/login`
- **Register:** `https://your-app.vercel.app/register`
- **Init DB:** `https://your-app.vercel.app/api/init-db`

---

## 📚 Documentation Files

For detailed information, check:

1. **FINAL_SUMMARY.md** - Complete project overview
2. **VERCEL_DEPLOYMENT.md** - Step-by-step deployment
3. **DEPLOYMENT_CHECKLIST.md** - Quick checklist
4. **README.md** - Main documentation
5. **FAQ.md** - Common questions

---

## ✅ Deployment Checklist

- [ ] Save QR code to `public/payment-qr.png`
- [ ] Create Supabase account
- [ ] Get Supabase connection strings
- [ ] Deploy to Vercel
- [ ] Add environment variables
- [ ] Set up Blob storage
- [ ] Visit `/api/init-db`
- [ ] Test admin login
- [ ] Upload test subject
- [ ] Test payment flow

---

## 🎯 Success Indicators

Your app is working when:
- ✅ Homepage loads
- ✅ Can login as admin
- ✅ Can upload subjects
- ✅ QR code displays on payment page
- ✅ Can submit transaction ID
- ✅ Can verify payments in admin panel
- ✅ Can view PDFs after verification

---

## 💡 Pro Tips

1. **Change admin password** immediately after deployment
2. **Test payment flow** before sharing with users
3. **Monitor Vercel logs** for any errors
4. **Set up custom domain** for professional look
5. **Enable Vercel Analytics** to track usage

---

**Need Help?** Check VERCEL_DEPLOYMENT.md for detailed instructions!

**Project Status:** ✅ READY TO DEPLOY
**Last Updated:** January 19, 2025
