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
          maker_name: expect.any(String),
          finder_name: expect.toBeTypeOrNull("string"),
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
  test("200: returns array of only ducks that have been made by a user when passed a maker_id query", async () => {
    const {
      body: { ducks },
    } = await request(app).get("/api/ducks?maker_id=2").expect(200);
    expect(ducks).toHaveLength(6);
    ducks.forEach((duck) => {
      expect(duck).toEqual(
        expect.objectContaining({
          duck_id: expect.any(Number),
          duck_name: expect.any(String),
          maker_id: 2,
          finder_id: expect.toBeTypeOrNull("number"),
          maker_name: expect.any(String),
          finder_name: expect.toBeTypeOrNull("string"),
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
          maker_name: expect.any(String),
          finder_name: expect.any(String),
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
  test("200: returns array of only ducks found by a user when passed a finder_id query", async () => {
    const {
      body: { ducks },
    } = await request(app).get("/api/ducks/found?finder_id=3").expect(200);
    expect(ducks).toHaveLength(7);
    ducks.forEach((duck) => {
      expect(duck).toEqual(
        expect.objectContaining({
          duck_id: expect.any(Number),
          duck_name: expect.any(String),
          maker_id: expect.any(Number),
          maker_name: expect.any(String),
          finder_id: 3,
          finder_name: "jbuggy2",
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
  test("200: returns array of only found ducks made by a user when passed a maker_id query", async () => {
    const {
      body: { ducks },
    } = await request(app).get("/api/ducks/found?maker_id=5").expect(200);
    expect(ducks).toHaveLength(5);
    ducks.forEach((duck) => {
      expect(duck).toEqual(
        expect.objectContaining({
          maker_id: 5,
          maker_name: "aeastridge4",
          finder_id: expect.any(Number),
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
          maker_name: expect.any(String),
        })
      );
    });
  });
});

describe("GET /api/ducks/:duck_id", () => {
  test("200: should return a single duck object with the correct ID", async () => {
    const {
      body: { duck },
    } = await request(app).get("/api/ducks/3").expect(200);
    expect(duck).toEqual(
      expect.objectContaining({
        duck_id: 3,
        duck_name: "Stefanie",
        maker_id: 3,
        finder_id: 5,
        maker_name: "jbuggy2",
        finder_name: "aeastridge4",
        location_placed_lat: -14.5205297,
        location_placed_lng: -75.2019585,
        location_found_lat: 38.7894166,
        location_found_lng: -9.2036136,
        clue: "mauris morbi non lectus aliquam sit amet diam in magna",
        image: "http://dummyimage.com/217x100.png/ff4444/ffffff",
        comments:
          "nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo",
      })
    );
  });
});

describe("PATCH /api/ducks/:duck_id", () => {
  test("200: returns updated duck object with new values", async () => {
    const foundDuck = {
      finder_id: 3,
      location_found_lat: 38.7894166,
      location_found_lng: 7.986,
      image:
        "https://www.shutterstock.com/image-vector/yellow-duck-toy-inflatable-rubber-vector-1677879052",
      comments: "I found a duck",
    };
    const {
      body: { duck },
    } = await request(app).patch("/api/ducks/5").send(foundDuck).expect(200);
    expect(duck).toEqual(
      expect.objectContaining({
        duck_name: "Kristan",
        maker_id: 2,
        finder_id: 3,
        location_placed_lat: 53.488087,
        location_placed_lng: -10.022186,
        location_found_lat: 38.7894166,
        location_found_lng: 7.986,
        clue: "amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut",
        image:
          "https://www.shutterstock.com/image-vector/yellow-duck-toy-inflatable-rubber-vector-1677879052",
        comments: "I found a duck",
      })
    );
  });
});

describe("POST /api/ducks", () => {
  test("201: should return created duck", async () => {
    const newDuck = {
      duck_name: "Quacky",
      maker_id: 2,
      location_placed_lat: 53.488087,
      location_placed_lng: -10.022186,
      clue: "Find me",
    };

    const {
      body: { duck },
    } = await request(app).post("/api/ducks").send(newDuck).expect(201);
    expect(duck).toEqual(
      expect.objectContaining({
        duck_name: "Quacky",
        maker_id: 2,
        finder_id: null,
        location_placed_lat: 53.488087,
        location_placed_lng: -10.022186,
        location_found_lat: null,
        location_found_lng: null,
        clue: "Find me",
        image: null,
        comments: null,
      })
    );
  });
});
