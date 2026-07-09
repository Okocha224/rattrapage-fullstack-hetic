const express = require("express");
const cors    = require("cors");
const session = require("express-session");
const path    = require("path");
const config  = require("./config");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*", credentials: true, optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "🎵 API en ligne !" });
});

app.use((err, req, res, next) => {
  console.error(`[ERREUR] ${err.message}`);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});