import { HydratedDocument, Types } from "mongoose";
import { UserModel } from "../models/user";
import { IWorkout, WorkoutModel } from "../models/workout";

export async function getWorkouts(): Promise<HydratedDocument<IWorkout>[]> {
  return await WorkoutModel.find();
}

export async function getWorkoutById(workoutId: Types.ObjectId): Promise<IWorkout> {
  return await WorkoutModel.findById(workoutId);
}

export async function addWorkout(workout: IWorkout) {
  const result = new WorkoutModel(workout);
  return await result.save();
}

export async function updateWorkout(workoutId: Types.ObjectId, workout: IWorkout) {
  return await WorkoutModel.updateOne({ $_id: workoutId }, workout);
}

export async function deleteWorkout(workoutId: Types.ObjectId) {
  return await WorkoutModel.deleteOne({ $_id: workoutId });
}