const app = require("../api/app");
const request = require("supertest");
const { seed } = require("../database/seed");
const db = require("../database/index");

beforeEach(() => seed());
afterAll(() => db.end());

describe("instructions", () => {
  test("GET/api should return an Object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });
  test("GET/api should return the instructions", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body.apiPaths).toEqual({
          "GET /api": {
            description:
              "responds with a description of all paths and information on each",
          },
          "GET /api/exams": {
            description: "responds with an array of all exams",
            queries:
              "id=number,location=string, date=**/**/****. order=asc/desc",
            exampleResponse: {
              exams: [
                {
                  title: "VICTVS20",
                  description: "VICTVS Exam 20",
                  candidate_id: 0,
                  date: "25/08/2023",
                  time: "09:30:00",
                  location_name: "London",
                  latitude: 51.507351,
                  longitude: -0.127758,
                },
              ],
            },
          },
          "GET /api/candidates": {
            description: "responds with an array of all candidates",
            exampleResponse: {
              candidates: [{ candidate_id: 5, candidate_name: "Tom" }],
            },
          },
        });
      });
  });
});
