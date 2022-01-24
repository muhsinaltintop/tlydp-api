const express = require("express");
const { getDucks } = require("../controllers/ducks.controllers");

const ducksRouter = express.Router();

ducksRouter.route('/').get(getDucks);

module.exports = ducksRouter;
