const express = require("express");
const router = express.Router();
const musicService = require("../services/musicService");

router.get("/genres", function (req, res) {
  musicService.getGenres(function (err, genres) {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(200).json(genres);
  });
});

router.get("/tracks/:genreId", function (req, res) {
  const genreId = req.params.genreId;

  musicService.getTracksByGenreId(genreId, function (err, tracks) {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(200).json(tracks);
  });
});

module.exports = router;