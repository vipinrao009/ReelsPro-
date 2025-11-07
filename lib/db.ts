import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  console.log("MongoDB uri not found");
}

let cached = global.mongoose || { conn: null, promise: null };

global.mongoose = cached;

export async function connectTODatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/*
   1. bufferCommands => When your app starts, sometimes Mongoose queries run before MongoDB connects.If bufferCommands is ON (default), Mongoose will store (buffer) those queries and run them later automatically once the connection is ready.

*/
