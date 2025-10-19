# 🗄️ Supabase Database Setup Guide

## 📋 Complete Setup Instructions

### Step 1: Create Supabase Account & Project

1. **Go to Supabase:**
   - Visit: https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub (recommended) or email

2. **Create New Project:**
   - Click "New Project"
   - Select or create an organization
   - Fill in project details:
     - **Name:** `studyhelper` (or any name you prefer)
     - **Database Password:** Create a strong password
       - **IMPORTANT:** Save this password securely!
       - Example: `MySecurePass123!@#`
     - **Region:** Select closest to your users
       - For India: `ap-south-1` (Mumbai)
       - For US: `us-east-1` (N. Virginia)
     - **Pricing Plan:** Free (sufficient for starting)
   
3. **Wait for Setup:**
   - Project creation takes 2-3 minutes
   - You'll see a progress indicator
   - Don't close the browser

---

### Step 2: Get Database Connection Strings

Once your project is ready:

1. **Navigate to Database Settings:**
   - Click on **Settings** (gear icon) in the left sidebar
   - Click **Database** in the settings menu

2. **Find Connection Info Section:**
   - Scroll down to **Connection string**
   - You'll see a dropdown with different modes

3. **Copy All Three Connection Strings:**

   **A) Transaction Pooler (for POSTGRES_URL):**
   ```
   Mode: Transaction
   Format: URI
   
   Example:
   postgresql://postgres.abcdefghijk:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   ```
   - Replace `[YOUR-PASSWORD]` with your actual database password
   - Port: **6543**
   - Save this as: `POSTGRES_URL`

   **B) Session Pooler (for POSTGRES_PRISMA_URL):**
   ```
   Mode: Session
   Format: URI
   
   Example:
   postgresql://postgres.abcdefghijk:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   ```
   - Replace `[YOUR-PASSWORD]` with your actual database password
   - Add query parameters: `?pgbouncer=true&connect_timeout=15`
   - Final URL:
   ```
   postgresql://postgres.abcdefghijk:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
   ```
   - Save this as: `POSTGRES_PRISMA_URL`

   **C) Direct Connection (for POSTGRES_URL_NON_POOLING):**
   ```
   Mode: Direct connection
   Format: URI
   
   Example:
   postgresql://postgres.abcdefghijk:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
   ```
   - Replace `[YOUR-PASSWORD]` with your actual database password
   - Port: **5432** (different from pooler!)
   - Save this as: `POSTGRES_URL_NON_POOLING`

---

### Step 3: Configure Network Access

1. **Allow Vercel IP Addresses:**
   - In Supabase, go to **Settings** → **Database**
   - Scroll to **Connection pooling**
   - By default, Supabase allows all IPs (0.0.0.0/0)
   - This is fine for development and works with Vercel

2. **Enable Connection Pooling:**
   - Should be enabled by default
   - Verify in Settings → Database → Connection pooling

---

### Step 4: Update Local Environment File

1. **Create `.env` file:**
   ```bash
   # In your project root
   cp .env.example .env
   ```

2. **Edit `.env` with your actual values:**
   ```env
   # Database (Supabase) - Replace with YOUR actual values
   POSTGRES_URL=postgresql://postgres.xxxxx:YourPassword@aws-0-region.pooler.supabase.com:6543/postgres
   POSTGRES_PRISMA_URL=postgresql://postgres.xxxxx:YourPassword@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
   POSTGRES_URL_NON_POOLING=postgresql://postgres.xxxxx:YourPassword@aws-0-region.pooler.supabase.com:5432/postgres

   # Blob Storage (will get from Vercel later)
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

   # NextAuth (generate random secret)
   NEXTAUTH_SECRET=generate_this_using_openssl_rand_base64_32
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
   # Run in terminal:
   openssl rand -base64 32
   
   # Copy the output and use it as NEXTAUTH_SECRET
   ```

---

