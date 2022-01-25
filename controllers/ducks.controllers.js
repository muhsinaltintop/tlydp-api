const {
  selectDucks,
  selectFoundDucks,
  selectUnfoundDucks,
} = require("../models/ducks.models");

exports.getDucks = async (req, res, next) => {
  const ducks = await selectDucks();

  //finder query
  //maker query
  //found
  //unfound

  res.status(200).send({ ducks });
};

exports.getFoundDucks = async (req, res, next) => {
  const { finder_id } = req.query;

  const ducks = await selectFoundDucks(finder_id);

  res.status(200).send({ ducks });
};

exports.getUnfoundDucks = async (req, res, next) => {
  const ducks = await selectUnfoundDucks();

  res.status(200).send({ ducks });
};
