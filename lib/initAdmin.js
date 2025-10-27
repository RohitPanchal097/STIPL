import Admin from '../models/Admin';
import { connectToDatabase } from './mongodb';

async function initializeAdmin() {
  try {
    await connectToDatabase();
    
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      const admin = new Admin({
        email: 'admin@catalog.com',
        password: 'admin123'
      });
      await admin.save();
      console.log('✅ Initial admin created (admin@catalog.com / admin123)');
      console.log('⚠️  Please change the default password!');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

// Call on first API request
let initialized = false;
export async function ensureAdmin() {
  if (!initialized) {
    await initializeAdmin();
    initialized = true;
  }
}

export default initializeAdmin;

