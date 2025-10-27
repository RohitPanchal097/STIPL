import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // Check if already connected
  if (cached.conn) {
    return cached.conn;
  }

  // Check if connection is in progress
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Connecting to MongoDB...');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      })
      .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB:', e.message);
    throw e;
  }

  return cached.conn;
}

export { connectToDatabase };

