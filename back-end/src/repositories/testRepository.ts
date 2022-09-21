import { prisma } from "../database";

async function insertMany (data : any){
    await prisma.recommendation.createMany({data})
    return
}

async function deleteAll (){
    await prisma.recommendation.deleteMany({})
    return
}

export const testRepository = {
    insertMany,
    deleteAll
}