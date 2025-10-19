# StudyHelper - Online Study Material Platform

A modern web application for educators to upload and sell study materials (PDFs) to students with UPI payment integration.

## 🚀 **READY TO DEPLOY!**

**Quick Start:** See `START_HERE.md` for 3-step deployment guide (20 minutes)

**GitHub:** https://github.com/iamsoura005/studyhelper

## Features

- 🎨 Beautiful animated background with PixelBlast
- 🔐 Secure authentication with NextAuth.js
- 📚 Subject management and PDF uploads
- 💳 UPI payment system with QR code generation
- ✅ Admin panel for payment verification
- 📱 Fully responsive design
- 🎭 Animated navigation menu

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** Vercel Postgres
- **Storage:** Vercel Blob Storage
- **Animations:** GSAP, Three.js
- **UI Components:** Custom components with Lucide icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account (for deployment)
- PostgreSQL database (Vercel Postgres recommended)
- Blob storage (Vercel Blob recommended)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd StudyHelper
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Database
POSTGRES_URL=your_vercel_postgres_url
POSTGRES_PRISMA_URL=your_vercel_postgres_prisma_url
POSTGRES_URL_NON_POOLING=your_vercel_postgres_non_pooling_url

# Blob Storage
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@studyhelper.com
ADMIN_PASSWORD=your_secure_password

# UPI Payment Details (for QR code generation)
NEXT_PUBLIC_UPI_ID=your-upi-id@bank
NEXT_PUBLIC_UPI_NAME=Your Name
```

4. Initialize the database:
```bash
# Start the development server first
npm run dev

# Then visit http://localhost:3000/api/init-db to initialize the database
```

5. Access the application:
- Homepage: http://localhost:3000
- Admin Panel: http://localhost:3000/admin (login with admin credentials)

## Project Structure

```
StudyHelper/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth configuration
│   │   ├── subjects/     # Subject management
│   │   ├── payments/     # Payment handling
│   │   ├── register/     # User registration
│   │   └── init-db/      # Database initialization
│   ├── admin/            # Admin panel
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── pay/              # Payment pages
│   ├── notes/            # PDF viewer
│   ├── my-notes/         # User's purchased notes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   ├── PixelBlast.tsx    # Animated background component
│   ├── PixelBlast.css
│   ├── StaggeredMenu.tsx # Navigation menu
│   └── StaggeredMenu.css
├── lib/
│   ├── auth.ts           # Authentication configuration
│   ├── db.ts             # Database queries
│   ├── storage.ts        # File storage utilities
│   └── utils.ts          # Utility functions
└── public/
    └── logo.svg          # Application logo
```

## Usage

### For Students

1. **Register/Login:** Create an account or login
2. **Browse Subjects:** View available study materials on the homepage
3. **Purchase:** Click on a subject to see payment details
4. **Pay via UPI:** Scan the QR code with any UPI app
5. **Submit Transaction ID:** Enter your transaction ID after payment
6. **Wait for Verification:** Admin will verify your payment
7. **Access Notes:** Once verified, view and download your notes

### For Admins

1. **Login:** Use admin credentials to login
2. **Upload Subjects:** Add new study materials with PDFs
3. **Verify Payments:** Review and approve/reject student payments
4. **Manage Content:** Delete subjects if needed

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Connect your repository to Vercel

3. Configure environment variables in Vercel dashboard

4. Set up Vercel Postgres:
   - Go to Storage tab in Vercel
   - Create a new Postgres database
   - Copy the connection strings to environment variables

5. Set up Vercel Blob Storage:
   - Go to Storage tab in Vercel
   - Create a new Blob store
   - Copy the token to environment variables

6. Deploy the application

7. After deployment, visit `/api/init-db` to initialize the database

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `POSTGRES_URL` | PostgreSQL connection string | Yes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `ADMIN_EMAIL` | Admin email address | Yes |
| `ADMIN_PASSWORD` | Admin password | Yes |
| `NEXT_PUBLIC_UPI_ID` | UPI ID for payments | Yes |
| `NEXT_PUBLIC_UPI_NAME` | Name for UPI payments | Yes |

## Security Notes

- Never commit `.env` file to version control
- Use strong passwords for admin accounts
- Keep your `NEXTAUTH_SECRET` secure
- Regularly update dependencies
- Review payment verifications carefully

## Features Breakdown

### PixelBlast Background
- Interactive animated background using Three.js
- Ripple effects on click/touch
- Customizable colors and patterns
- Liquid distortion effects

### StaggeredMenu
- Smooth GSAP animations
- Responsive design
- Customizable colors and positioning
- Accessible navigation

### Payment System
- UPI QR code generation
- Manual verification by admin
- Transaction tracking
- Payment history

### PDF Management
- Secure file uploads to Vercel Blob
- Access control based on payment status
- In-browser PDF viewing
- Download functionality

## Troubleshooting

### Database Connection Issues
- Ensure your Postgres connection strings are correct
- Check if the database is accessible from your deployment region

### PDF Upload Failures
- Verify Blob storage token is valid
- Check file size limits (default: 50MB)
- Ensure proper CORS configuration

### Authentication Problems
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your deployment URL
- Clear browser cookies and try again

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Contact: admin@studyhelper.com

## Acknowledgments

- PixelBlast component inspired by Bayer dithering techniques
- StaggeredMenu animations powered by GSAP
- UI components styled with Tailwind CSS
- Icons from Lucide React
