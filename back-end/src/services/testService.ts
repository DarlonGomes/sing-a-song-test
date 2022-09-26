import { testRepository } from "../repositories/testRepository";

function mockRecommendations(){
    const data = [
        {
            name: "Dragon Slayer - NSP",
            youtubeLink: "https://www.youtube.com/watch?v=5PcjdJz61VI",
            score: 8
        },
        {
            name: "Dinosaur Laser Fight - NSP",
            youtubeLink: "https://www.youtube.com/watch?v=dGh0tE9HsYM",
            score: 3
        },
        {
            name: "It's Bedtime - NSP",
            youtubeLink: "https://www.youtube.com/watch?v=MjPIbxFJdwg",
            score: 6
        },
        {
            name: "Thunder & Lightning - NSP",
            youtubeLink: "https://www.youtube.com/watch?v=-rSGoP5iGZQ",
            score: 12
        },
        {
            name: "Naldo Benny ft; Gucci Boy - Brezzy",
            youtubeLink: "https://www.youtube.com/watch?v=G3MfaXiLV3Y",
            score: -5
        },
        {
            name: "Cool Patrol - NSP",
            youtubeLink: "https://www.youtube.com/watch?v=-tW0G9XWaj0",
            score: 10
        },
        {
            name: "Danny Don't You Know - NSP",
            youtubeLink: "https://www.youtube.com/watch?v=kT8cX2-_7pQ",
            score: 9
        },
        {
            name: "First Date - NSP",
            youtubeLink: "https://www.youtube.com/watch?v=UvgcLTzwjVM",
            score: 5
        },
        {
            name: "If We Were Gay - NSP",
            youtubeLink: "https://www.youtube.com/watch?v=f99njZJod2c",
            score: 20
        }
    ];

    return data
}

async function insertMockData (){
    const data = mockRecommendations()
    await testRepository.insertMany(data);
    return 
}

export const testService = {
    insertMockData
}