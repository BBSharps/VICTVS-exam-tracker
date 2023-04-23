const con = require(".");
const data = require("./TechTestJson.json");

con.connect(function (err) {
  if (err) throw err;
});
con.query(
  "CREATE TABLE exams (id INT,title VARCHAR(20),description VARCHAR(50),candidate_id INT,date VARCHAR(20),location_Name VARCHAR(20) )",
  function (err, res) {
    if (err) throw err;
  }
);
const input = data.map((exam) => {
  return [
    exam.id,
    exam.Title,
    exam.Description,
    exam.Candidateid,
    exam.Date,
    exam.LocationName,
  ];
});
con.query("INSERT INTO exams VALUES ?", [input], function (err, res) {
  if (err) throw err;
});

con.end();
