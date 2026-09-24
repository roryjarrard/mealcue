import { Router } from "express";
import { z } from "zod";
import { MealModel } from "../models/meal.model.js";
import { createMealSchema } from "../validation/meal.validation.js";

export const mealsRouter = Router();

mealsRouter.get("/", async (_req, res) => {
  try {
    const meals = await MealModel.find().sort({ name: 1, _id: 1 }).lean();

    res.json({
      meals: meals.map((meal) => ({
        id: meal._id.toString(),
        name: meal.name,
        description: meal.description,
        tags: meal.tags,
        createdAt: meal.createdAt,
        updatedAt: meal.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Failed to retrieve meals:", error);

    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to retrieve meals",
      },
    });
  }
});

mealsRouter.post("/", async (req, res) => {
  const result = createMealSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid meal data",
        details: z.treeifyError(result.error),
      },
    });
    return;
  }

  try {
    const { name, description, tags } = result.data;
    const meal = await MealModel.create({
      name,
      ...(description !== undefined ? { description } : {}),
      ...(tags !== undefined ? { tags } : {}),
    });

    res.status(201).json({
      meal: {
        id: meal._id.toString(),
        name: meal.name,
        description: meal.description,
        tags: meal.tags,
        createdAt: meal.createdAt,
        updatedAt: meal.updatedAt,
      },
    });
  } catch (error) {
    console.error("Failed to create meal:", error);

    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to create meal",
      },
    });
  }
});
