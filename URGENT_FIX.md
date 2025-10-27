# URGENT: Fix 500 Error in Vercel

## The Problem

Your `/api/machines` endpoint is returning 500 error because:
- ❌ **MONGODB_URI** environment variable is missing
- ❌ **JWT_SECRET** environment variable is missing

## Fix Now

### Step 1: Add Environment Variables in Vercel

1. Go to https://vercel.com
2. Open your project: **STIPL**
3. Click **Settings** tab
4. Click **Environment Variables**
5. Add these TWO variables:

**Variable 1:**
```
Key: MONGODB_URI
Value: mongodb+srv://thepanchalboy007_db_user:UddbDPBr67EynaRe@cluster1.xqpaw45.mongodb.net/machine_catalog
```

**Variable 2:**
```
Key: JWT_SECRET
Value: stipl_2024_jwt_secret_98765
```

6. Click **Save** for each variable

### Step 2: Redeploy

1. Go to **Deployments** tab
2. Click **...** on latest deployment
3. Click **Redeploy**
4. Wait for build to complete

### Step 3: Test

Visit: https://stipl.vercel.app

✅ Should work now!

## Why This Happens

Without environment variables:
- API can't connect to MongoDB ❌
- Returns 500 Internal Server Error
- All API calls fail

With environment variables:
- API connects to MongoDB ✅
- Everything works ✅

## Quick Checklist

- [ ] Added MONGODB_URI to Vercel
- [ ] Added JWT_SECRET to Vercel
- [ ] Redeployed project
- [ ] Tested the site

---

**DO THIS NOW!** ⚡

