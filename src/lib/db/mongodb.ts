import mongoose from 'mongoose';
import { GridFSBucket, Db } from 'mongodb';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  bucket: GridFSBucket | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }
  return uri;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  bucket: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB using Mongoose, reusing the connection across warm serverless invocations.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = getMongoUri();

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      cached.conn = mongooseInstance;
      cached.bucket = new GridFSBucket(mongooseInstance.connection.db as unknown as Db, {
        bucketName: 'fs',
      });
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    if (!cached.bucket && cached.conn.connection.db) {
      cached.bucket = new GridFSBucket(cached.conn.connection.db as unknown as Db, {
        bucketName: 'fs',
      });
    }
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * Retrieve the active GridFSBucket instance for binary file streaming.
 */
export async function getGridFSBucket(): Promise<GridFSBucket> {
  await connectToDatabase();
  if (!cached.bucket && mongoose.connection.db) {
    cached.bucket = new GridFSBucket(mongoose.connection.db as unknown as Db, {
      bucketName: 'fs',
    });
  }
  if (!cached.bucket) {
    throw new Error('GridFSBucket failed to initialize on the MongoDB connection');
  }
  return cached.bucket;
}

/**
 * Retrieve the underlying native MongoDB database instance.
 */
export async function getDatabase(): Promise<Db> {
  await connectToDatabase();
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('MongoDB database instance is not available');
  }
  return db as unknown as Db;
}
