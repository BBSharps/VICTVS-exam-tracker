const db = require("../../database/index");

exports.selectExams = (id, location) => {
  const queryArray = [];
  let queryString = `SELECT * FROM exams`;
  if (id !== undefined) {
    queryArray.push(id);
    queryString += ` WHERE candidate_id= $${queryArray.indexOf(id) + 1}`;
  }
  if (location !== undefined) {
    queryArray.push(location);
    queryString += ` WHERE location_name = $${
      queryArray.indexOf(location) + 1
    }`;
  }
  return db.query(queryString, queryArray).then((res) => {
    if (location !== undefined && res.rowCount === 0) {
      return 400;
    }
    return res.rows;
  });
};
