import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app.js";
import { MealModel } from "../models/meal.model.js";

describe("Meals API", () => {
  describe("POST /api/meals", () => {
    it("creates a meal and normalizes its tags", async () => {
      const response = await request(app)
        .post("/api/meals")
        .send({
          name: "Chicken Tacos",
          description: "An easy weeknight dinner",
          tags: ["Quick", "Mexican"],
        });

      expect(response.status).toBe(201);
      expect(response.body.meal).toMatchObject({
        name: "Chicken Tacos",
        description: "An easy weeknight dinner",
        tags: ["quick", "mexican"],
      });
      expect(response.body.meal.id).toEqual(expect.any(String));
      expect(response.body.meal.createdAt).toEqual(expect.any(String));
      expect(response.body.meal.updatedAt).toEqual(expect.any(String));

      const storedMeal = await MealModel.findById(response.body.meal.id);

      expect(storedMeal).not.toBeNull();
      expect(storedMeal?.name).toBe("Chicken Tacos");
      expect(storedMeal?.tags).toEqual(["quick", "mexican"]);
    });

    it("rejects invalid input without creating a meal", async () => {
      const response = await request(app)
        .post("/api/meals")
        .send({
          name: "   ",
          tags: ["quick", ""],
          unexpectedField: true,
        });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe("VALIDATION_ERROR");
      expect(response.body.error.details.errors).toContain(
        'Unrecognized key: "unexpectedField"',
      );
      expect(response.body.error.details.properties.name.errors).toContain(
        "Name is required",
      );

      expect(await MealModel.countDocuments()).toBe(0);
    });
  });

  describe("GET /api/meals", () => {
    it("returns meals alphabetically using the public API shape", async () => {
      await MealModel.create([
        {
          name: "Pasta",
          description: "Pasta night",
          tags: ["italian"],
        },
        {
          name: "Chicken Tacos",
          description: "Taco night",
          tags: ["mexican"],
        },
      ]);

      const response = await request(app).get("/api/meals");

      expect(response.status).toBe(200);
      expect(response.body.meals).toHaveLength(2);
      expect(
        response.body.meals.map((meal: { name: string }) => meal.name),
      ).toEqual(["Chicken Tacos", "Pasta"]);

      expect(response.body.meals[0]).toEqual({
        id: expect.any(String),
        name: "Chicken Tacos",
        description: "Taco night",
        tags: ["mexican"],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
      expect(response.body.meals[0]).not.toHaveProperty("_id");
      expect(response.body.meals[0]).not.toHaveProperty("__v");
    });
  });
});
