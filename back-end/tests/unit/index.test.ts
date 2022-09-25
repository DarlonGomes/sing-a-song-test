import { prisma } from "../../src/database";
import { jest } from "@jest/globals";
import { CreateRecommendationData, recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import * as recommendationFactory from "../factories/recommendationFactory";
import { Recommendation } from "@prisma/client";

describe("recommendation service unit tests", () => {
    beforeEach(async()=>{
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it("should insert a new song recommendation", async()=>{
        const recommendation : CreateRecommendationData = recommendationFactory.__insertValidObject()

        const search = jest
        .spyOn(recommendationRepository, "findByName")
        .mockResolvedValue(null);

        jest
        .spyOn(recommendationRepository, "create")
        .mockResolvedValue()
        
        recommendationService.insert(recommendation);

        expect(search).toHaveBeenCalledTimes(1);
    });

    it("should throw when try to insert a existing name", async()=>{
        const recommendation : CreateRecommendationData = recommendationFactory.__insertValidObject();
        const expectedRecommendation : Recommendation = recommendationFactory.__expectValidObject();

        const search = jest
        .spyOn(recommendationRepository, "findByName")
        .mockResolvedValue(expectedRecommendation);

        const service = recommendationService.insert(recommendation);

        expect(search).toHaveBeenCalledTimes(1);
        expect(service).rejects.toEqual({type: "conflict", message: "Recommendations names must be unique"});
        expect(recommendationRepository.create).not.toBeCalled();
    });

    it("should upvote an existing recommendation", async()=>{
        const recommendation : Recommendation = recommendationFactory.__expectValidObject();

        jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValue(recommendation);

        jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValue({...recommendation, score: recommendation.score + 1});
        
        const response : void = await recommendationService.upvote(recommendation.id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(response).toBe(undefined);
    });

    it("should throw searching for a unexisting id", async ()=>{
        const id : number = 30

        jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValue(null);

        const response : Promise<void> = recommendationService.upvote(id);

        expect(response).rejects.toStrictEqual({type: "not_found", message: ""});
    });

    it("should downvote an existing recommendation", async()=>{
        const recommendation : Recommendation = recommendationFactory.__expectValidObject();

        jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValue(recommendation);

        jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValue({...recommendation, score: recommendation.score - 1});

        const response : void = await recommendationService.downvote(recommendation.id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(response).toBe(undefined);
    });

    it("should downvote and remove an existing recommendation", async()=>{
        const recommendation : Recommendation = recommendationFactory.__badValidObject();

        jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValue(recommendation);

        jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValue({...recommendation, score: recommendation.score - 1});

        jest
        .spyOn(recommendationRepository, "remove")
        .mockResolvedValue();

        await recommendationService.downvote(recommendation.id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    });

    it("should gather all recommendations", async()=>{
        const list = recommendationFactory.__recommendationList();

        jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValue(list);

        const response : Recommendation[] = await recommendationService.get();

        expect(response).toStrictEqual(list);
        expect(response.length).toBeLessThanOrEqual(10);
        expect(recommendationRepository.findAll).toBeCalled();
    });

    it("should gather the best recommendations", async()=>{
        const topQty : number = 5;
        const orderedList : Recommendation[] = recommendationFactory.__orderedList();

        jest
        .spyOn(recommendationRepository, "getAmountByScore")
        .mockResolvedValue(orderedList);

        const response : Recommendation[] = await recommendationService.getTop(topQty);

        expect(response).toStrictEqual(orderedList);
        expect(response).toBeInstanceOf(Array);
        expect(recommendationRepository.getAmountByScore).toBeCalled();
        expect(response.length).toBeLessThanOrEqual(topQty);
        expect(response[0].score).toBe(9);
    });

    it("should get a random recommendation with less than 10 score points", async()=>{
        const list = recommendationFactory.__orderedList()
        jest
        .spyOn(Math, "random")
        .mockReturnValue(0.6);

        jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValue(list);

        const response : Recommendation = await recommendationService.getRandom();
        const randomPicked : Recommendation[] = list.filter((e)=> e.name === response.name);
       
        expect(list).toContain(response);
        expect(response).toStrictEqual(randomPicked[0]);
        expect(response.score).toBeLessThan(10);
        expect(recommendationRepository.findAll).toBeCalled();
    });

    it("should get a random recommendation with less than 10 score points", async()=>{
        const list = recommendationFactory.__highOrderedList()
        jest
        .spyOn(Math, "random")
        .mockReturnValue(0.8);

        jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValue(list);

        const response : Recommendation = await recommendationService.getRandom();
        const randomPicked : Recommendation[] = list.filter((e)=> e.name === response.name);
       
        expect(list).toContain(response);
        expect(response).toStrictEqual(randomPicked[0]);
        expect(response.score).toBeGreaterThan(10);
        expect(recommendationRepository.findAll).toBeCalled();
    });

    it("should throw while trying to get a random recommendation", async()=>{

        jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValue([]);

        const response = recommendationService.getRandom();

        expect(response).rejects.toEqual({type:"not_found", message: ""});
        expect(recommendationRepository.findAll).toBeCalled();
    });
})