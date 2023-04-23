const { selectExams } = require("../models/exams");

exports.getExams = (req, res, next) => {
  const id = req.query.id;
  const location = req.query.location;
  let query = true;
  id !== undefined && !Number(id) && Number(id) !== 0 ? (query = false) : null;
  if (!query) {
    return res.status(400).send({ error: "incorrect query" });
  } else {
    selectExams(id, location).then((data) => {
      if (data === 400) {
        return res.status(400).send({ error: "incorrect query" });
      }
      return res.send({ exams: data });
    });
  }
};
