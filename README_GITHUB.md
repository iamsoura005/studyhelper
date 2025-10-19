# StudyHelper - Online Study Material Platform

A modern, full-stack web application for educators to upload and sell study materials (PDFs) to students with UPI payment integration.

## 🚀 Features

- **User Authentication** - Secure login/registration with NextAuth.js
- **Role-Based Access** - Admin and Student roles
- **Subject Management** - Upload and manage PDF study materials
- **UPI Payment Integration** - QR code-based payment system
- **Payment Verification** - Admin panel for payment approval
- **PDF Viewer** - In-browser PDF viewing for verified purchases
- **Beautiful UI** - Animated background with PixelBlast
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, NextAuth.js
- **Database:** Supabase (PostgreSQL)
- **Storage:** Vercel Blob
- **Animations:** Three.js, GSAP
- **Payment:** UPI QR Code

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/iamsoura005/studyhelper.git
cd studyhelper
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- Supabase database URL
- Vercel Blob token
- NextAuth secret
- Admin credentials
- UPI details

4. Run development server:
```bash
npm run dev
```

5. Initialize database:
Visit `http://localhost:3000/api/init-db`

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy
5. Visit `/api/init-db` to initialize database

## 💰 Payment System

- **Fixed Price:** ₹20 per subject
- **UPI ID:** sourasantadutta@oksbi
- **Payment Method:** Scan QR code with any UPI app

## 👤 Default Admin Credentials

- **Email:** admin@studyhelper.com
- **Password:** Admin@123

⚠️ Change these credentials in production!

## 📝 Usage

### For Students
1. Register/Login
2. Browse subjects
3. Click "Purchase Access"
4. Scan QR code and pay ₹20
5. Submit transaction ID
6. Access notes after admin verification

### For Admins
1. Login with admin credentials
2. Upload subjects (PDF files)
3. Verify student payments
4. Manage content

## 🔒 Security

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Secure file storage
- Environment variable protection

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

**Sourasanta Dutta**
- UPI: sourasantadutta@oksbi
- GitHub: [@iamsoura005](https://github.com/iamsoura005)

## 🙏 Acknowledgments

- Next.js Team
- Vercel
- Supabase
- All open-source contributors

---

**Built with ❤️ using Next.js 14**
