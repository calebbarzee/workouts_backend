import { model, Schema } from "mongoose";
import { ExerciseModel, IExercise } from "./exercise";

export type IWorkout = {
  name: string;
  exercises: IExercise[];
};

export const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  exercises: [ExerciseModel.schema]
});

export const WorkoutModel = model("workout", WorkoutSchema);