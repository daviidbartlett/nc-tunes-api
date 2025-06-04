const express = require("express");
const { getArtists, getArtistById } = require("./controllers/artists");
const { getSongs, postSong } = require("./controllers/songs");

const {
  handlePathNotFound,
  handlesBadRequests,
  handleCustomErrors,
  handleServerErrors,
  handleNonExistentArtists,
} = require("./controllers/errors");

const app = express();

app.use(express.json());

app.get("/api/artists", getArtists);

app.get("/api/artists/:id", getArtistById);

app.get("/api/songs", getSongs);

app.post("/api/songs", postSong);

app.all("/*invalidPath", handlePathNotFound);

// error handling middleware functions

app.use(handleCustomErrors);

app.use(handlesBadRequests);

app.use(handleNonExistentArtists);

app.use(handleServerErrors);

module.exports = app;
