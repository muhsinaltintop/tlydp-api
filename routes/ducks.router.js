const express = require("express");
const { getDucks, getFoundDucks, getUnfoundDucks } = require("../controllers/ducks.controllers");

const ducksRouter = express.Router();

ducksRouter.route("/").get(getDucks);

ducksRouter.route("/found").get(getFoundDucks);

ducksRouter.route("/unfound").get(getUnfoundDucks);


module.exports = ducksRouter;
