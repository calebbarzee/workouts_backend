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

export async function addWorkoutToUser(userId: Types.ObjectId, workoutId: Types.ObjectId): Promise<HydratedDocument<IWorkout>[]>{
  // Get the User
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User ID not found");

  // Check for the workout existence
  const workout = await WorkoutModel.findById(workoutId);
  if (!workout) throw new Error("Workout ID not found");

  user.workouts.push(workout);
  const result = await user.save();
  return result.workouts as HydratedDocument<IWorkout>[];
}

export async function removeWorkoutFromUser(userId: Types.ObjectId, workoutId: Types.ObjectId): Promise<HydratedDocument<IWorkout>[]> {
  // Get the User
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User ID not found");
  // Search the user's workouts for the workoutId
  const workout = user.workouts.findIndex((workout) => workout._id === workoutId);
  if (!workout) throw new Error("Workout ID not found");
  // Remove the workout from the user's workouts
  user.workouts.splice(workout, 1);
  // Save the user
  const result = await user.save();
  return result.workouts as HydratedDocument<IWorkout>[];
}