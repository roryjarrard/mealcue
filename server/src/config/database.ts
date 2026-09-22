import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 5_000,
  });

  console.log("Connected to MongoDB");
}
