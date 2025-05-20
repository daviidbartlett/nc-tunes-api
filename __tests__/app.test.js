const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

afterAll(() => {
  db.end();
});

describe("app", () => {
  test("non-existent endpoint responds with 404 and msg", async () => {
    const { body } = await request(app).get("/non-existent-path").expect(404);

    expect(body.msg).toBe("Path not found.");
  });
  describe("GET - /api/artists", () => {
    test("responds with status of 200", async () => {
      await request(app).get("/api/artists").expect(200);
    });
    test("responds with an array of artists that contains artist_name and rating", async () => {
      const { body } = await request(app).get("/api/artists");

      expect(Array.isArray(body.artists)).toBe(true);

      expect(body.artists.length > 0).toBe(true);

      body.artists.forEach((artist) => {
        expect(artist.hasOwnProperty("artist_name")).toBe(true);
        expect(artist.hasOwnProperty("rating")).toBe(true);
      });
    });
  });
  describe("GET - /api/artists/:id", () => {
    test("happy path...", () => {});
    test("invalid ID responds with 400 and msg ", async () => {
      const { body } = await request(app)
        .get("/api/artists/invalid-id")
        .expect(400);

      expect(body.msg).toBe("Bad Request.");
    });
    test("valid ID but non-exisitent responds with 404 and msg", async () => {
      const { body } = await request(app).get("/api/artists/9999").expect(404);

      expect(body.msg).toBe("Artist not found.");
    });
  });
});
