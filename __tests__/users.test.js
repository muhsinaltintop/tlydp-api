const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("user endpoints", () => {
  describe("POST /api/users/register", () => {
    test("201: returns new user object", async () => {
      const newUser = {
        user_name: "beeboop",
        first_name: "Doug",
        last_name: "Webster",
        password: "Iloveducks22",
        email: "beeboop@gmail.com",
        profile_pic:
          "https://robohash.org/autetdolorum.png?size=50x50&set=set1",
      };
      const {
        body: { user },
      } = await request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(201);
      expect(user).toEqual({
        user_id: expect.any(Number),
        user_name: "beeboop",
        first_name: "Doug",
        last_name: "Webster",
        password: "Iloveducks22",
        email: "beeboop@gmail.com",
        profile_pic:
          "https://robohash.org/autetdolorum.png?size=50x50&set=set1",
      });
    });
    test("400: returns error message when passed user_name that already exists", async () => {
      const newUser = {
        user_name: "jbuggy2",
        first_name: "Doug",
        last_name: "Webster",
        password: "Iloveducks22",
        email: "newuser@gmail.com",
        profile_pic:
          "https://robohash.org/autetdolorum.png?size=50x50&set=set1",
      };
      const {
        body: { msg },
      } = await request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(400);
      expect(msg).toBe("An account with that user_name already exists");
    });
    test("400: returns error message when passed email that already exists", async () => {
      const newUser = {
        user_name: "newUser",
        first_name: "Doug",
        last_name: "Webster",
        password: "Iloveducks22",
        email: "bmcgenis1@hibu.com",
        profile_pic:
          "https://robohash.org/autetdolorum.png?size=50x50&set=set1",
      };
      const {
        body: { msg },
      } = await request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(400);
      expect(msg).toBe("An account with that email already exists");
    });
    test("400: returns error message when passed incorrect field type", async () => {
      const newUser = {
        user_name: 666,
        first_name: "Doug",
        last_name: "Webster",
        password: "Iloveducks22",
        email: "beeboop@gmail.com",
        profile_pic:
          "https://robohash.org/autetdolorum.png?size=50x50&set=set1",
      };
      const {
        body: { msg },
      } = await request(app)
        .post("/api/users/register")
        .send(newUser)
        .expect(400);
      expect(msg).toBe("user_name must be a string");
    });
  });
  describe("POST /api/users/login", () => {
    test("200: returns user object when passed correct password", async () => {
      const existingUser = {
        user_name: "bmcgenis1",
        password: "IkvOvGwoX3Xs",
      };
      const {
        body: { user },
      } = await request(app)
        .post("/api/users/login")
        .send(existingUser)
        .expect(200);
      expect(user).toEqual({
        user_id: 2,
        user_name: "bmcgenis1",
        first_name: "Brewster",
        last_name: "McGenis",
        password: "IkvOvGwoX3Xs",
        email: "bmcgenis1@hibu.com",
        profile_pic:
          "https://robohash.org/estculpanulla.png?size=50x50&set=set1",
      });
    });
    test("400: returns error message when passed incorrect password", async () => {
      const existingUser = {
        user_name: "bmcgenis1",
        password: "incorrect",
      };
      const {
        body: { msg },
      } = await request(app)
        .post("/api/users/login")
        .send(existingUser)
        .expect(400);
      expect(msg).toBe("Incorrect password");
    });
    test("400: returns error message when passed incorrect field types", async () => {
      const existingUser = {
        user_name: "bmcgenis1",
        password: 45644,
      };
      const {
        body: { msg },
      } = await request(app)
        .post("/api/users/login")
        .send(existingUser)
        .expect(400);
      expect(msg).toBe("password must be a string");
    });
    test("404: returns error message when passed non-existent user", async () => {
      const existingUser = {
        user_name: "Duckyboi",
        password: "password",
      };
      const {
        body: { msg },
      } = await request(app)
        .post("/api/users/login")
        .send(existingUser)
        .expect(404);
      expect(msg).toBe("user does not exist");
    });
  });
  describe("GET /api/users/:user_name", () => {
    test("200: returns user object", async () => {
      const {
        body: { user },
      } = await request(app).get("/api/users/whallut0").expect(200);
      expect(user).toEqual({
        user_id: 1,
        user_name: "whallut0",
        first_name: "Willyt",
        last_name: "Hallut",
        password: "8hTQxu9NNR",
        email: "whallut0@freewebs.com",
        profile_pic:
          "https://robohash.org/sedducimuset.png?size=50x50&set=set1",
      });
    });
  });
});
