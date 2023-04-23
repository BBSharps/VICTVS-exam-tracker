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
  test("GET/api/exams should return the requested data if using the query for id", () => {
    return request(app)
      .get("/api/exams?id=3")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(2);
        res.body.exams.map((exam) => {
          expect(exam).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              candidate_id: 3,
              date: expect.any(String),
              location_name: expect.any(String),
            })
          );
        });
      });
  });
  test("GET/api/exams should return empty if using a query for an id that has no exams", () => {
    return request(app)
      .get("/api/exams?id=5")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(0);
      });
  });
  test("GET/api/exams should return status 400 if using a query that is not a number", () => {
    return request(app).get("/api/exams?id=notID").expect(400);
  });
});
