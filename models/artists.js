const db = require("../db/connection");

exports.fetchArtists = async () => {
  const { rows } = await db.query("SELECT artist_name, rating FROM artists;");

  return rows;
};

exports.fetchArtistById = async (id) => {
  const {
    rows: [artist],
  } = await db.query("SELECT * FROM artists WHERE artist_id = $1", [id]);

  if (artist === undefined) {
    return Promise.reject({ status: 404, msg: "Artist not found." });
  }

  return artist;
};
