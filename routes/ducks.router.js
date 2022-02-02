const express = require("express");
const {
  getDucks,
  getFoundDucks,
  getUnfoundDucks,
  getDuckById,
  patchDuckById,
  postDuckByMakerId,
  patchDuckByName,
} = require("../controllers/ducks.controllers");

const ducksRouter = express.Router();

ducksRouter.route("/").get(getDucks).post(postDuckByMakerId);

ducksRouter.route("/found").get(getFoundDucks);

ducksRouter.route("/unfound").get(getUnfoundDucks).patch(patchDuckByName);

ducksRouter.route("/:duck_id").get(getDuckById).patch(patchDuckById);

module.exports = ducksRouter;
