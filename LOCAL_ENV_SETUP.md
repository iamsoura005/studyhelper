# 🔐 Local Environment Setup (SECURE)

## ⚠️ IMPORTANT SECURITY NOTE

**NEVER commit real passwords to GitHub!**
- `.env.example` is a template (no real passwords)
- `.env` contains real passwords (protected by .gitignore)

---

## 📋 Create Your Local .env File

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your ACTUAL values:**

   Open `.env` and replace placeholders with real values:

   ```env
   # Database (Supabase) - WITH YOUR ACTUAL PASSWORD
   POSTGRES_URL=postgresql://postgres.iwkjiqerihpjcrakumqy:Loken@th7782@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   POSTGRES_PRISMA_URL=postgresql://postgres.iwkjiqerihpjcrakumqy:Loken@th7782@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
   POSTGRES_URL_NON_POOLING=postgresql://postgres.iwkjiqerihpjcrakumqy:Loken@th7782@aws-0-ap-south-1.pooler.supabase.com:5432/postgres

   # Blob Storage (get from Vercel after creating Blob storage)
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

   # NextAuth (generate using: openssl rand -base64 32)
   NEXTAUTH_SECRET=your_generated_secret_here
   NEXTAUTH_URL=http://localhost:3000

   # Admin Credentials
   ADMIN_EMAIL=sourasantadutta@gmail.com
   ADMIN_PASSWORD=Loken@th7782

   # UPI Payment Details
   NEXT_PUBLIC_UPI_ID=sourasantadutta@oksbi
   NEXT_PUBLIC_UPI_NAME=Sourasanta Dutta

   # Fixed Price
   NEXT_PUBLIC_FIXED_PRICE=20
   ```

3. **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as `NEXTAUTH_SECRET` value.

---

## 🔒 For Vercel Deployment

Add these SAME values to Vercel:
1. Go to Vercel → Your project → Settings → Environment Variables
2. Add each variable with the actual values
3. Check all 3 environments (Production, Preview, Development)

**Your connection strings for Vercel:**
```
POSTGRES_URL:
postgresql://postgres.iwkjiqerihpjcrakumqy:Loken@th7782@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

POSTGRES_PRISMA_URL:
postgresql://postgres.iwkjiqerihpjcrakumqy:Loken@th7782@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15

POSTGRES_URL_NON_POOLING:
postgresql://postgres.iwkjiqerihpjcrakumqy:Loken@th7782@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
```

---

## ✅ Verification

- [ ] `.env` file created locally
- [ ] Real password added to `.env` (not .env.example)
- [ ] `.env` is in `.gitignore` (already done)
- [ ] NEXTAUTH_SECRET generated
- [ ] All values added to Vercel
- [ ] Can run `npm run dev` locally
- [ ] Can visit http://localhost:3000/api/init-db

---

## 🚫 What NOT to Do

- ❌ Don't commit `.env` to GitHub
- ❌ Don't put real passwords in `.env.example`
- ❌ Don't share your `.env` file publicly
- ❌ Don't hardcode passwords in code files

---

## ✅ What to Do

- ✅ Keep real passwords in `.env` (local only)
- ✅ Keep `.env.example` as a template (no real passwords)
- ✅ Add real values to Vercel environment variables
- ✅ Use `.gitignore` to protect `.env`

---

**Your `.env` file is safe - it won't be pushed to GitHub!**
