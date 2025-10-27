# 🧪 Local Testing Guide

## Option 1: Test with Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Link Project
```bash
vercel link
```

### Step 4: Add Environment Variables
```bash
vercel env add MONGODB_URI
# Paste: mongodb+srv://thepanchalboy007_db_user:UddbDPBr67EynaRe@cluster1.xqpaw45.mongodb.net/machine_catalog

vercel env add JWT_SECRET
# Enter: your_secret_key
```

### Step 5: Run Local Server
```bash
npm run dev
# Or: vercel dev
```

**Frontend:** http://localhost:3000
**Backend:** http://localhost:3000/api

---

## Option 2: Test Frontend Only

### Run Frontend (Mock API)
```bash
cd frontend
npm run dev
```

**URL:** http://localhost:5173

⚠️ **Note:** API calls won't work without backend running.

---

## Option 3: Test with ngrok (Full Stack)

### Setup:
1. Install ngrok: https://ngrok.com
2. Deploy backend to Vercel (deploy first)
3. Get your Vercel API URL
4. Update frontend/.env:
```
VITE_API_URL=https://your-app.vercel.app
```
5. Run frontend:
```bash
cd frontend
npm run dev
```

---

## Quick Test (Easiest)

### Just Test Frontend Locally:
```bash
cd frontend
npm run dev
```

Open: http://localhost:5173

**Note:** 
- ✅ Frontend will work
- ❌ API calls will fail (backend not running locally)
- ✅ For full testing, use Vercel CLI (Option 1)

---

## Recommended: Deploy to Vercel for Testing

**Easiest way:**
1. Push to GitHub
2. Deploy on Vercel (5 minutes)
3. Test on live URL

**Benefits:**
- ✅ Everything works
- ✅ Real API calls
- ✅ Can share URL
- ✅ Production-like environment

---

## What Should You Do?

### For Quick Testing:
```bash
# Just test frontend
cd frontend
npm run dev
```
URL: http://localhost:5173

### For Full Testing:
```bash
# Install and use Vercel CLI
npm install -g vercel
vercel login
vercel dev
```
URL: http://localhost:3000

### For Best Experience:
**Deploy directly to Vercel!** (Recommended)

---

Choose what you want to do! 🚀

