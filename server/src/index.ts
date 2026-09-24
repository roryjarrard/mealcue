import { app } from "./app.js";
import { connectToDatabase } from "./config/database.js";
import { env } from "./config/env.js";

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
