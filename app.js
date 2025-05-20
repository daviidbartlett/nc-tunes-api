const express = require("express");
const { getArtists, getArtistById } = require("./controllers/artists");
const {
  handlePathNotFound,
  handlesBadRequests,
  handleCustomErrors,
} = require("./controllers/errors");

const app = express();

app.get("/api/artists", getArtists);

app.get("/api/artists/:id", getArtistById);

app.all("/*invalidPath", handlePathNotFound);

app.use(handleCustomErrors);

app.use(handlesBadRequests);

module.exports = app;
