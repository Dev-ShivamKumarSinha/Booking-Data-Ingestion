import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;

const dbName = process.env.DATABASE_NAME;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDb Atlas");
  } catch (error) {
    console.log("Error connecting to MongoDb", error);
    process.exit(1); // Exit the process with failure
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first");
  }
  return db;
};
