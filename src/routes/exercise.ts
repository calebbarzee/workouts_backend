import Router, { NextFunction, Request, Response } from "express";
import { HydratedDocument, Types } from "mongoose";
import { IExercise } from "../models/exercise";
import { getExercises, getExerciseById, addExercise, updateExercise, deleteExercise } from "../controllers/exercise";


export const exerciseRouter = Router();

exerciseRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Exercises']
    #swagger.summary = "Gets all exercises."
    #swagger.operationId = 'getAllExercises'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const result = await getExercises();
    if (result.length === 0) res.status(404).send({ message: "No exercise Found" });
    else res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});


exerciseRouter.get("/:exerciseId", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Exercises']
    #swagger.summary = "Gets exercise by ID."
    #swagger.operationId = 'getExerciseById'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const id: Types.ObjectId = new Types.ObjectId(req.params.exerciseId);
    const result = await getExerciseById(id);
    if (!result) res.status(404).send({ message: "Exercise not found" });
    else res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

exerciseRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Exercises']
    #swagger.summary = "Add exercise to the store."
    #swagger.operationId = 'addExercise'
    #swagger.parameters['exercise'] = {
      in: "body",
      description: "Exercise interface",
      required: true,
      schema: { $ref: '#/definitions/exercise'}
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
      const newExercise: HydratedDocument<IExercise> = { ...req.body };
      const result = await addExercise(newExercise);
      if (result) {
        res.status(200).send({
          message: `Exercise with name ${newExercise.name} added with ID: ${result.id}`
        });
      } else {
        res.status(404).send({ message: "Exercise not added" });
      }
    } catch (error) {
    console.log(error);
  }
});

exerciseRouter.put("/:exerciseId", async (req: Request, res: Response, next: NextFunction) => {
  /* 
    #swagger.tags = ['Exercises']
    #swagger.summary = "Update exercise by ID."
    #swagger.operationId = 'updateExercise'
    #swagger.response[200] = {
      description: "Success",
    }
    #swagger.response[404] = {
      description: "Not Found"
    }
  */
  try {
    const id: Types.ObjectId = new Types.ObjectId(req.params.exerciseId);
    const updatedExercise: HydratedDocument<IExercise> = { ...req.body };
    const result = await updateExercise(id, updatedExercise);
    if (result) {
      res.status(200).send({
        message: `Exercise with name ${updatedExercise.name} updated with ID: ${id}`
      });
    } else {
      res.status(404).send({ message: "Exercise not updated" });
    }
  } catch (error) {
    console.log(error);
  }
});