### Step 5: Test Local Connection

1. **Install dependencies (if not done):**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Initialize database:**
   - Open browser: http://localhost:3000/api/init-db
   - You should see:
   ```json
   {
     "message": "Database initialized successfully",
     "adminEmail": "sourasantadutta@gmail.com"
   }
   ```

4. **Verify in Supabase:**
   - Go to Supabase Dashboard
   - Click **Table Editor** in sidebar
   - You should see 3 tables:
     - `users`
     - `subjects`
     - `payments`

5. **Test Admin Login:**
   - Go to: http://localhost:3000/login
   - Email: `sourasantadutta@gmail.com`
   - Password: `Loken@th7782`
   - Should login successfully

---

### Step 6: Prepare for Vercel Deployment

1. **Update `.env.example` with notes:**
   ```env
   # Database (Supabase)
   # Get these from: Supabase Dashboard → Settings → Database → Connection string
   POSTGRES_URL=your_supabase_transaction_pooler_url_port_6543
   POSTGRES_PRISMA_URL=your_supabase_session_pooler_url_port_6543_with_pgbouncer_params
   POSTGRES_URL_NON_POOLING=your_supabase_direct_connection_url_port_5432

   # Blob Storage
   # Get from: Vercel Dashboard → Storage → Blob → Create
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

   # NextAuth
   # Generate using: openssl rand -base64 32
   NEXTAUTH_SECRET=your_nextauth_secret_here
   # Update this to your Vercel URL after deployment
   NEXTAUTH_URL=http://localhost:3000

   # Admin Credentials
   ADMIN_EMAIL=sourasantadutta@gmail.com
   ADMIN_PASSWORD=Loken@th7782

   # UPI Payment Details
   NEXT_PUBLIC_UPI_ID=sourasantadutta@oksbi
   NEXT_PUBLIC_UPI_NAME=Sourasanta Dutta

   # Fixed Price for all subjects (in INR)
   NEXT_PUBLIC_FIXED_PRICE=20
   ```

2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update Supabase configuration"
   git push
   ```

---

### Step 7: Deploy to Vercel

1. **Go to Vercel:**
   - Visit: https://vercel.com/new
   - Import your GitHub repository: `iamsoura005/studyhelper`

2. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Add Environment Variables:**
   Click "Environment Variables" and add ALL of these:

   ```
   Name: POSTGRES_URL
   Value: [paste your actual Supabase transaction pooler URL]
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: POSTGRES_PRISMA_URL
   Value: [paste your actual Supabase session pooler URL with params]
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: POSTGRES_URL_NON_POOLING
   Value: [paste your actual Supabase direct connection URL]
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: NEXTAUTH_SECRET
   Value: [paste your generated secret from openssl]
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: NEXTAUTH_URL
   Value: https://your-app-name.vercel.app
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: ADMIN_EMAIL
   Value: sourasantadutta@gmail.com
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: ADMIN_PASSWORD
   Value: Loken@th7782
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: NEXT_PUBLIC_UPI_ID
   Value: sourasantadutta@oksbi
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: NEXT_PUBLIC_UPI_NAME
   Value: Sourasanta Dutta
   Environments: ✓ Production ✓ Preview ✓ Development

   Name: NEXT_PUBLIC_FIXED_PRICE
   Value: 20
   Environments: ✓ Production ✓ Preview ✓ Development
   ```

4. **Deploy:**
   - Click **Deploy**
   - Wait for build to complete (2-3 minutes)

---

### Step 8: Set Up Vercel Blob Storage

1. **After deployment, go to your project:**
   - Click **Storage** tab
   - Click **Create Database**
   - Select **Blob**
   - Click **Continue**
   - Name: `studyhelper-storage`
   - Click **Create**

2. **Copy the token:**
   - After creation, copy `BLOB_READ_WRITE_TOKEN`

3. **Add to environment variables:**
   - Go to **Settings** → **Environment Variables**
   - Add new:
     - Name: `BLOB_READ_WRITE_TOKEN`
     - Value: [paste token]
     - Environments: All three

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click latest deployment → **Redeploy**

---

### Step 9: Initialize Production Database

1. **Visit initialization endpoint:**
   ```
   https://your-app-name.vercel.app/api/init-db
   ```

2. **You should see:**
   ```json
   {
     "message": "Database initialized successfully",
     "adminEmail": "sourasantadutta@gmail.com"
   }
   ```

3. **Verify in Supabase:**
   - Go to Supabase → Table Editor
   - Check that tables are created
   - Check `users` table has admin user

---

### Step 10: Test Your Deployment

1. **Test Homepage:**
   - Visit: `https://your-app-name.vercel.app`
   - Should load with animated background

