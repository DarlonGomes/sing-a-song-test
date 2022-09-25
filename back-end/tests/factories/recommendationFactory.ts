import app from "../../src/app";
import supertest from "supertest";

export function insertValidObject(){
    return{
        name:"Ninja Sex Party - Mansion Party",
        youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw"
      }
}

export function expectValidObject(){
    return{
        id:1,
        name:"Ninja Sex Party - Mansion Party",
        youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
        score: 10
    }
}

export function insertInvalidObject(){
    return{
        name:"Ninja Sex Party - Mansion Party",
        youtubeLink:"https://www.globo.com"
      }
}

export async function getValidId (){
   const response =  await supertest(app).get("/recommendations/random");
   const id = response.body.id
   return id
}

export async function getTheWorstSongId(){
    const response =  await supertest(app).get("/recommendations/top/10");
    const id = response.body[response.body.length - 1].id
    return id
}
