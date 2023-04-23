const dotenv = require("dotenv");
const mysql = require("mysql2");
dotenv.config();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

con.connect(function (err) {
  if (err) throw err;
});
con.query("DROP DATABASE IF EXISTS exams_database", function (err, res) {
  if (err) throw err;
});
con.query("CREATE DATABASE exams_database", function (err, res) {
  if (err) throw err;
});

con.end();
