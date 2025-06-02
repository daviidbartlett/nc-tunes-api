const seed = require("./seed");
const db = require("./connection");
const { genres, artists, songs, playlists } = require("./data");

seed(genres, artists, songs, playlists).then(() => {
  db.end();
});
