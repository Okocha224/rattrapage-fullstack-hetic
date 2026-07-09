const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

router.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis" });
    return;
  }

  authService.signup(username, password, function (err, user) {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(201).json(user);
  });
});

router.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis" });
    return;
  }

  authService.login(username, password, function (err, user) {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (!user) {
      res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
      return;
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    res.status(200).json(user);
  });
});

module.exports = router;