import { Router } from "express";
import { testController } from "../controllers/testController";
export const testRouter = Router();

testRouter.get("/seed", testController.seedDatabase);
testRouter.get("/reset", testController.resetDatabase)