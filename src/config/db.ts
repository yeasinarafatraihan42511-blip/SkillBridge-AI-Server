import mongoose from "mongoose";
import dns from "node:dns";
import { env } from "./env";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("Database Name:", mongoose.connection.name);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;