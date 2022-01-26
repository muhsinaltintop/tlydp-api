const express = require("express");
const { handleCustomErrors, handleServerErrors } = require("./errors/errors");
const apiRouter = require("./routes/api.router");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
