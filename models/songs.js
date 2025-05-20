const db = require("../db/connection");

exports.fetchSongs = async (sortby = "release_year") => {
  const validSortBys = ["release_year", "song_title"];

  const query = `SELECT song_title AS title,
            release_year,
            artist_name 
            FROM songs
            JOIN artists
            ON artists.artist_id = songs.artist_id
            ORDER BY ${sortby} ASC;`;

  const { rows } = await db.query(query);

  return rows;
};
