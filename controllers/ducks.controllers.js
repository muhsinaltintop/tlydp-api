const { selectDucks } = require("../models/ducks.models");

exports.getDucks = async (req, res, next) => {
  const ducks = await selectDucks();

  res.status(200).send({ ducks });
};
