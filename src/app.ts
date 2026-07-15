import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./config/env";
import authRoutes from "./modules/auth/auth.route";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("SkillBridge AI Backend is Running 🚀");
});

app.get("/api/v1", (_, res) => {
  res.json({
    success: true,
    message: "SkillBridge AI API Running 🚀",
  });
});

app.use("/api/v1/auth", authRoutes);

export default app;