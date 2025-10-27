# How to Whitelist IP in MongoDB Atlas

## Alternative Ways to Find Network Access:

### Method 1: Security → Network Access
1. Go to https://cloud.mongodb.com
2. Select your project/cluster
3. Look for **"Security"** section in left sidebar
4. Under Security, you'll find:
   - **"Network Access"** or
   - **"IP Whitelist"** or
   - **"IP Access List"**

### Method 2: Direct Search
1. In MongoDB Atlas dashboard
2. Top search bar - type: **"Network"**
3. Click on **"Network Access"** from results

### Method 3: From Main Menu
1. Click **"..."** (three dots) near your cluster
2. Select **"Edit Configuration"** or **"Network Access"**

### Method 4: Direct URL
1. Go to: https://cloud.mongodb.com/v2#/security/network/whitelist
2. This opens Network Access directly

## What You'll See

After opening Network Access, you'll see:
- Current whitelisted IPs (if any)
- **"Add IP Address"** button (green button)

## Then Follow These Steps:

### Step 1: Click "Add IP Address"
Green button, usually top-right

### Step 2: Add IP
- Click **"Allow Access from Anywhere"**
- This adds: `0.0.0.0/0`
- Click **"Confirm"**

### Step 3: Wait
- Takes 1-2 minutes
- You'll see green checkmark when done

## Screenshots Help

If you can't find it, take a screenshot of your MongoDB Atlas dashboard and I'll point you to the exact location!

## Quick Direct Links:

**Network Access:** https://cloud.mongodb.com/v2#/security/network/whitelist

**Atlas Home:** https://cloud.mongodb.com

---

**Main thing:** Look for "IP Access List" or "Network Access" in Security section!

