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

describe("GET /api/ducks/found", () => {
  test("200: returns array of only ducks that have been found", async () => {
    const {
      body: { ducks },
    } = await request(app).get("/api/ducks/found").expect(200);
    expect(ducks).toHaveLength(26);
    ducks.forEach((duck) => {
      expect(duck).toEqual(
        expect.objectContaining({
          duck_id: expect.any(Number),
          duck_name: expect.any(String),
          maker_id: expect.any(Number),
          finder_id: expect.any(Number),
          location_placed_lat: expect.any(Number),
          location_placed_lng: expect.any(Number),
          location_found_lat: expect.any(Number),
          location_found_lng: expect.any(Number),
          clue: expect.any(String),
          image: expect.any(String),
          comments: expect.any(String),
        })
      );
    });
  });
});

describe("GET /api/ducks/unfound", () => {
  test("200: returns array of all unfound ducks ", async () => {
    const {
      body: { ducks },
    } = await request(app).get("/api/ducks/unfound").expect(200);
    expect(ducks).toHaveLength(4);
    ducks.forEach((duck) => {
      expect(duck).toEqual(
        expect.objectContaining({
          duck_name: expect.any(String),
          finder_id: null,
          location_placed_lat: expect.any(Number),
          location_placed_lng: expect.any(Number),
          clue: expect.any(String),
          user_name: expect.any(String),
        })
      );
    });
  });
});
