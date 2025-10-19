# StudyHelper - Frequently Asked Questions (FAQ)

## 🚀 Getting Started

### Q: How do I install StudyHelper?
**A:** Follow these steps:
```bash
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
# Visit http://localhost:3000/api/init-db
```

### Q: What are the system requirements?
**A:** 
- Node.js 18 or higher
- PostgreSQL database
- Modern web browser
- Internet connection

### Q: Do I need coding knowledge to use this?
**A:** No coding knowledge needed to use the platform. Basic technical knowledge required for setup and deployment.

### Q: Is this free to use?
**A:** Yes, the code is free. You'll need to pay for hosting (Vercel has a free tier) and database services.

## 🔐 Authentication & Users

### Q: How do I create an admin account?
**A:** Admin account is automatically created when you visit `/api/init-db`. Credentials are set in your `.env` file.

### Q: Can I have multiple admin accounts?
**A:** Currently, the system supports one admin account. You can modify the code to add more admins.

### Q: What if I forget my admin password?
**A:** You can reset it by:
1. Updating `ADMIN_PASSWORD` in `.env`
2. Running a database query to update the password
3. Or re-initializing the database (⚠️ this deletes all data)

### Q: How secure is the authentication?
**A:** Very secure:
- Passwords hashed with bcrypt
- JWT tokens for sessions
- HTTPS in production
- CSRF protection built-in

### Q: Can students change their passwords?
**A:** Not in the current version. This feature can be added in future updates.

## 💳 Payment System

### Q: What payment methods are supported?
**A:** Currently only UPI (Unified Payments Interface) is supported. This works for all Indian banks.

### Q: How does the QR code payment work?
**A:** 
1. Student scans QR code with any UPI app
2. Payment details are pre-filled
3. Student completes payment in their app
4. Student submits transaction ID on website
5. Admin verifies payment manually

### Q: Can I add other payment methods?
**A:** Yes! You can integrate:
- Razorpay
- Stripe
- PayPal
- Bank transfers
Requires code modifications.

### Q: Is payment verification automatic?
**A:** No, admin must manually verify each payment. Automated verification can be added using payment gateway webhooks.

### Q: What if a student makes a wrong payment?
**A:** Admin can reject the payment and handle refunds manually outside the system.

### Q: How long does verification take?
**A:** Depends on admin availability. Typically within 24 hours.

## 📚 Content Management

### Q: What file formats are supported?
**A:** Currently only PDF files are supported.

### Q: What's the maximum file size?
**A:** Default is 50MB per file. This can be increased in Vercel Blob settings.

### Q: Can I upload videos?
**A:** Not in current version. Video support can be added in future updates.

### Q: How do I delete a subject?
**A:** Login as admin → Admin Panel → Click delete icon next to subject.

### Q: Can I edit a subject after uploading?
**A:** Not directly. You need to delete and re-upload. Edit functionality can be added.

### Q: Where are PDFs stored?
**A:** PDFs are stored in Vercel Blob Storage (or any S3-compatible storage you configure).

## 🎨 Customization

### Q: How do I change the logo?
**A:** Replace `public/logo.svg` with your logo file.

### Q: How do I change colors?
**A:** Edit `tailwind.config.ts` and update the color values.

### Q: Can I disable the animated background?
**A:** Yes, remove or comment out the `<PixelBlast>` component in `app/page.tsx`.

### Q: How do I change the menu position?
**A:** In `<StaggeredMenu>` component, change `position="right"` to `position="left"`.

### Q: Can I add more pages?
**A:** Yes! Create new folders in the `app/` directory following Next.js conventions.

## 🚀 Deployment

### Q: Where can I deploy this?
**A:** Recommended platforms:
- **Vercel** (easiest, recommended)
- Netlify
- Railway
- AWS
- DigitalOcean

### Q: Do I need a custom domain?
**A:** No, Vercel provides a free subdomain. Custom domains are optional.

### Q: How much does hosting cost?
**A:** 
- **Vercel Free Tier:** $0/month (sufficient for small projects)
- **Vercel Pro:** $20/month (for larger projects)
- Database and storage costs depend on usage

### Q: How do I set up a custom domain?
**A:** 
1. Buy domain from registrar
2. Add domain in Vercel dashboard
3. Update DNS records
4. Update `NEXTAUTH_URL` in environment variables

### Q: Can I deploy without Vercel?
**A:** Yes, but you'll need to:
- Set up your own database
- Configure file storage
- Handle environment variables
- Set up HTTPS

## 🔧 Technical Questions

### Q: What database does it use?
**A:** PostgreSQL. Works with Vercel Postgres, Supabase, Railway, or any PostgreSQL database.

### Q: Can I use MySQL instead?
**A:** Yes, but requires modifying the SQL queries in `lib/db.ts`.

### Q: How do I backup my data?
**A:** 
- **Database:** Use `pg_dump` or Vercel's backup feature
- **Files:** Download from Blob storage
- Schedule regular backups

### Q: How do I migrate to production?
**A:** Follow the DEPLOYMENT.md guide. Key steps:
1. Set up production database
2. Configure environment variables
3. Deploy code
4. Initialize database
5. Test thoroughly

### Q: Can I use this offline?
**A:** No, it requires internet connection for database and file storage.

