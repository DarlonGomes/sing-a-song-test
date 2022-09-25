import { prisma } from "../../src/database";
import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import * as recommendationFactory from "../factories/recommendationFactory";

describe("recommendation service unit tests", () => {
    beforeEach(async()=>{
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it("should insert a new song recommendation", async()=>{
        const recommendation = recommendationFactory.insertValidObject()

        const search = jest
        .spyOn(recommendationRepository, "findByName")
        .mockResolvedValue(null);

        const create = jest
        .spyOn(recommendationRepository, "create")
        .mockResolvedValue()
        
        recommendationService.insert(recommendation);

        expect(search).toHaveBeenCalledTimes(1);
    });

    it("should throw when try to insert a existing name", async()=>{
        const recommendation = recommendationFactory.insertValidObject();
        const expectedRecommendation = recommendationFactory.expectValidObject();

        const search = jest
        .spyOn(recommendationRepository, "findByName")
        .mockResolvedValue(expectedRecommendation);

        const service = recommendationService.insert(recommendation);

        expect(search).toHaveBeenCalledTimes(1);
        expect(service).rejects.toEqual({type: "conflict", message: "Recommendations names must be unique"});
        expect(recommendationRepository.create).not.toBeCalled();
    });

    
})