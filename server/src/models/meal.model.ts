import { model, Schema, type InferSchemaType } from "mongoose";

const mealSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 120,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    tags: {
      type: [
        {
          type: String,
          trim: true,
          lowercase: true,
          maxlength: 40,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export type Meal = InferSchemaType<typeof mealSchema>;

export const MealModel = model("Meal", mealSchema);
