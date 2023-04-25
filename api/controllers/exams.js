const { selectExams } = require("../models/exams");

exports.getExams = (req, res, next) => {
  const id = req.query.id;
  const date = req.query.date;
  const location = req.query.location;
  const order = req.query.order;
  let query = true;
  if (
    location !== undefined &&
    [
      "London",
      "Sydney",
      "Leeds",
      "Berlin",
      "Milan",
      "Woking",
      "New York",
    ].indexOf(location) === -1
  ) {
    query = false;
  }
  if (order !== undefined) {
    query = false;
    if (order === "asc" || order === "desc") {
      query = true;
    }
  }
  if (date !== undefined) {
    if (!Number(date.split("/")[2])) {
      query = false;
    }
  }
  id !== undefined && !Number(id) && Number(id) !== 0 ? (query = false) : null;
  if (!query) {
    return res.status(400).send({ error: "incorrect query" });
  } else {
    selectExams(id, location, date, order)
      .then((data) => {
        if (data === 400) {
          return res.status(400).send({ error: "incorrect query" });
        }
        return res.send({ exams: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
