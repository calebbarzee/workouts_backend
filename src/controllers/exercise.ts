import { HydratedDocument, Types } from "mongoose";
import { IExercise, ExerciseModel } from "../models/exercise";

export async function getExercises(): Promise<HydratedDocument<IExercise>[]> {
  return await ExerciseModel.find();
}

export async function getExerciseById(exerciseId: Types.ObjectId): Promise<IExercise> {
  return await ExerciseModel.findById(exerciseId);
}

export async function addExercise(exercise: IExercise) {
  const result = new ExerciseModel(exercise);
  return await result.save();
}

export async function updateExercise(exerciseId: Types.ObjectId, exercise: IExercise) {
  return await ExerciseModel.updateOne({ $_id: exerciseId }, exercise);
}

export async function deleteExercise(exerciseId: Types.ObjectId) {
  return await ExerciseModel.deleteOne({ $_id: exerciseId });
}
