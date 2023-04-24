const { instructions } = require("../models/instructions");

exports.getInstructions = (req, res, next) => {
  instructions.then((data) => {
    return res.send({ apiPaths: data });
  });
};
