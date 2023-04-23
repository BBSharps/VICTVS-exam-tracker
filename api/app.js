const express = require("express");
const { getExams } = require("./controllers/exams");

const app = express();

app.get("/api/exams", getExams);

module.exports = app;
