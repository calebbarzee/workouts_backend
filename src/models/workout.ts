import { model, Schema, Types } from "mongoose";

export type IWorkout = {
  _id?: string | Types.ObjectId;
  name: "string",
  description: "string",
  imageURL?: "string",
  categories: "string",
  muscleGroup: "string"
};

export const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: false },
  categories: { type: String, required: true },
  muscleGroup: { type: String, required: true }
});

export const WorkoutModel = model("workout", WorkoutSchema);