const { fetchSongs, addSong } = require("../models/songs");

exports.getSongs = async (req, res, next) => {
  const { sortby } = req.query;

  const songs = await fetchSongs(sortby);

  res.status(200).send({ songs });
};

exports.postSong = async (req, res, next) => {
  const newSong = req.body;

  const song = await addSong(newSong);

  res.status(201).send({ song });
};
