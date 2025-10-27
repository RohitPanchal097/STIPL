# 🚀 Deploy to Vercel - Step by Step

## Prerequisites
- GitHub account
- Vercel account (sign up with GitHub)
- MongoDB Atlas (already connected)

## Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Machine Catalog - Vercel Ready"

# Add GitHub remote (create repo on GitHub first)
git remote add origin https://github.com/yourusername/machine-catalog.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Vercel

1. **Go to** https://vercel.com
2. **Sign up** with your GitHub account
3. **Click** "Add New Project"
4. **Import** your repository
5. **Configure:**
   - **Framework Preset**: Vite
   - **Root Directory**: Leave blank
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`

6. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://thepanchalboy007_db_user:UddbDPBr67EynaRe@cluster1.xqpaw45.mongodb.net/machine_catalog
   JWT_SECRET=your_super_secret_jwt_key
   ```

7. **Click** "Deploy"
8. **Wait** 2-3 minutes
9. **Done!** ✅ Your app is live!

## Step 3: Verify Deployment

Your app will be live at:
- `https://your-app.vercel.app`

Visit the URL and test:
- Browse machines
- Login to admin panel
- Add a test machine

## Step 4: Handle Image Uploads

Since Vercel serverless can't store files, choose one:

### Option 1: Cloudinary (Recommended)
1. Sign up: https://cloudinary.com/users/register/free
2. Get API credentials
3. Update `api/admin/upload.js` with Cloudinary SDK
4. Images auto-upload to Cloudinary

### Option 2: Hostinger Storage
1. Upload images via Hostinger cPanel
2. Use URLs manually in admin panel
3. Store URLs in database

### Option 3: Manual URLs
- Enter image URLs manually when adding machines

## 🎯 After Deployment

### Change Admin Password
Default: admin@catalog.com / admin123
Change this after first login!

### Test Everything
- [ ] Browse machines
- [ ] Search and filter
- [ ] View machine details
- [ ] Admin login
- [ ] Add machine
- [ ] Edit machine
- [ ] Delete machine

### Add Machines
- Upload images to your chosen storage
- Use admin panel to add machines
- Fill in all details

## 🌐 Custom Domain (Optional)

1. Go to Vercel dashboard
2. Settings → Domains
3. Add your domain
4. Update DNS settings
5. Done!

## 📊 Environment Variables

Required in Vercel:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |

## 🔧 Troubleshooting

**"Function timed out"**
- Increase timeout in Vercel settings
- Or reduce function complexity

**"Database connection failed"**
- Check MONGODB_URI is correct
- Verify MongoDB Atlas whitelist (0.0.0.0/0)

**"Images not loading"**
- Use full URLs starting with https://
- Check image upload solution

**"Cold start slow"**
- First request: 1-2 seconds (normal)
- Subsequent: Fast
- Upgrade to Pro for no cold starts

## ✅ Done!

Your machine catalog is live on Vercel!

**Next steps:**
1. Add machines
2. Upload images
3. Share your catalog
4. Enjoy! 🎉

---

Need help? Check [README_VERCEL.md](./README_VERCEL.md)
