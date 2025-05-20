const { fetchSongs } = require("../models/songs");

exports.getSongs = async (req, res, next) => {
  const { sortby } = req.query;

  const songs = await fetchSongs(sortby);

  res.status(200).send({ songs });
};
