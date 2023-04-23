const db = require("../../database/index");

exports.selectExams = () => {
  return db.query(`SELECT * FROM exams`).then((res) => {
    return res.rows;
  });
};
