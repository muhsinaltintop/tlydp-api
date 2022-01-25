const express = require("express");
const { getDucks, getFoundDucks } = require("../controllers/ducks.controllers");

const ducksRouter = express.Router();

ducksRouter.route("/").get(getDucks);

ducksRouter.route("/found").get(getFoundDucks);

module.exports = ducksRouter;
