const { selectCandidates } = require("../models/candidates");

exports.getCandidates = (req, res, next) => {
  selectCandidates()
    .then((data) => {
      return res.send({ candidates: data });
    })
    .catch((err) => {
      console.log(err);
    });
};
