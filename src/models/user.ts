import { model, Schema } from "mongoose";
import { WorkoutSchema, IWorkout } from "./workout";

export type IUser = {
  email: string;
  firstName: string;
  lastName: string;
  userLevel: 1 | 2;
  tokenData: object;
  workouts: IWorkout[];
};

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userLevel: { type: Number, required: true },
  tokenData: { type: Object, required: true },
  workouts: [ WorkoutSchema ]

});

export const UserModel = model("user", UserSchema);
