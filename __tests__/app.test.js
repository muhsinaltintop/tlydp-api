const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/ducks", () => {
  test("200: returns array of all ducks with all properties", async () => {
    const {
      body: { ducks },
    } = await request(app).get("/api/ducks").expect(200);
    expect(ducks).toHaveLength(30);
    ducks.forEach((duck) => {
      expect(duck).toEqual(
        expect.objectContaining({
          duck_id: expect.any(Number),
          duck_name: expect.any(String),
          maker_id: expect.any(Number),
          finder_id: expect.toBeTypeOrNull("number"),
          location_placed_lat: expect.any(Number),
          location_placed_lng: expect.any(Number),
          location_found_lat: expect.toBeTypeOrNull("number"),
          location_found_lng: expect.toBeTypeOrNull("number"),
          clue: expect.any(String),
          image: expect.any(String),
          comments: expect.toBeTypeOrNull("string"),
        })
      );
    });
  });
});
