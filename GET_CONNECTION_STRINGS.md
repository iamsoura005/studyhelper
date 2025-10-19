# 🔧 Get Your Supabase Connection Strings

## Your Supabase Project
- **URL:** https://iwkjiqerihpjcrakumqy.supabase.co
- **Project Ref:** iwkjiqerihpjcrakumqy

---

## 📋 How to Get Connection Strings

### Step 1: Go to Supabase Dashboard
1. Visit: https://supabase.com/dashboard/project/iwkjiqerihpjcrakumqy
2. Click **Settings** (gear icon) in left sidebar
3. Click **Database**

### Step 2: Scroll to "Connection string" Section
You'll see a dropdown with different modes.

### Step 3: Copy Each Connection String

#### A) Transaction Pooler (for POSTGRES_URL)
1. Select mode: **Transaction**
2. Select format: **URI**
3. Copy the string - it looks like:
   ```
   postgresql://postgres.iwkjiqerihpjcrakumqy:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   ```
4. **IMPORTANT:** Replace `[YOUR-PASSWORD]` with your actual database password

#### B) Session Pooler (for POSTGRES_PRISMA_URL)
1. Select mode: **Session**
2. Select format: **URI**
3. Copy the string
4. Add this at the end: `?pgbouncer=true&connect_timeout=15`
5. Final format:
   ```
   postgresql://postgres.iwkjiqerihpjcrakumqy:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
   ```
6. Replace `[YOUR-PASSWORD]` with your actual database password

#### C) Direct Connection (for POSTGRES_URL_NON_POOLING)
1. Select mode: **Direct connection**
2. Select format: **URI**
3. Copy the string - it looks like:
   ```
   postgresql://postgres.iwkjiqerihpjcrakumqy:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
   ```
4. **Notice:** Port is **5432** (not 6543)
5. Replace `[YOUR-PASSWORD]` with your actual database password

---

## ⚠️ CRITICAL: Your Database Password

When you created your Supabase project, you set a database password. You need to use that password in the connection strings.

**If you forgot your password:**
1. Go to: https://supabase.com/dashboard/project/iwkjiqerihpjcrakumqy/settings/database
2. Scroll to "Database password"
3. Click "Reset database password"
4. Set a new password and save it securely

---

## 🔑 Add to Vercel Environment Variables

Once you have all 3 connection strings with your password:

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

### Required Variables:

```env
Name: POSTGRES_URL
Value: postgresql://postgres.iwkjiqerihpjcrakumqy:YOUR_ACTUAL_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
Environments: ✓ Production ✓ Preview ✓ Development

Name: POSTGRES_PRISMA_URL
Value: postgresql://postgres.iwkjiqerihpjcrakumqy:YOUR_ACTUAL_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
Environments: ✓ Production ✓ Preview ✓ Development

Name: POSTGRES_URL_NON_POOLING
Value: postgresql://postgres.iwkjiqerihpjcrakumqy:YOUR_ACTUAL_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
Environments: ✓ Production ✓ Preview ✓ Development

Name: NEXTAUTH_SECRET
Value: [Run: openssl rand -base64 32 and paste output]
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

---

## 🎯 Quick Checklist

- [ ] Got Transaction Pooler URL (port 6543)
- [ ] Got Session Pooler URL (port 6543 with params)
- [ ] Got Direct Connection URL (port 5432)
- [ ] Replaced `[YOUR-PASSWORD]` in all 3 URLs
- [ ] Generated NEXTAUTH_SECRET
- [ ] Added all 10 variables to Vercel
- [ ] Checked all 3 environments for each variable
- [ ] Redeployed in Vercel

---

## 🔍 Example (with fake password)

If your database password is `MySecurePass123`, your URLs would look like:

```
POSTGRES_URL:
postgresql://postgres.iwkjiqerihpjcrakumqy:MySecurePass123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

POSTGRES_PRISMA_URL:
postgresql://postgres.iwkjiqerihpjcrakumqy:MySecurePass123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15

POSTGRES_URL_NON_POOLING:
postgresql://postgres.iwkjiqerihpjcrakumqy:MySecurePass123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
```

---

## ⚠️ Common Mistakes

1. ❌ Using Supabase URL instead of connection string
2. ❌ Forgetting to replace `[YOUR-PASSWORD]`
3. ❌ Using wrong port (6543 vs 5432)
4. ❌ Missing query parameters on PRISMA_URL
5. ❌ Not checking all 3 environments in Vercel

---

## 🎉 After Adding Variables

1. Go to Vercel → Deployments
2. Click latest deployment
3. Click **Redeploy**
4. Wait for build to complete
5. Visit: `https://your-app.vercel.app/api/init-db`
6. Should see: `{"message":"Database initialized successfully"}`

---

## 📞 Need Your Database Password?

**Option 1: Check your saved passwords**
- Look in your password manager
- Check your notes from when you created the project

**Option 2: Reset it**
1. Go to: https://supabase.com/dashboard/project/iwkjiqerihpjcrakumqy/settings/database
2. Scroll to "Database password"
3. Click "Reset database password"
4. Set new password
5. Update all 3 connection strings with new password

---

**Your Project Ref:** `iwkjiqerihpjcrakumqy`
**Region:** `ap-south-1` (Mumbai)

**Next Step:** Get your connection strings and add them to Vercel!
