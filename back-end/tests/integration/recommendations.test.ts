import app from "../../src/app";
import supertest from "supertest";
import { __insertValidObject, __insertInvalidObject, __getValidId, __getTheWorstSongId } from "../factories/recommendationFactory";
import {deleteAll, disconnectPrisma, bulkData, bulkDownvoteData} from "../factories/scenarioFactory"
const server = supertest(app);

beforeEach(async()=>{
    await deleteAll();
});

describe("GET recommendations", ()=>{
    it("SUCCESSS : gather all song", async()=>{
        await bulkData();
        const result = await server.get("/recommendations/");
        expect(result.status).toBe(200);
    });

    it("SUCCESS : pick a random song", async()=>{
        await bulkData();
        const result = await server.get("/recommendations/random");
        expect(result.status).toBe(200);
    });
    it("FAIL : pick a random song", async()=>{
        const result = await server.get("/recommendations/random");
        expect(result.status).toBe(404);
    });

    it("SUCCESS : gather the top 3 songs", async()=>{
        await bulkData();
        const result = await server.get("/recommendations/top/3");
        expect(result.status).toBe(200);
    });

    it("SUCCESS : get song by id", async()=>{
        await bulkData();
        const id = await __getValidId()
        const result = await server.get(`/recommendations/${id}`);
        expect(result.status).toBe(200);
    });

    it("FAIL : get song by string id", async()=>{
        await bulkData();
        const result = await server.get(`/recommendations/aaa`);
        expect(result.status).toBe(500);
    });
});

describe("POST recommendations", ()=>{
    it("SUCCESS: create a request", async()=>{ 
        const body = __insertValidObject()
        const result = await server.post("/recommendations/").send(body);
        expect(result.status).toBe(201);
    });
    it("FAIL: request with invalid body", async()=>{ 
        const body = __insertInvalidObject()
        const result = await server.post("/recommendations/").send(body);
        expect(result.status).toBe(422);
    });
    it("FAIL: conflict with unique constraint", async()=>{ 
        const body = __insertValidObject()
        await server.post("/recommendations/").send(body);
        const result = await server.post("/recommendations/").send(body);
        expect(result.status).toBe(409);
    });
    it("SUCCESS: upvote", async()=>{
        await bulkData();
        const id = await __getValidId()
        const result = await server.post(`/recommendations/${id}/upvote`);
        expect(result.status).toBe(200);
    });
    it("FAIL: upvote", async()=>{
        const result = await server.post(`/recommendations/-1/upvote`);
        expect(result.status).toBe(404);
    });
    it("SUCCESS : downvote", async()=>{
        await bulkData();
        const id = await __getValidId()
        const result = await server.post(`/recommendations/${id}/downvote`);
        expect(result.status).toBe(200);
    });
    it("SUCCESS : downvote && remove ", async()=>{
        await bulkDownvoteData();
        const id = await __getTheWorstSongId()
        const result = await server.post(`/recommendations/${id}/downvote`);
        const emptyResult = await server.post(`/recommendations/${id}/downvote`);
        expect(result.status).toBe(200);
        expect(emptyResult.status).toBe(404);
    });
    it("FAIL: downvote", async()=>{
        const result = await server.post(`/recommendations/-1/downvote`);
        expect(result.status).toBe(404);
    })
    
});


afterAll(async () => {
    await disconnectPrisma();
});