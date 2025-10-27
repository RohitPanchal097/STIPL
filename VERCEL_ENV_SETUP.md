# Environment Variables Setup for Vercel

## Add These 2 Environment Variables

### 1. MONGODB_URI
**Key:**
```
MONGODB_URI
```

**Value:**
```
mongodb+srv://thepanchalboy007_db_user:UddbDPBr67EynaRe@cluster1.xqpaw45.mongodb.net/machine_catalog
```

### 2. JWT_SECRET
**Key:**
```
JWT_SECRET
```

**Value:**
```
your_super_secret_jwt_key_change_this
```
OR use this random string:
```
stipl_2024_jwt_secret_key_for_authentication_98765
```

## How to Add in Vercel

1. **Go to** your project on vercel.com
2. **Click** "Settings" tab
3. **Click** "Environment Variables"
4. **Add both** variables above
5. **Save**
6. **Redeploy** project

## After Adding Variables

Vercel will show:
- ✅ Variable added
- Needs redeploy to apply

**Then:**
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"

## Quick Copy-Paste

Copy these exact values:

**Variable 1:**
```
Key: MONGODB_URI
Value: mongodb+srv://thepanchalboy007_db_user:UddbDPBr67EynaRe@cluster1.xqpaw45.mongodb.net/machine_catalog
```

**Variable 2:**
```
Key: JWT_SECRET
Value: stipl_2024_jwt_secret_key_for_authentication_98765
```

## Done! ✅

After adding these and redeploying, your app will work!

