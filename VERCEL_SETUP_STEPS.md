# 🚨 URGENT: Add Environment Variables in Vercel

## The Problem

Your API is returning 500 error because environment variables are missing!

## Quick Fix (5 Minutes)

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com
2. Login
3. Open your project: **STIPL**

### Step 2: Add Environment Variables
1. Click **Settings** tab (left sidebar)
2. Click **Environment Variables** (under Configuration)

### Step 3: Add First Variable - MONGODB_URI

Click **Add New** button

**Key:**
```
MONGODB_URI
```

**Value:**
```
mongodb+srv://thepanchalboy007_db_user:UddbDPBr67EynaRe@cluster1.xqpaw45.mongodb.net/machine_catalog
```

**Environment:** Leave all checked (Production, Preview, Development)
- Click **Save**

### Step 4: Add Second Variable - JWT_SECRET

Click **Add New** button again

**Key:**
```
JWT_SECRET
```

**Value:**
```
stipl_2024_jwt_secret_key_for_authentication_98765
```

**Environment:** Leave all checked
- Click **Save**

### Step 5: Redeploy
1. Go to **Deployments** tab
2. Find latest deployment
3. Click **...** (three dots)
4. Click **Redeploy**
5. Wait 2-3 minutes

## ✅ Done!

Now your app will work because:
- ✅ MONGODB_URI connects to database
- ✅ JWT_SECRET enables authentication
- ✅ All API calls will work

## Test Your Site

Visit: https://stipl.vercel.app

Should work now! 🎉

