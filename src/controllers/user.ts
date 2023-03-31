import { HydratedDocument, Types } from "mongoose";
import { IUser, UserModel } from "../models/user";

export async function getUserByEmail(email: string): Promise<HydratedDocument<IUser>> {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("user not found with that email");
  return user;
}

export async function getUserById(
  userId: string | Types.ObjectId
): Promise<HydratedDocument<IUser>> {
  return UserModel.findById(userId);
}

export async function createUser(user: IUser) {
  const result = await new UserModel(user);
  return await result.save();
}

export async function checkUserExist(email: string) {
  const result = await UserModel.findOne({ email });
  return result ? true : false;
}

export async function updateUser(userId: Types.ObjectId, user: IUser) {
  return await UserModel.findByIdAndUpdate(userId, user, {
    new: true
  });
}
export async function deleteUser(userId: Types.ObjectId) {
  await UserModel.findByIdAndRemove(userId);
  return;
}


// export async function addWorkoutToUser(userId: Types.ObjectId, workoutId: Types.ObjectId): Promise<HydratedDocument<IWorkout>[]>{
//   // Get the User
//   const user = await UserModel.findById(userId);
//   if (!user) throw new Error("User ID not found");

//   // Check for the workout existence
//   const workout = await WorkoutModel.findById(workoutId);
//   if (!workout) throw new Error("Workout ID not found");

//   user.workouts.push(workout);
//   const result = await user.save();
//   return result.workouts as HydratedDocument<IWorkout>[];
// }

// export async function removeWorkoutFromUser(userId: Types.ObjectId, workoutId): Promise<HydratedDocument<IWorkout>[]> {
//   // Get the User
//   const user = await UserModel.findById(userId);
//   if (!user) throw new Error("User ID not found");
//   // Search the user's workouts for the workoutId
//   const workout = user.workouts.findIndex((workout) => workout === workoutId);
//   if (!workout) throw new Error("Workout ID not found");
//   // Remove the workout from the user's workouts
//   user.workouts.splice(workout, 1);
//   // Save the user
//   const result = await user.save();
//   return result.workouts as HydratedDocument<IWorkout>[];
// }