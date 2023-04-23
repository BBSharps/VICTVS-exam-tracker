const app = require("../api/app");
const request = require("supertest");
const { seed } = require("../database/seed");
const db = require("../database/index");

beforeEach(() => seed());
afterAll(() => db.end());

describe("exams", () => {
  test("GET/api/exams should return an Object", () => {
    return request(app)
      .get("/api/exams")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });
  test("GET/api/exams should return the requested data", () => {
    return request(app)
      .get("/api/exams")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(20);
        res.body.exams.map((exam) => {
          expect(exam).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              candidate_id: expect.any(Number),
              date: expect.any(String),
              location_name: expect.any(String),
            })
          );
        });
      });
  });
});
