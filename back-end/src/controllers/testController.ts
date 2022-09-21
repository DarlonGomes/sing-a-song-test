import { Request, Response } from "express";
import { testRepository } from "../repositories/testRepository";
import { testService } from "../services/testService";

async function seedDatabase (_req: Request, res: Response){
    await testService.insertMockData();
    return res.status(200).send("Done")
}
async function resetDatabase (_req: Request, res: Response){
    await testRepository.deleteAll();
    return res.status(204).send("Done")
}

export const testController = {
    seedDatabase,
    resetDatabase
}