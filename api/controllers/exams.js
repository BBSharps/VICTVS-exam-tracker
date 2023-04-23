const { selectExams } = require("../models/exams");

exports.getExams = (req, res, next) => {
  selectExams().then((data) => {
    res.send({ exams: data });
  });
};
