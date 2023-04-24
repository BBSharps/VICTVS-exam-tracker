const app = require("../app");
const request = require("supertest");
const { seed } = require("../database/seed");
const db = require("../database/index");

beforeEach(() => seed());
afterAll(() => db.end());

describe("GET/api/candidates", () => {
  test("GET/api/candidates should return an Object", () => {
    return request(app)
      .get("/api/candidates")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });
  test("GET/api/candidates should return the requested data", () => {
    return request(app)
      .get("/api/candidates")
      .expect(200)
      .then((res) => {
        expect(res.body.candidates.length).toBe(4);
        res.body.candidates.map((candidate) => {
          expect(candidate).toEqual(
            expect.objectContaining({
              candidate_id: expect.any(Number),
              candidate_name: expect.any(String),
            })
          );
        });
      });
  });
});
