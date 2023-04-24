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
              title: expect.any(String),
              description: expect.any(String),
              candidate_id: expect.any(Number),
              date: expect.any(String),
              time: expect.any(String),
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
              title: expect.any(String),
              description: expect.any(String),
              candidate_id: 3,
              date: expect.any(String),
              time: expect.any(String),
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
  test("GET/api/exams should return the requested data if using the query for location", () => {
    return request(app)
      .get("/api/exams?location=London")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(11);
        res.body.exams.map((exam) => {
          expect(exam).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              description: expect.any(String),
              candidate_id: expect.any(Number),
              date: expect.any(String),
              time: expect.any(String),
              location_name: "London",
            })
          );
        });
      });
  });
  test("GET/api/exams should return status 400 if using a query for a none existent location ", () => {
    return request(app).get("/api/exams?location=Banana").expect(400);
  });
  test("GET/api/exams should return the requested data if using the query for date", () => {
    return request(app)
      .get("/api/exams?date=17/06/2023")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(1);
        res.body.exams.map((exam) => {
          expect(exam).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              description: expect.any(String),
              candidate_id: expect.any(Number),
              date: "17/06/2023",
              time: expect.any(String),
              location_name: expect.any(String),
            })
          );
        });
      });
  });
  test("GET/api/exams should return empty if using a query for a date that has no exams", () => {
    return request(app)
      .get("/api/exams?date=1/1/2000")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(0);
      });
  });
  test("GET/api/exams should return status 400 if using a query for a none existent date ", () => {
    return request(app).get("/api/exams?date=Banana").expect(400);
  });
  test("GET/api/exams should return the requested data if using querys for date,location and id", () => {
    return request(app)
      .get("/api/exams?date=05/05/2023&id=3&location=New York")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(2);
        res.body.exams.map((exam) => {
          expect(exam).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              description: expect.any(String),
              candidate_id: 3,
              date: "05/05/2023",
              time: expect.any(String),
              location_name: "New York",
            })
          );
        });
      });
  });
});
