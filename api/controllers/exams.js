const { selectExams } = require("../models/exams");

exports.getExams = (req, res, next) => {
  const id = req.query.id;
  let query = true;

  id !== undefined && !Number(id) && Number(id) !== 0 ? (query = false) : null;

  if (!query) {
    return res.status(400).send("incorrect query");
  } else {
    selectExams(id).then((data) => {
      return res.send({ exams: data });
    });
  }
};
