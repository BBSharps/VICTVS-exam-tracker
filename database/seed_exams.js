const db = require(".");
const data = require("./TechTestJson.json");
const format = require("pg-format");

exports.seed_exams = () => {
  return db
    .query("DROP TABLE IF EXISTS exams")
    .then(() => {
      return db.query(
        "CREATE TABLE exams (id INT,title VARCHAR(20),description VARCHAR(50),candidate_id INT,date VARCHAR(20), time TIME,location_Name VARCHAR(20) )"
      );
    })
    .then(() => {
      const input = data.map((exam) => {
        return [
          exam.id,
          exam.Title,
          exam.Description,
          exam.Candidateid,
          exam.Date.slice(0, 10),
          exam.Date.slice(11),
          exam.LocationName,
        ];
      });
      const query = format(
        "INSERT INTO exams (id, title, description, candidate_id, date, time, location_Name) VALUES%L",
        input
      );

      return db.query(query);
    })
    .catch((err) => {
      console.log(err);
    });
};
