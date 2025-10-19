# 🔧 Fix: Vercel Environment Variable Error

## ❌ Error Message
```
Environment Variable "POSTGRES_URL" references Secret "postgres_url", which does not exist.
```

## ✅ Solution

This error occurs when you haven't set up your Supabase database yet or haven't added the actual connection strings to Vercel.

---

## 📋 Step-by-Step Fix

### Step 1: Create Supabase Database (5 minutes)

1. **Go to Supabase:**
   - Visit: https://supabase.com
   - Sign up or login

2. **Create New Project:**
   - Click "New Project"
   - Choose organization (or create one)
   - Fill in:
     - **Name:** StudyHelper (or any name)
     - **Database Password:** Create a strong password (SAVE THIS!)
     - **Region:** Choose closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get Connection Strings:**
   - Go to **Settings** (gear icon in sidebar)
   - Click **Database**
   - Scroll down to **Connection string**
   - You'll see different modes:

   **a) For POSTGRES_URL (Transaction Pooler):**
   - Select **"Transaction"** mode
   - Click **"URI"** tab
   - Copy the connection string
   - It looks like: `postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres`
   - **IMPORTANT:** Replace `[YOUR-PASSWORD]` with your actual database password

   **b) For POSTGRES_PRISMA_URL (Session Pooler):**
   - Select **"Session"** mode
   - Click **"URI"** tab
   - Copy the connection string
   - Add `?pgbouncer=true&connect_timeout=15` at the end
   - Example: `postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15`

   **c) For POSTGRES_URL_NON_POOLING (Direct Connection):**
   - Select **"Direct connection"** mode
   - Click **"URI"** tab
   - Copy the connection string
   - It uses port **5432** (not 6543)
   - Example: `postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:5432/postgres`

---

### Step 2: Add Variables to Vercel

1. **Go to Your Vercel Project:**
   - Visit: https://vercel.com/dashboard
   - Click on your `studyhelper` project

2. **Navigate to Settings:**
   - Click **Settings** tab
   - Click **Environment Variables** in left sidebar

3. **Add Each Variable:**
   Click "Add New" and enter:

   ```env
   # Database Variables (from Supabase)
   Name: POSTGRES_URL
   Value: postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:6543/postgres
   Environment: Production, Preview, Development (check all)

   Name: POSTGRES_PRISMA_URL
   Value: postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
   Environment: Production, Preview, Development (check all)

   Name: POSTGRES_URL_NON_POOLING
   Value: postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:5432/postgres
   Environment: Production, Preview, Development (check all)

   # NextAuth Secret (generate random string)
   Name: NEXTAUTH_SECRET
   Value: [Generate using: openssl rand -base64 32]
   Environment: Production, Preview, Development (check all)

   # NextAuth URL (your Vercel app URL)
   Name: NEXTAUTH_URL
   Value: https://your-app-name.vercel.app
   Environment: Production, Preview, Development (check all)

   # Admin Credentials (your updated credentials)
   Name: ADMIN_EMAIL
   Value: sourasantadutta@gmail.com
   Environment: Production, Preview, Development (check all)

   Name: ADMIN_PASSWORD
   Value: Loken@th7782
   Environment: Production, Preview, Development (check all)

   # UPI Payment Details
   Name: NEXT_PUBLIC_UPI_ID
   Value: sourasantadutta@oksbi
   Environment: Production, Preview, Development (check all)

   Name: NEXT_PUBLIC_UPI_NAME
   Value: Sourasanta Dutta
   Environment: Production, Preview, Development (check all)

   # Fixed Price
   Name: NEXT_PUBLIC_FIXED_PRICE
   Value: 20
   Environment: Production, Preview, Development (check all)
   ```

4. **Generate NEXTAUTH_SECRET:**
   - Open terminal/PowerShell
   - Run: `openssl rand -base64 32`
   - Copy the output
   - Use as NEXTAUTH_SECRET value

---

### Step 3: Set Up Blob Storage

1. **In Your Vercel Project:**
   - Click **Storage** tab
   - Click **Create Database**
   - Select **Blob**
   - Click **Continue**
   - Name it: `studyhelper-storage`
   - Click **Create**

2. **Copy the Token:**
   - After creation, you'll see `BLOB_READ_WRITE_TOKEN`
   - Copy the token value

3. **Add to Environment Variables:**
   - Go back to **Settings** → **Environment Variables**
   - Add new variable:
     - Name: `BLOB_READ_WRITE_TOKEN`
     - Value: [paste the token]
     - Environment: All three

---

### Step 4: Redeploy

1. **Trigger Redeployment:**
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Click **"Redeploy"** button
   - Or simply push a new commit to GitHub

2. **Wait for Build:**
   - Watch the build logs
   - Should complete successfully now

---

### Step 5: Initialize Database

1. **After Successful Deployment:**
   - Visit: `https://your-app-name.vercel.app/api/init-db`
   - You should see: `{"message":"Database initialized successfully"}`
   - This creates all tables and admin user

---

## 🎯 Quick Checklist

- [ ] Created Supabase project
- [ ] Copied all 3 database connection strings
- [ ] Replaced `[YOUR-PASSWORD]` with actual password
- [ ] Generated NEXTAUTH_SECRET
- [ ] Added all 10 environment variables in Vercel
- [ ] Created Blob storage
- [ ] Added BLOB_READ_WRITE_TOKEN
- [ ] Redeployed the project
- [ ] Visited `/api/init-db`
- [ ] Tested admin login

---

## 🔍 Verify Your Connection Strings

Your Supabase connection strings should look like this:

```
POSTGRES_URL:
postgresql://postgres.abcdefghijk:MyPassword123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

POSTGRES_PRISMA_URL:
postgresql://postgres.abcdefghijk:MyPassword123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15

POSTGRES_URL_NON_POOLING:
postgresql://postgres.abcdefghijk:MyPassword123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
```

**Key differences:**
- Transaction pooler: port **6543**, no query params
- Session pooler: port **6543**, with `?pgbouncer=true&connect_timeout=15`
- Direct connection: port **5432**, no query params

---

## ⚠️ Common Mistakes

1. **Using placeholder text** - Don't use `your_supabase_url`, use actual URL
2. **Forgetting password** - Replace `[YOUR-PASSWORD]` with real password
3. **Wrong port** - Transaction/Session use 6543, Direct uses 5432
4. **Missing query params** - PRISMA_URL needs `?pgbouncer=true&connect_timeout=15`
5. **Not selecting all environments** - Check Production, Preview, Development

---

## 🐛 Still Having Issues?

### Error: "Database connection failed"
- Verify password is correct in connection strings
- Check Supabase project is active (not paused)
- Ensure no extra spaces in connection strings

### Error: "BLOB_READ_WRITE_TOKEN not found"
- Create Blob storage in Vercel Storage tab
- Copy token and add to environment variables
- Redeploy after adding

### Error: "NEXTAUTH_SECRET is not set"
- Generate using: `openssl rand -base64 32`
- Add to environment variables
- Must be at least 32 characters

---

## ✅ Success!

Once all variables are set correctly:
1. Deployment will succeed
2. Visit your app URL
3. Go to `/api/init-db` to initialize
4. Login with: `sourasantadutta@gmail.com` / `Loken@th7782`
5. Start uploading subjects!

---

**Need more help?** Check the Vercel deployment logs for specific errors.
