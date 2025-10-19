# StudyHelper - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File

Create `.env` in the root directory:

```env
# Database - For local testing, use any PostgreSQL database
POSTGRES_URL=postgresql://user:password@localhost:5432/studyhelper

# Blob Storage - Get from Vercel or use placeholder for testing
BLOB_READ_WRITE_TOKEN=vercel_blob_token_here

# Authentication
NEXTAUTH_SECRET=your-secret-key-here-use-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@studyhelper.com
ADMIN_PASSWORD=admin123

# UPI Payment (Your UPI details for QR code)
NEXT_PUBLIC_UPI_ID=yourname@paytm
NEXT_PUBLIC_UPI_NAME=Your Name
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Initialize Database

Open browser and visit:
```
http://localhost:3000/api/init-db
```

You should see: `{"message":"Database initialized successfully"}`

### 5. Login as Admin

1. Go to: http://localhost:3000/login
2. Email: `admin@studyhelper.com`
3. Password: `admin123` (or whatever you set in .env)

### 6. Upload Your First Subject

1. Click "Admin" in the menu
2. Fill in the form:
   - Subject Name: "Mathematics Chapter 1"
   - Description: "Algebra and equations"
   - Price: 99
   - Upload a PDF file
3. Click "Upload Subject"

### 7. Test Student Flow

1. Logout (refresh and clear cookies)
2. Go to: http://localhost:3000/register
3. Create a student account
4. Browse subjects on homepage
5. Click "Purchase Access" on a subject
6. Note the QR code and payment details
7. Enter any transaction ID (e.g., "TEST123456")
8. Submit payment

### 8. Verify Payment (as Admin)

1. Login as admin again
2. Go to Admin panel
3. Click "Payments" tab
4. Click "Verify" on the pending payment

### 9. Access Notes (as Student)

1. Login as student
2. Go to "My Notes"
3. Click "View Notes" on verified purchase
4. View/download the PDF

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: "#5227FF",  // Change this
    light: "#B19EEF",    // And this
  },
}
```

### Change Logo

Replace `public/logo.svg` with your logo

### Modify Background Animation

Edit `app/page.tsx` - find the `<PixelBlast>` component and adjust:
- `color="#B19EEF"` - Change color
- `pixelSize={6}` - Change pixel size
- `speed={0.6}` - Change animation speed

## 📱 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Browse subjects |
| Login | `/login` | User login |
| Register | `/register` | Create account |
| Admin Panel | `/admin` | Upload subjects, verify payments |
| Payment | `/pay/[id]` | Make payment for subject |
| My Notes | `/my-notes` | View purchased subjects |
| PDF Viewer | `/notes/[id]` | View/download PDF |

## 🔧 Common Issues

### "Database connection failed"
- Make sure PostgreSQL is running
- Check connection string in `.env`
- Try using Vercel Postgres (free tier available)

### "Cannot upload PDF"
- Get Vercel Blob token from vercel.com
- Or implement local file storage (modify `lib/storage.ts`)

### "QR code not showing"
- Set `NEXT_PUBLIC_UPI_ID` in `.env`
- Set `NEXT_PUBLIC_UPI_NAME` in `.env`

### "Admin panel not accessible"
- Visit `/api/init-db` first
- Check admin credentials in `.env`
- Clear browser cookies and try again

## 🚀 Deploy to Vercel

### One-Click Deploy

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables
6. Click "Deploy"
7. Visit `your-app.vercel.app/api/init-db`

### Required Environment Variables for Production

```env
POSTGRES_URL=<from_vercel_postgres>
POSTGRES_PRISMA_URL=<from_vercel_postgres>
POSTGRES_URL_NON_POOLING=<from_vercel_postgres>
BLOB_READ_WRITE_TOKEN=<from_vercel_blob>
NEXTAUTH_SECRET=<random_string>
NEXTAUTH_URL=https://your-app.vercel.app
ADMIN_EMAIL=admin@studyhelper.com
ADMIN_PASSWORD=<secure_password>
NEXT_PUBLIC_UPI_ID=yourname@upi
NEXT_PUBLIC_UPI_NAME=Your Name
```

## 📚 Next Steps

- [ ] Customize branding (logo, colors)
- [ ] Add your UPI payment details
- [ ] Upload study materials
- [ ] Test complete payment flow
- [ ] Deploy to production
- [ ] Share with students!

## 💡 Tips

1. **Test locally first** - Make sure everything works before deploying
2. **Use strong passwords** - Change default admin password
3. **Backup database** - Regular backups are important
4. **Monitor payments** - Check admin panel regularly
5. **Keep updated** - Run `npm update` periodically

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Check `SETUP.md` for deployment guide
- Open an issue on GitHub
- Review the code comments

---

**That's it! You're ready to go! 🎉**

Start with `npm run dev` and visit http://localhost:3000
