const seed = require("./seed");
const db = require("./connection");
const { genres, artists, songs, playlists } = require("./data/dev");

seed(genres, artists, songs, playlists).then(() => {
  db.end();
});
