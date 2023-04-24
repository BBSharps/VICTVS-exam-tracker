const express = require("express");
const { getExams } = require("./controllers/exams");
const { getCandidates } = require("./controllers/candidates");
const { getInstructions } = require("./controllers/instructions");

const app = express();
app.use(express.json());

app.get("/api", getInstructions);
app.get("/api/exams", getExams);
app.get("/api/candidates", getCandidates);

module.exports = app;
