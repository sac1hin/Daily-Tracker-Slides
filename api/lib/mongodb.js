const mongoose = require('mongoose');

// Use mongoose.connection.readyState to check connection status
async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 1, // Serverless needs minimal pool size
    });
    console.log('MongoDB connected');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
