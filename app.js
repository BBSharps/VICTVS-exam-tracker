const express = require("express");
const { getExams } = require("./api/controllers/exams");
const { getCandidates } = require("./api/controllers/candidates");
const { getInstructions } = require("./api/controllers/instructions");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", getInstructions);
app.get("/api/exams", getExams);
app.get("/api/candidates", getCandidates);

module.exports = app;
