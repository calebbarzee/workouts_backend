import { model, Schema } from "mongoose";

export type IExercise = {
  name: string,
  description: string,
  imageURL?: string,
  categories: string,
  muscleGroup: string
  sets?: number,
  reps?: number,
};

export const ExerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, default: "/images/noImage.jpg", required: false},
  categories: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  sets: { type: Number, required: false },
  reps: { type: Number, required: false }
});

export const ExerciseModel = model("exercise", ExerciseSchema);