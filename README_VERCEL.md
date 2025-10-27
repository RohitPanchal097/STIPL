# Machine Catalog - Vercel Deployment Guide

Complete machine catalog application deployed on Vercel.

## 🚀 Quick Deploy

### Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas (already setup)

### Deploy Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/machine-catalog.git
git push -u origin main
```

2. **Deploy to Vercel**
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Configure:
  - **Framework Preset**: Other
  - **Root Directory**: Leave blank
  - **Install Command**: `cd frontend && npm install`
  - **Build Command**: `cd frontend && npm run build`
  - **Output Directory**: `frontend/dist`

3. **Add Environment Variables**
In Vercel dashboard → Settings → Environment Variables:
```
MONGODB_URI=mongodb+srv://thepanchalboy007_db_user:UddbDPBr67EynaRe@cluster1.xqpaw45.mongodb.net/machine_catalog
JWT_SECRET=your_super_secret_jwt_key
```

4. **Deploy!**
- Click "Deploy"
- Wait 2-3 minutes
- Done! ✅

## 📁 Project Structure

```
machine-catalog/
├── api/                    # Vercel serverless functions
│   ├── machines.js         # Get all machines
│   ├── machines/[slug].js  # Get machine by slug
│   └── admin/              # Admin endpoints
├── lib/                    # MongoDB connection
├── models/                 # Mongoose models
├── frontend/               # React app
├── vercel.json            # Vercel config
└── package.json
```

## 🔑 API Endpoints

### Public
- `GET /api/machines` - Get all machines
- `GET /api/machines/:slug` - Get machine details
- `GET /api/machines/category/:category` - Filter by category

### Admin (Requires Token)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/machines` - Get all machines (admin)
- `POST /api/admin/machines` - Create machine
- `PUT /api/admin/machines/:id` - Update machine
- `DELETE /api/admin/machines/:id` - Delete machine

## 🖼️ Image Upload

Vercel serverless doesn't support file storage. Options:

### Option 1: Hostinger Storage (Recommended)
- Upload images via FTP to your Hostinger hosting
- Store URLs in database
- Use URLs like: `https://yourdomain.com/uploads/image.jpg`

### Option 2: Cloudinary (Free Tier)
- Sign up: https://cloudinary.com
- Upload images to Cloudinary
- Use their URLs in database

### Option 3: Manual Upload
- Admin uploads images manually to Hostinger
- Saves URLs in admin panel

## 🎨 Frontend Deployment

Frontend automatically deploys with backend to Vercel.

**Note**: Images won't be served from Vercel. You need to host images separately (Hostinger, Cloudinary, etc.)

## 📝 Default Admin

- Email: admin@catalog.com
- Password: admin123

⚠️ Change these after first deployment!

## 🆚 Vercel vs Previous Setup

| Feature | Previous (Express) | Vercel (Serverless) |
|---------|-------------------|-------------------|
| Backend | Express server | Serverless functions |
| File uploads | Local storage | External storage needed |
| MongoDB | Normal connection | Cached connection |
| Cold starts | No | Yes (first request) |
| Deployment | Separate deploy | One deploy |

## 🌐 After Deployment

Your app will be live at:
- **URL**: `https://your-app.vercel.app`
- Custom domain support available

## 🔧 Local Development

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Backend runs automatically via Vercel dev mode
# Or test with deployed Vercel URL
```

## 📊 Environment Variables

Required in Vercel:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
```

Frontend will use same domain for API calls automatically.

## ✨ Features

- ✅ Full machine catalog
- ✅ Admin panel
- ✅ CRUD operations
- ✅ Category filter
- ✅ Search functionality
- ✅ Responsive design
- ✅ Image gallery with lightbox

## 🐛 Troubleshooting

**Cold start slow?**
- First request takes 1-2 seconds
- Subsequent requests are fast
- Vercel Pro eliminates this (paid)

**Images not loading?**
- Upload images to Hostinger or Cloudinary
- Use full URL in database

**Database connection?**
- Check MongoDB Atlas connection string
- Ensure database name is correct

## 📚 Next Steps

1. Deploy to Vercel
2. Add custom domain (optional)
3. Upload images to storage
4. Add more machines
5. Share your catalog!

---

Made with ❤️ for Industrial Machine Cataloging

