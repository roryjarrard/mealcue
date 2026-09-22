import express from "express";
import { connectToDatabase } from "./config/database.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: "connected" });
});

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();

    app.listen(env.port, () => {
      console.log(`MealCue server listening on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("Failed to start MealCue server:", err);
    process.exit(1);
  }
}

void startServer();
