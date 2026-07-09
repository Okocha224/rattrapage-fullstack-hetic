const mysql = require("mysql2");
const config = require("../config");

function query(sql, params, callback) {
  const connection = mysql.createConnection(config.db);
  connection.connect(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    connection.query(sql, params, function (err, results) {
      connection.end();
      callback(err, results);
    });
  });
}

module.exports = { query };