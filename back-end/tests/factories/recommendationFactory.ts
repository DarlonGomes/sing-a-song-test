import app from "../../src/app";
import supertest from "supertest";
import { randFullName } from '@ngneat/falso';

export function __insertValidObject(){
    return{
        name:"Ninja Sex Party - Mansion Party",
        youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw"
      }
}

export function __expectValidObject(){
    return{
        id:1,
        name:"Ninja Sex Party - Mansion Party",
        youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
        score: 10
    }
}

export function __lessThanTenVotesObject(){
    return{
        id:1,
        name:"Ninja Sex Party - Mansion Party",
        youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
        score: 7
    }
}

export function __badValidObject(){
    return{
        id:1,
        name:"This isn't a Ninja Sex Party music",
        youtubeLink:"https://www.youtube.com/watch?v=vGBJmgZSeRc",
        score: -5
    }
}

export function __insertInvalidObject(){
    return{
        name:"Ninja Sex Party - Mansion Party",
        youtubeLink:"https://www.globo.com"
      }
}

export async function __getValidId (){
   const response =  await supertest(app).get("/recommendations/random");
   const id = response.body.id
   return id
}

export async function __getTheWorstSongId(){
    const response =  await supertest(app).get("/recommendations/top/10");
    const id = response.body[response.body.length - 1].id
    return id
}

export function __recommendationList(){
    const data = [
        {
            id: 1,
            name:"Ninja Sex Party - Mansion Party",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 1,
        },
        {
            id: 2,
            name:"NSP - Mansion Party",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 2,
        },
        {
            id: 3,
            name:"Ninja Sex Party - Mansion Party - Official",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 3,
        },
        {
            id: 4,
            name:"Ninja Sex Party - Mansion Party - Legit",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 4,
        },
        {
            id: 5,
            name:"Ninja Sex Party - Mansion Party - Remastered (2050)",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 5,
        }
    ]
    return data
}

export function __orderedList(){
    const data = [
        {
            id: 1,
            name:"Ninja Sex Party - Mansion Party",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 9,
        },
        {
            id: 5,
            name:"NSP - Mansion Party",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 8,
        },
        {
            id: 2,
            name:"Ninja Sex Party - Mansion Party - Official",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 6,
        },
        {
            id: 4,
            name:"Ninja Sex Party - Mansion Party - Legit",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 4,
        },
        {
            id: 3,
            name:"Ninja Sex Party - Mansion Party - Remastered (2050)",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 1,
        }
    ]
    return data
}

export function __highOrderedList(){
    const data = [
        {
            id: 1,
            name:"Ninja Sex Party - Mansion Party",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 33,
        },
        {
            id: 5,
            name:"NSP - Mansion Party",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 26,
        },
        {
            id: 2,
            name:"Ninja Sex Party - Mansion Party - Official",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 19,
        },
        {
            id: 4,
            name:"Ninja Sex Party - Mansion Party - Legit",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 13,
        },
        {
            id: 3,
            name:"Ninja Sex Party - Mansion Party - Remastered (2050)",
            youtubeLink:"https://www.youtube.com/watch?v=dNoafUU4Ikw",
            score: 12,
        }
    ]
    return data
}