## 🐛 Troubleshooting

### Q: "Database connection failed" error
**A:** Check:
- Database URL is correct
- Database is running
- Network connectivity
- IP whitelisting (if required)

### Q: PDF upload fails
**A:** Check:
- File size under limit
- Blob storage token is valid
- Network connection
- File is valid PDF

### Q: QR code doesn't show
**A:** Ensure:
- `NEXT_PUBLIC_UPI_ID` is set
- `NEXT_PUBLIC_UPI_NAME` is set
- Environment variables are loaded
- Page is refreshed after setting variables

### Q: Can't login as admin
**A:** Verify:
- Database is initialized (`/api/init-db`)
- Admin credentials match `.env`
- No typos in email/password
- Cookies are enabled

### Q: PDF viewer shows blank page
**A:** Try:
- Download PDF instead
- Check PDF URL is accessible
- Verify browser supports PDF viewing
- Check CORS settings

## 💰 Pricing & Business

### Q: Can I sell this to clients?
**A:** Yes, you can use this for commercial purposes. Check the license.

### Q: How do I handle refunds?
**A:** Currently manual process:
1. Admin rejects payment
2. Process refund outside system
3. Inform student

### Q: Can I charge different prices for different students?
**A:** Not currently. All students pay the same price per subject.

### Q: How do I track revenue?
**A:** Check the Payments tab in admin panel. For detailed analytics, export data or add analytics tools.

### Q: Can students purchase multiple subjects?
**A:** Yes, students can purchase as many subjects as they want.

## 📱 Mobile & Accessibility

### Q: Is there a mobile app?
**A:** No mobile app yet. The website is mobile-responsive and works on all devices.

### Q: Does it work on tablets?
**A:** Yes, fully responsive design works on tablets.

### Q: Is it accessible for screen readers?
**A:** Yes, includes ARIA labels and semantic HTML for accessibility.

### Q: Can I use it on slow internet?
**A:** Yes, but PDF loading may be slower. Consider compressing PDFs.

## 🔒 Security & Privacy

### Q: Is student data secure?
**A:** Yes:
- Passwords are hashed
- HTTPS in production
- Secure database
- No data sold to third parties

### Q: Do you store payment information?
**A:** Only transaction IDs are stored. No card/bank details.

### Q: Can students see other students' data?
**A:** No, students can only see their own purchases.

### Q: How do I comply with GDPR?
**A:** Add:
- Privacy policy
- Terms of service
- Cookie consent
- Data deletion option

### Q: Can I delete user data?
**A:** Yes, run SQL queries to delete user records. Add a UI for this if needed.

## 🎓 Usage & Best Practices

### Q: How many subjects can I upload?
**A:** Unlimited subjects (limited only by storage space).

### Q: How many students can register?
**A:** Unlimited students (limited only by database capacity).

### Q: What's the best PDF size?
**A:** Keep PDFs under 10MB for faster loading. Compress if needed.

### Q: How often should I check payments?
**A:** Check daily or set up notifications for new payments.

### Q: Should I verify all payments?
**A:** Yes, verify each payment to prevent fraud.

## 🔄 Updates & Maintenance

### Q: How do I update dependencies?
**A:** Run:
```bash
npm update
npm audit fix
```

### Q: Will updates break my site?
**A:** Test updates locally first before deploying to production.

### Q: How do I add new features?
**A:** 
1. Modify code locally
2. Test thoroughly
3. Deploy to production
4. Monitor for issues

### Q: Where can I get help?
**A:** 
- Check documentation files
- Review code comments
- Open GitHub issue
- Contact support

## 📊 Performance

### Q: How fast is the website?
**A:** Very fast with Vercel:
- Global CDN
- Edge caching
- Optimized builds
- Fast database queries

### Q: Can it handle high traffic?
**A:** Yes, Vercel auto-scales. Database may need upgrading for very high traffic.

### Q: How do I optimize performance?
**A:** 
- Compress PDFs
- Enable caching
- Optimize images
- Use CDN

## 🌐 Internationalization

### Q: Can I use this in other countries?
**A:** Yes, but:
- UPI only works in India
- Add other payment methods for other countries
- Translate UI text if needed

### Q: How do I change currency?
**A:** Modify `formatCurrency` function in `lib/utils.ts`.

### Q: Can I add multiple languages?
**A:** Yes, requires implementing i18n (internationalization).

## 📞 Support

### Q: Where can I get support?
**A:** 
- Check documentation files
- Review FAQ (this file)
- Open GitHub issue
- Email: admin@studyhelper.com

### Q: Is there a community?
**A:** Create a Discord/Slack community for your users!

### Q: Can I hire someone to customize this?
**A:** Yes, hire a Next.js developer for customizations.

## 🎉 Success Stories

### Q: Who is using StudyHelper?
**A:** This is a new platform. Be the first success story!

### Q: Can I showcase my implementation?
**A:** Yes! Share your success story with the community.

---

## 💡 Didn't find your answer?

1. Check the documentation files:
   - README.md
   - SETUP.md
   - QUICKSTART.md
   - DEPLOYMENT.md

2. Review the code:
   - Code is well-commented
   - Follow the structure

3. Ask for help:
   - Open GitHub issue
   - Contact support
   - Join community

**Happy teaching! 📚✨**
