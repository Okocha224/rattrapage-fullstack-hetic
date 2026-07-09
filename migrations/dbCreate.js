const mysql = require("mysql2");
const config = require("../config");

const con = mysql.createConnection({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
});

con.connect(function (err) {
  if (err) {
    console.error("Erreur de connexion :", err.message);
    process.exit(1);
  }
  console.log("Connecté au serveur MySQL");

  con.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database}`, function (err) {
    if (err) {
      console.error("Erreur création DB :", err.message);
      con.end();
      process.exit(1);
    }
    console.log(`Base de données '${config.db.database}' prête`);
    con.end();
  });
});