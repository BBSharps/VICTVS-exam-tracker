const db = require(".");
const data = require("./TechTestJson.json");
const format = require("pg-format");

exports.seed_candidates = () => {
  return db
    .query("DROP TABLE IF EXISTS candidates")
    .then(() => {
      return db.query(
        "CREATE TABLE candidates (candidate_id INT,candidate_name VARCHAR(20) )"
      );
    })
    .then(() => {
      const inputCheck = [];
      const input = [];
      data.forEach((candidate) => {
        inputCheck.includes(candidate.Candidateid)
          ? null
          : input.push([candidate.Candidateid, candidate.CandidateName]);
        inputCheck.push(candidate.Candidateid);
      });
      const query = format(
        "INSERT INTO candidates (candidate_id,candidate_name) VALUES %L",
        input
      );

      return db.query(query);
    })
    .catch((err) => {
      console.log(err);
    });
};
