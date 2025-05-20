const db = require("./connection");
const createArtistRef = require("./utils");
const format = require("pg-format");

async function seed(genres, artists, songs, playlists) {
  await db.query(`DROP TABLE IF EXISTS songs;`);
  await db.query(`DROP TABLE IF EXISTS genres;`);
  await db.query(`DROP TABLE IF EXISTS artists;`);

  await db.query(`CREATE TABLE genres (
                genre_name VARCHAR(40) PRIMARY KEY,
                description TEXT
                );`);

  await db.query(`CREATE TABLE artists (
                artist_id SERIAL PRIMARY KEY,
                artist_name VARCHAR(40) NOT NULL,
                rating INT            
                );`);

  await db.query(`CREATE TABLE songs(
                     song_id SERIAL PRIMARY KEY,
                     song_title VARCHAR(40) NOT NULL,
                     release_year INT,
                     artist_id INT NOT NULL REFERENCES artists(artist_id),
                     genre VARCHAR REFERENCES genres(genre_name)
                );`);

  await db.query(
    format(
      `INSERT INTO genres (genre_name, description) VALUES %L`,
      genres.map(({ genre_name, description }) => [genre_name, description])
    )
  );

  const { rows: insertedArtists } = await db.query(
    format(
      "INSERT INTO artists (artist_name, rating) VALUES %L RETURNING *;",
      artists.map(({ artist_name, rating }) => [artist_name, rating])
    )
  );

  const ref = createArtistRef(insertedArtists);

  const formattedSongs = songs.map((song) => {
    return [song.title, song.release_year, ref[song.artist_name], song.genre];
  });

  await db.query(
    format(
      "INSERT INTO songs (song_title, release_year, artist_id, genre) VALUES %L;",
      formattedSongs
    )
  );

  await db.query(`CREATE TABLE playlists (
            playlist_id SERIAL PRIMARY KEY,
            playlist_name VARCHAR(100),
            is_public BOOLEAN
  );`),
    await db.query(`CREATE TABLE playlists_songs (
  playlist_id INT REFERENCES playlists(playlist_id),
    song_id INT REFERENCES songs(song_id)
);`);

  const { rows: insertedPlaylists } = await db.query(
    format(
      "INSERT INTO playlists (playlist_name, is_public) VALUES %L;",
      playlists.map((pl) => [pl.playlist_name, pl.is_public])
    )
  );

  await db.query(`INSERT INTO playlists_songs (playlist_id, song_id)
VALUES
(1, 1),
(1, 3),
(1, 6),
(1, 7),
(2, 1), 
(2, 2),
(2, 4),
(2, 5),
(2, 7);`);
}

module.exports = seed;
