# Machine Catalog - Vercel Deployment

Complete machine catalog application for industrial companies, deployed on Vercel.

## 🚀 Quick Deploy

1. Push to GitHub ✅
2. Import to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

## 📁 Project Structure

```
├── api/                # Vercel serverless functions
├── lib/                # MongoDB connection
├── models/             # Mongoose models
├── frontend/           # React application
└── vercel.json        # Vercel configuration
```

## ✨ Features

- ✅ Browse machines by category
- ✅ Search and filter
- ✅ Image gallery with lightbox
- ✅ Admin panel (CRUD operations)
- ✅ Responsive design
- ✅ MongoDB Atlas integration
- ✅ JWT authentication

## 🔑 API Endpoints

### Public
- `GET /api/machines` - Get all machines
- `GET /api/machines/:slug` - Get machine details
- `GET /api/machines/category/:category` - Filter by category

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/machines` - Get all machines
- `POST /api/admin/machines` - Create machine
- `PUT /api/admin/machines/:id` - Update machine
- `DELETE /api/admin/machines/:id` - Delete machine

## 📝 Environment Variables

Set these in Vercel dashboard:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🖼️ Image Upload

Vercel serverless doesn't store files. Options:

1. **Cloudinary** (Recommended) - https://cloudinary.com
2. **Hostinger Storage** - Upload via FTP
3. **Manual URLs** - Enter image URLs manually

## 🎯 Default Credentials

- Email: admin@catalog.com
- Password: admin123

⚠️ Change these after deployment!

## 🛠️ Tech Stack

- Frontend: React 18 + Vite + TailwindCSS
- Backend: Vercel Serverless Functions
- Database: MongoDB Atlas
- Authentication: JWT

## 📄 License

MIT
