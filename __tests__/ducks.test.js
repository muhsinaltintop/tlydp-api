const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const { expect } = require("@jest/globals");

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
  test("400: returns error message when passed an invalid maker_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/ducks?maker_id=invalid").expect(400);
    expect(msg).toBe("Invalid maker ID");
  });
  test("404: returns error message when passed valid but non-existent maker_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/ducks?maker_id=666").expect(404);
    expect(msg).toBe("user does not exist");
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
  test("400: returns error message when passed invalid finder_id", async () => {
    const {
      body: { msg },
    } = await request(app)
      .get("/api/ducks/found?finder_id=invalid")
      .expect(400);
    expect(msg).toBe("Invalid user ID");
  });
  test("404: returns error message when passed valid but non-existent finder_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/ducks/found?finder_id=123").expect(404);
    expect(msg).toBe("user does not exist");
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
  test("400: returns error message when passed invalid maker_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/ducks/found?maker_id=invalid").expect(400);
    expect(msg).toBe("Invalid user ID");
  });
  test("404: returns error message when passed valid but non-existent maker_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/ducks/found?maker_id=1653").expect(404);
    expect(msg).toBe("user does not exist");
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
          duck_id: expect.any(Number),
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
  test("200: returns only unfound ducks placed at a location passed by a location query", async () => {
    const {
      body: { ducks },
    } = await request(app)
      .get(
        "/api/ducks/unfound?location_placed_lat=53.488087&&location_placed_lng=-10.022186"
      )
      .expect(200);
    ducks.forEach((duck) => {
      expect(duck).toEqual(
        expect.objectContaining({
          finder_id: null,
          location_placed_lat: 53.488087,
          location_placed_lng: -10.022186,
        })
      );
    });
  });
  test("400: returns error message when only passed location latitude query", async () => {
    const {
      body: { msg },
    } = await request(app)
      .get("/api/ducks/unfound?location_placed_lat=53.488087")
      .expect(400);
    expect(msg).toBe("Both latitude and longitude coordinates required");
  });
  test("400: returns error message when only passed location longitude query", async () => {
    const {
      body: { msg },
    } = await request(app)
      .get("/api/ducks/unfound?location_placed_lng=-10.022186")
      .expect(400);
    expect(msg).toBe("Both latitude and longitude coordinates required");
  });
  test("400: returns error message when passed a string type latitude query", async () => {
    const {
      body: { msg },
    } = await request(app)
      .get(
        "/api/ducks/unfound?location_placed_lat=gowest&&location_placed_lng=-10.022186"
      )
      .expect(400);
    expect(msg).toBe("Coordinates must be numbers");
  });
  test("400: returns error message when passed a string type longitude query", async () => {
    const {
      body: { msg },
    } = await request(app)
      .get(
        "/api/ducks/unfound?location_placed_lat=53.488087&&location_placed_lng=upnorth"
      )
      .expect(400);
    expect(msg).toBe("Coordinates must be numbers");
  });
});

describe("GET /api/ducks/:duck_id", () => {
  test("200: returns a single duck object with the correct ID", async () => {
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
  test("400: returns error message when passed invalid duck_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/ducks/invalid").expect(400);
    expect(msg).toBe("Invalid duck ID");
  });
  test("404: returns error message when passed valid but non-existent duck_id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/ducks/842").expect(404);
    expect(msg).toBe("duck does not exist");
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
        maker_name: "bmcgenis1",
        finder_name: "jbuggy2",
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
  test("400: returns error message when passed invalid duck_id", async () => {
    const foundDuck = {
      finder_id: 3,
      location_found_lat: 38.7894166,
      location_found_lng: 7.986,
      image:
        "https://www.shutterstock.com/image-vector/yellow-duck-toy-inflatable-rubber-vector-1677879052",
      comments: "I found a duck",
    };
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/ducks/invalid")
      .send(foundDuck)
      .expect(400);
    expect(msg).toBe("Invalid duck ID");
  });
  test("404: returns error message when valid but non-existent duck_id", async () => {
    const foundDuck = {
      finder_id: 3,
      location_found_lat: 38.7894166,
      location_found_lng: 7.986,
      image:
        "https://www.shutterstock.com/image-vector/yellow-duck-toy-inflatable-rubber-vector-1677879052",
      comments: "I found a duck",
    };
    const {
      body: { msg },
    } = await request(app).patch("/api/ducks/649").send(foundDuck).expect(404);
    expect(msg).toBe("duck does not exist");
  });
  test("400: returns error message when passed invalid field type", async () => {
    const foundDuck = {
      finder_id: "boo",
      location_found_lat: 38.7894166,
      location_found_lng: 7.986,
      image:
        "https://www.shutterstock.com/image-vector/yellow-duck-toy-inflatable-rubber-vector-1677879052",
      comments: "I found a duck",
    };
    const {
      body: { msg },
    } = await request(app).patch("/api/ducks/2").send(foundDuck).expect(400);
    expect(msg).toBe("finder_id must be a number");
  });
});

describe("POST /api/ducks", () => {
  test("201: returns created duck object", async () => {
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
  test("400: returns error message when passed invalid field", async () => {
    const newDuck = {
      duck_name: "Quacky",
      maker_id: 3,
      location_placed_lat: "Up North",
      location_placed_lng: -10.022186,
      clue: "Find me",
    };

    const {
      body: { msg },
    } = await request(app).post("/api/ducks").send(newDuck).expect(400);
    expect(msg).toBe("location_placed_lat must be a number");
  });
  test("400: returns error message when passed ", async () => {
    const newDuck = {
      duck_name: "Quacky",
      maker_id: "Becca",
      location_placed_lat: 53.488087,
      location_placed_lng: -10.022186,
      clue: "Find me",
    };

    const {
      body: { msg },
    } = await request(app).post("/api/ducks").send(newDuck).expect(400);
    expect(msg).toBe("Invalid maker ID");
  });
  test("404: returns error message when passed valid but non-existent maker_id", async () => {
    const newDuck = {
      duck_name: "Quacky",
      maker_id: 789,
      location_placed_lat: 53.488087,
      location_placed_lng: -10.022186,
      clue: "Find me",
    };

    const {
      body: { msg },
    } = await request(app).post("/api/ducks").send(newDuck).expect(404);
    expect(msg).toBe("user does not exist");
  });
});

describe("PATCH /api/ducks/unfound", () => {
  test("200: returns updated duck object", async () => {
    const updatedDuck = {
      duck_name: "Kristan",
      finder_id: 5,
      location_found_lat: 53.488087,
      location_found_lng: -10.022186,
      image: "http://dummyimage.com/112x100.png/cc0000/ffffff",
      comments: "I found a duck",
    };
    const {
      body: { duck },
    } = await request(app)
      .patch("/api/ducks/unfound")
      .send(updatedDuck)
      .expect(200);
    expect(duck).toEqual(
      expect.objectContaining({
        duck_id: 5,
        maker_id: 2,
        maker_name: "bmcgenis1",
        finder_id: 5,
        finder_name: "aeastridge4",
        location_found_lat: 53.488087,
        location_found_lng: -10.022186,
        image: "http://dummyimage.com/112x100.png/cc0000/ffffff",
        comments: "I found a duck",
      })
    );
  });
});
