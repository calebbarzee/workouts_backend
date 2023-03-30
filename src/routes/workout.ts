import Router, { NextFunction, Request, Response } from "express";
import { HydratedDocument, Types } from "mongoose";
import { IWorkout } from "../models/workout";
import { getWorkouts, getWorkoutById, addWorkout, updateWorkout, deleteWorkout, removeWorkoutFromUser } from "../controllers/workout";
import { getUserById } from "../controllers/user";
import { requiresAuth } from "express-openid-connect";


export const workoutRouter = Router();

workoutRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Workouts']
    #swagger.summary = "Gets all workouts."
    #swagger.operationId = 'getAllWorkouts'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const result = await getWorkouts();
    if (result.length === 0) res.status(404).send({ message: "No workout Found" });
    else res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});


workoutRouter.get("/:workoutId", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Workouts']
    #swagger.summary = "Gets workout by ID."
    #swagger.operationId = 'getWorkoutById'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const id: Types.ObjectId = new Types.ObjectId(req.params.workoutId);
    const result = await getWorkoutById(id);
    if (!result) res.status(404).send({ message: "Workout not found" });
    else res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

workoutRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Workouts']
    #swagger.summary = "Add workout to the store."
    #swagger.operationId = 'addWorkout'
    #swagger.parameters['workout'] = {
      in: "body",
      description: "Workout interface",
      required: true,
      schema: { $ref: '#/definitions/workout'}
    }
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
    ]
  */
  try {
      const newWorkout: HydratedDocument<IWorkout> = { ...req.body };
      const result = await addWorkout(newWorkout);
      if (result) {
        res.status(200).send({
          message: `Workout with name ${newWorkout.name} added with ID: ${result.id}`
        });
      } else {
        res.status(404).send({ message: "Workout not added" });
      }
    } catch (error) {
    console.log(error);
  }
});

workoutRouter.put("/:workoutId", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Workouts']
    #swagger.summary = "Update workout by ID."
    #swagger.operationId = 'updateWorkout'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const id: Types.ObjectId = new Types.ObjectId(req.params.workoutId);
    const updatedWorkout: HydratedDocument<IWorkout> = { ...req.body };
    const result = await updateWorkout(id, updatedWorkout);
    if (result) {
      res.status(200).send({
        message: `Workout with name ${updatedWorkout.name} updated with ID: ${id}`
      });
    } else {
      res.status(404).send({ message: "Workout not updated" });
    }
  } catch (error) {
    console.log(error);
  }
});

workoutRouter.delete("/:workoutId", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Workouts']
    #swagger.summary = "Delete workout by ID."
    #swagger.operationId = 'deleteWorkout'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const id: Types.ObjectId = new Types.ObjectId(req.params.workoutId);
    const result = await deleteWorkout(id);
    if (result) {
      res.status(200).send({
        message: `Workout with ID: ${id} deleted`
      });
    } else {
      res.status(404).send({ message: "Workout not deleted" });
    }
  } catch (error) {
    console.log(error);
  }
});

workoutRouter.put("/addWorkout/:workoutId", requiresAuth(), async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Workouts']
    #swagger.summary = "Add workout to user."
    #swagger.operationId = 'addWorkoutToUser'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const userId: Types.ObjectId = req.userId;
    const workoutId: Types.ObjectId = new Types.ObjectId(req.params.workoutId);
    const result = await getUserById(userId);
    if (result) {
      res.status(200).send({
        message: `Workout with ID: ${workoutId} added to user with ID: ${userId}`
      });
    } else {
      res.status(404).send({ message: "Workout not added to user" });
    }
  } catch (error) {
    console.log(error);
  }
});

workoutRouter.put("/removeWorkout/:workoutId", requiresAuth(), async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Workouts']
    #swagger.summary = "Remove workout from user."
    #swagger.operationId = 'removeWorkoutFromUser'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const userId: Types.ObjectId = req.userId;
    const workoutId: Types.ObjectId = new Types.ObjectId(req.params.workoutId);
    const result = await removeWorkoutFromUser(userId, workoutId);
    if (result) {
      res.status(200).send({
        message: `Workout with ID: ${workoutId} removed from user with ID: ${userId}`
      });
    } else {
      res.status(404).send({ message: "Workout not removed from user" });
    }
  } catch (error) {
    console.log(error);
  }
});