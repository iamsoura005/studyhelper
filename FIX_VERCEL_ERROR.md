# 🔧 Fix Vercel Error: POSTGRES_URL References Secret

## ❌ The Error
```
Environment Variable "POSTGRES_URL" references Secret "postgres_url", which does not exist.
```

## ✅ The Solution

You need to add **actual database connection strings** to Vercel, not the Supabase URL/anon key.

---

## 📋 Step-by-Step Fix

### Step 1: Get Your Database Password

You need your Supabase database password. If you don't have it:

1. Go to: https://supabase.com/dashboard/project/iwkjiqerihpjcrakumqy/settings/database
2. Scroll to "Database password" section
3. Click **"Reset database password"**
4. Set a new password (e.g., `MySecurePass123`)
5. **SAVE IT SECURELY!**

---

### Step 2: Get Connection Strings from Supabase

1. **Go to Database Settings:**
   - Visit: https://supabase.com/dashboard/project/iwkjiqerihpjcrakumqy/settings/database
   - Scroll down to **"Connection string"** section

2. **Copy Transaction Pooler:**
   - Mode: **Transaction**
   - Format: **URI**
   - Copy the string
   - Replace `[YOUR-PASSWORD]` with your actual password
   - Example:
     ```
     postgresql://postgres.iwkjiqerihpjcrakumqy:MySecurePass123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
     ```

3. **Copy Session Pooler:**
   - Mode: **Session**
   - Format: **URI**
   - Copy and add `?pgbouncer=true&connect_timeout=15` at the end
   - Example:
     ```
     postgresql://postgres.iwkjiqerihpjcrakumqy:MySecurePass123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
     ```

4. **Copy Direct Connection:**
   - Mode: **Direct connection**
   - Format: **URI**
   - Copy the string (note port is **5432**)
   - Example:
     ```
     postgresql://postgres.iwkjiqerihpjcrakumqy:MySecurePass123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
     ```

---

### Step 3: Add to Vercel

1. **Go to Vercel Project:**
   - Visit: https://vercel.com/dashboard
   - Click your `studyhelper` project
   - Click **Settings** tab
   - Click **Environment Variables**

2. **Delete Old Variables (if any):**
   - If you see `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, or `POSTGRES_URL_NON_POOLING`
   - Click the three dots → Delete

3. **Add New Variables:**

   Click **"Add New"** and enter:

   **Variable 1:**
   ```
   Name: POSTGRES_URL
   Value: postgresql://postgres.iwkjiqerihpjcrakumqy:YOUR_ACTUAL_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   Environments: ✓ Production ✓ Preview ✓ Development
   ```

   **Variable 2:**
   ```
   Name: POSTGRES_PRISMA_URL
   Value: postgresql://postgres.iwkjiqerihpjcrakumqy:YOUR_ACTUAL_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
   Environments: ✓ Production ✓ Preview ✓ Development
   ```

   **Variable 3:**
   ```
   Name: POSTGRES_URL_NON_POOLING
   Value: postgresql://postgres.iwkjiqerihpjcrakumqy:YOUR_ACTUAL_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
   Environments: ✓ Production ✓ Preview ✓ Development
   ```

4. **Add Other Required Variables:**

   ```
   Name: NEXTAUTH_SECRET
   Value: [Run: openssl rand -base64 32 and paste output]
   Environments: ✓ All

   Name: NEXTAUTH_URL
   Value: https://your-app-name.vercel.app
   Environments: ✓ All

   Name: ADMIN_EMAIL
   Value: sourasantadutta@gmail.com
   Environments: ✓ All

   Name: ADMIN_PASSWORD
   Value: Loken@th7782
   Environments: ✓ All

   Name: NEXT_PUBLIC_UPI_ID
   Value: sourasantadutta@oksbi
   Environments: ✓ All

   Name: NEXT_PUBLIC_UPI_NAME
   Value: Sourasanta Dutta
   Environments: ✓ All

   Name: NEXT_PUBLIC_FIXED_PRICE
   Value: 20
   Environments: ✓ All
   ```

---

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click latest deployment
3. Click **"Redeploy"** button
4. Wait for build to complete

---

### Step 5: Set Up Blob Storage

1. In Vercel project, click **Storage** tab
2. Click **"Create Database"**
3. Select **Blob**
4. Click **Continue**
5. Name: `studyhelper-storage`
6. Click **Create**
7. Copy the `BLOB_READ_WRITE_TOKEN`
8. Go to **Settings** → **Environment Variables**
9. Add:
   ```
   Name: BLOB_READ_WRITE_TOKEN
   Value: [paste token]
   Environments: ✓ All
   ```
10. Redeploy again

---

### Step 6: Initialize Database

1. After successful deployment, visit:
   ```
   https://your-app-name.vercel.app/api/init-db
   ```

2. You should see:
   ```json
   {
     "message": "Database initialized successfully",
     "adminEmail": "sourasantadutta@gmail.com"
   }
   ```

---

## ✅ Verification Checklist

- [ ] Got database password from Supabase
- [ ] Copied all 3 connection strings
- [ ] Replaced `[YOUR-PASSWORD]` with actual password
- [ ] Added POSTGRES_URL to Vercel
- [ ] Added POSTGRES_PRISMA_URL to Vercel
- [ ] Added POSTGRES_URL_NON_POOLING to Vercel
- [ ] Generated and added NEXTAUTH_SECRET
- [ ] Added all other environment variables (10 total)
- [ ] Created Blob storage
- [ ] Added BLOB_READ_WRITE_TOKEN
- [ ] Redeployed successfully
- [ ] Visited /api/init-db
- [ ] Can login as admin

---

## 🎯 Quick Reference

**Your Supabase Project:**
- Project Ref: `iwkjiqerihpjcrakumqy`
- Region: `ap-south-1` (Mumbai)
- Dashboard: https://supabase.com/dashboard/project/iwkjiqerihpjcrakumqy

**Connection String Format:**
```
Transaction: postgresql://postgres.iwkjiqerihpjcrakumqy:PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

Session: postgresql://postgres.iwkjiqerihpjcrakumqy:PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15

Direct: postgresql://postgres.iwkjiqerihpjcrakumqy:PASSWORD@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
```

**Key Points:**
- Transaction/Session use port **6543**
- Direct uses port **5432**
- Session needs `?pgbouncer=true&connect_timeout=15`
- Replace `PASSWORD` with your actual database password

---

## 🐛 Still Having Issues?

### "Password authentication failed"
→ Double-check your database password is correct
→ Try resetting it in Supabase

### "Connection refused"
→ Verify the connection strings are copied correctly
→ Check for extra spaces or missing characters

### "BLOB_READ_WRITE_TOKEN not found"
→ Create Blob storage in Vercel Storage tab
→ Add the token to environment variables

---

## 🎉 Success!

Once all variables are added and you redeploy, your app will work perfectly!

**Test it:**
1. Visit your app URL
2. Go to `/login`
3. Login with: `sourasantadutta@gmail.com` / `Loken@th7782`
4. Upload a subject
5. Test the payment flow

---

**Need more help?** See `GET_CONNECTION_STRINGS.md` for detailed instructions.
