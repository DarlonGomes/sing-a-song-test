import {prisma} from "../../src/database";
import { randFullName } from '@ngneat/falso';

export async function disconnectPrisma(){
    await prisma.$disconnect();
};

export async function bulkData(){
    const data = Array.from({length: 3}).map((_element, index) =>({
        name: randFullName(),
        youtubeLink: "https://www.youtube.com/watch?v=3YXUWWZJXpE",
        score: index
    }))
    await prisma.recommendation.createMany({ data });
}

export async function deleteAll(){
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
}

export async function bulkDownvoteData(){
    const data = Array.from({length: 6}).map((_element, index) =>({
        name: randFullName(),
        youtubeLink: "https://www.youtube.com/watch?v=3YXUWWZJXpE",
        score: -index
    }))
    await prisma.recommendation.createMany({ data });
}