2. **Test Admin Login:**
   - Go to: `https://your-app-name.vercel.app/login`
   - Email: `sourasantadutta@gmail.com`
   - Password: `Loken@th7782`
   - Should redirect to admin panel

3. **Test Subject Upload:**
   - Upload a test PDF
   - Check if it appears in subjects list

4. **Test Payment Flow:**
   - Register as a student
   - Try to purchase a subject
   - Verify QR code displays

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] All 3 connection strings copied
- [ ] Passwords replaced in connection strings
- [ ] Local `.env` file configured
- [ ] Local database initialized successfully
- [ ] Admin can login locally
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] All 10 environment variables added to Vercel
- [ ] NEXTAUTH_URL updated to Vercel URL
- [ ] Blob storage created
- [ ] BLOB_READ_WRITE_TOKEN added
- [ ] Production database initialized
- [ ] Admin can login on production
- [ ] Subject upload works
- [ ] Payment flow works

---

## 🔍 Database Schema

Your Supabase database will have these tables:

### `users` Table
```sql
id              SERIAL PRIMARY KEY
email           VARCHAR(255) UNIQUE NOT NULL
password        VARCHAR(255) NOT NULL
role            VARCHAR(50) DEFAULT 'student'
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### `subjects` Table
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(255) NOT NULL
description     TEXT
price           DECIMAL(10, 2) NOT NULL
pdf_url         TEXT NOT NULL
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### `payments` Table
```sql
id              SERIAL PRIMARY KEY
student_email   VARCHAR(255) NOT NULL
subject_id      INTEGER REFERENCES subjects(id)
amount          DECIMAL(10, 2) NOT NULL
transaction_id  VARCHAR(255) NOT NULL
status          VARCHAR(50) DEFAULT 'pending'
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

## 🐛 Troubleshooting

### Error: "Connection refused"
- Check if connection strings are correct
- Verify password is correct (no typos)
- Ensure Supabase project is active

### Error: "relation does not exist"
- Visit `/api/init-db` to create tables
- Check Supabase Table Editor to verify tables

### Error: "password authentication failed"
- Double-check password in connection strings
- Password is case-sensitive
- No extra spaces before/after password

### Error: "too many connections"
- Use pooled connections (port 6543)
- Don't use direct connection for web requests
- Check connection pooling is enabled in Supabase

---

## 🎯 Connection String Format Reference

**Transaction Pooler:**
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Session Pooler (with params):**
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
```

**Direct Connection:**
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

**Key Points:**
- `[PROJECT_REF]` = Your unique project identifier
- `[PASSWORD]` = Your database password
- `[REGION]` = Your selected region (e.g., ap-south-1)
- Transaction/Session use port **6543**
- Direct uses port **5432**

---

## 🎉 Success!

Once all steps are complete, your StudyHelper platform will be:
- ✅ Connected to Supabase database
- ✅ Deployed on Vercel
- ✅ Fully functional
- ✅ Ready for users

**Your app URL:** `https://your-app-name.vercel.app`

---

**Need help?** Check Vercel deployment logs or Supabase logs for specific errors.
