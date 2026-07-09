const express = require("express");
const router = express.Router();
const musicService = require("../services/musicService");

router.get("/genres", function (req, res) {
  if (!req.session.userId) {
    res.status(401).json({ message: "Vous devez être connecté" });
    return;
  }

  musicService.getGenres(function (err, genres) {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(200).json(genres);
  });
});

router.get("/tracks/:genreId", function (req, res) {
  if (!req.session.userId) {
    res.status(401).json({ message: "Vous devez être connecté" });
    return;
  }

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