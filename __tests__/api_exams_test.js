const app = require("../app");
const request = require("supertest");
const { seed } = require("../database/seed");
const db = require("../database/index");
const data = require("../database/TechTestJson.json");

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
              latitude: expect.any(Number),
              longitude: expect.any(Number),
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
              latitude: expect.any(Number),
              longitude: expect.any(Number),
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
              latitude: expect.any(Number),
              longitude: expect.any(Number),
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
              latitude: expect.any(Number),
              longitude: expect.any(Number),
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
  test.only("GET/api/exams should return the requested data if using querys for date,location and id", () => {
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
              latitude: expect.any(Number),
              longitude: expect.any(Number),
            })
          );
        });
      });
  });
  test.only("GET/api/exams should return the requested data if using querys for date,location and id", () => {
    return request(app)
      .get("/api/exams?id=0&location=Sydney")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(0);
      });
  });
  test.only("GET/api/exams should return status 400 if using a query for a none existent location ", () => {
    return request(app).get("/api/exams?location=Banana").expect(400);
  });
  test("GET/api/exams should return the requested data in date Descending if passed an order by desc", () => {
    return request(app)
      .get("/api/exams?order=desc")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(20);
        const sortedData = data
          .sort((a, b) => (a.Date < b.Date ? 1 : b.Date < a.Date ? -1 : 0))
          .map((exam) => {
            return exam.Date.slice(0, 10);
          });
        const examsDates = res.body.exams.map((exam) => {
          return exam.date;
        });
        expect(examsDates).toEqual(sortedData);
      });
  });
  test("GET/api/exams should return the requested data in date Ascending if passed an order by asc ", () => {
    return request(app)
      .get("/api/exams?order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(20);
        const sortedData = data
          .sort((a, b) => (a.Date > b.Date ? 1 : b.Date > a.Date ? -1 : 0))
          .map((exam) => {
            return exam.Date.slice(0, 10);
          });
        const examsDates = res.body.exams.map((exam) => {
          return exam.date;
        });
        expect(examsDates).toEqual(sortedData);
      });
  });
  test("GET/api/exams should return status 400 if using order that is not asc or desc ", () => {
    return request(app).get("/api/exams?order=Banana").expect(400);
  });
  test("GET/api/exams should return the requested data if using querys for location,id and order by date", () => {
    return request(app)
      .get("/api/exams?order=asc&id=0&location=London")
      .expect(200)
      .then((res) => {
        expect(res.body.exams.length).toBe(11);
        res.body.exams.map((exam) => {
          expect(exam).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              description: expect.any(String),
              candidate_id: 0,
              date: expect.any(String),
              time: expect.any(String),
              location_name: "London",
              latitude: expect.any(Number),
              longitude: expect.any(Number),
            })
          );
        });
        const sortedData = data
          .sort((a, b) => (a.Date > b.Date ? 1 : b.Date > a.Date ? -1 : 0))
          .map((exam) => {
            if (exam.Candidateid === 0 && exam.LocationName === "London")
              return exam.Date.slice(0, 10);
          })
          .filter((exam) => {
            return exam !== undefined;
          });
        const examsDates = res.body.exams.map((exam) => {
          return exam.date;
        });
        expect(examsDates).toEqual(sortedData);
      });
  });
});
