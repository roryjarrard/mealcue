import express from "express";
import { mealsRouter } from "./routes/meals.routes.js";

export const app = express();

app.use(express.json());
app.use("/api/meals", mealsRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: "connected" });
});
