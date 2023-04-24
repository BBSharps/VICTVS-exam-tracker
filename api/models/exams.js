const db = require("../../database/index");

exports.selectExams = (id, location, date) => {
  const queryArray = [];
  let queryString = `SELECT title, description, candidate_id, date, time, location_name FROM exams`;
  if (id !== undefined || date !== undefined || location !== undefined) {
    queryString += ` WHERE`;
  }
  if (id !== undefined) {
    queryArray.push(id);
    queryString += ` (candidate_id= $${queryArray.indexOf(id) + 1})`;
  }
  if (date !== undefined) {
    queryArray.push(date);
    if (id !== undefined) {
      queryString += ` AND`;
    }
    queryString += ` (date= $${queryArray.indexOf(date) + 1})`;
  }
  if (location !== undefined) {
    queryArray.push(location);
    if (id !== undefined || date !== undefined) {
      queryString += ` AND`;
    }
    queryString += ` (location_name = $${queryArray.indexOf(location) + 1})`;
  }
  return db.query(queryString, queryArray).then((res) => {
    if (location !== undefined && res.rowCount === 0) {
      return 400;
    }
    return res.rows;
  });
};
