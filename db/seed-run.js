const seed = require("./seed");
const db = require("./connection");
const { genres, artists, songs, playlists } = require("./data/test");

seed(genres, artists, songs, playlists).then(() => {
  db.end();
});
