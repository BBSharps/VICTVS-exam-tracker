const con = require(".");
const data = require("./TechTestJson.json");

con.connect(function (err) {
  if (err) throw err;
});
con.query(
  "CREATE TABLE candidates (candidate_id INT,candidate_name VARCHAR(20) )",
  function (err, res) {
    if (err) throw err;
  }
);
const inputCheck = [];
const input = [];
data.forEach((candidate) => {
  inputCheck.includes(candidate.Candidateid)
    ? null
    : input.push([candidate.Candidateid, candidate.CandidateName]);
  inputCheck.push(candidate.Candidateid);
});
con.query("INSERT INTO candidates VALUES ?", [input], function (err, res) {
  if (err) throw err;
});

con.end();
