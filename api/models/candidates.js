const db = require("../../database/index");

exports.selectCandidates = () => {
  return db.query(`SELECT * FROM candidates`).then((data) => {
    return data.rows;
  });
};
