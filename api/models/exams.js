const db = require("../../database/index");

exports.selectExams = (id) => {
  let queryString = `SELECT * FROM exams`;
  if (id !== undefined) queryString += ` WHERE candidate_id=${id}`;
  return db.query(queryString).then((res) => {
    return res.rows;
  });
};
