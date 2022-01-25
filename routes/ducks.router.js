const express = require("express");
const { getDucks, getFoundDucks, getUnfoundDucks, getDuckById, patchDuckById } = require("../controllers/ducks.controllers");

const ducksRouter = express.Router();

ducksRouter.route("/").get(getDucks);

ducksRouter.route("/found").get(getFoundDucks);

ducksRouter.route("/unfound").get(getUnfoundDucks);

ducksRouter.route("/:duck_id").get(getDuckById).patch(patchDuckById);


module.exports = ducksRouter;
