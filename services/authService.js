const bcrypt = require("bcrypt");
const db = require("./db");

function signup(username, password, callback) {
  bcrypt.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      callback(err, null);
      return;
    }

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, hashedPassword], function (err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, { id: result.insertId, username: username });
    });
  });
}

function login(username, password, callback) {
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], function (err, results) {
    if (err) {
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      callback(null, null);
      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.password, function (err, match) {
      if (err) {
        callback(err, null);
        return;
      }
      if (!match) {
        callback(null, null);
        return;
      }
      callback(null, { id: user.id, username: user.username });
    });
  });
}

module.exports = { signup, login };