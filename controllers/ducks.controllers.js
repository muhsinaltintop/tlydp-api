const {
  selectDucks,
  selectFoundDucks,
  selectUnfoundDucks,
  selectDuckById,
  updateDuckById,
} = require("../models/ducks.models");

exports.getDucks = async (req, res, next) => {
  const { maker_id } = req.query;

  const ducks = await selectDucks(maker_id);

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

exports.getDuckById = async (req, res, next) => {
  const { duck_id } = req.params;

  const duck = await selectDuckById(duck_id);

  res.status(200).send({ duck });
};

exports.patchDuckById = async (req, res, next) => {
  const { duck_id } = req.params;
  
  const body = req.body;

  const duck = await updateDuckById(duck_id, body);

  res.status(200).send({ duck });
};
