const express = require("express");
const ducksRouter = require("./ducks-router");
const usersRouter = require("./users-router");

const apiRouter = express.Router();

apiRouter.use("/ducks", ducksRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
