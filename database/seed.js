const { seed_candidates } = require("./seed_candidates");
const { seed_locations } = require("./seed_locations");
const { seed_exams } = require("./seed_exams");

exports.seed = async () => {
  await seed_exams();
  await seed_candidates();
  await seed_locations();
};
