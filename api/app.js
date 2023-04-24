const express = require("express");
const { getExams } = require("./controllers/exams");
const { getCandidates } = require("./controllers/candidates");

const app = express();
app.use(express.json());

app.get("/api/exams", getExams);
app.get("/api/candidates", getCandidates);

module.exports = app;
