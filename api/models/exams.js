const db = require("../../database/index");

exports.selectExams = (id, location, date, order) => {
  const queryArray = [];
  let queryString = `SELECT title, description, candidate_id, date, time, exams.location_name, latitude, longitude FROM exams JOIN locations ON locations.location_name=exams.location_name`;
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
    queryString += ` (exams.location_name = $${
      queryArray.indexOf(location) + 1
    })`;
  }
  if (order !== undefined) {
    queryString += ` ORDER BY date`;
    order === "desc" ? (queryString += ` DESC`) : (queryString += ` ASC`);
  }

  return db.query(queryString, queryArray).then((res) => {
    return res.rows;
  });
};
