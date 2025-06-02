const express = require("express");
const { getArtists, getArtistById } = require("./controllers/artists");
const {
  handlePathNotFound,
  handlesBadRequests,
  handleCustomErrors,
  handleServerErrors,
} = require("./controllers/errors");

const { getSongs } = require("./controllers/songs");

const app = express();

app.use(express.json());

app.get("/api/artists", getArtists);

app.get("/api/artists/:id", getArtistById);

app.get("/api/songs", getSongs);

app.all("/*invalidPath", handlePathNotFound);

// error handling middleware functions

app.use(handleCustomErrors);

app.use(handlesBadRequests);

app.use(handleServerErrors);

module.exports = app;
