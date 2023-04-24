const express = require("express");
const { getExams } = require("./api/controllers/exams");
const { getCandidates } = require("./api/controllers/candidates");
const { getInstructions } = require("./api/controllers/instructions");

const app = express();
app.use(express.json());

app.get("/api", getInstructions);
app.get("/api/exams", getExams);
app.get("/api/candidates", getCandidates);

module.exports = app;
