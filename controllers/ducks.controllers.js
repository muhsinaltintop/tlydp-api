const { selectDucks, selectFoundDucks } = require("../models/ducks.models");

exports.getDucks = async (req, res, next) => {
  const ducks = await selectDucks();

  res.status(200).send({ ducks });
};

exports.getFoundDucks = async (req, res, next) => {
  const ducks = await selectFoundDucks();

  res.status(200).send({ ducks });
};
