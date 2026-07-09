const mysql = require("mysql2");
const config = require("../config");

const con = mysql.createConnection(config.db);

con.connect(function (err) {
  if (err) {
    console.error("Erreur de connexion :", err.message);
    process.exit(1);
  }
  console.log("Connecté à la base");

  con.query(
    `CREATE TABLE IF NOT EXISTS users (
      id         INT(11)      NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username   VARCHAR(40)  NOT NULL UNIQUE,
      password   VARCHAR(255) NOT NULL,
      created_at DATETIME     DEFAULT CURRENT_TIMESTAMP
    )`,
    function (err) {
      if (err) {
        console.error("Erreur table users :", err.message);
      } else {
        console.log("Table 'users' prête");
      }
      con.end();
    }
  );
});