const { insertNewUser, selectUser } = require("../models/users.models");

exports.postNewUser = async (req, res, next) => {
  const newUser = req.body;

  const user = await insertNewUser(newUser);

  res.status(201).send({ user });
};

exports.postExistingUser = async (req, res, next) => {
  const { user_name, password } = req.body;

  const user = await selectUser(user_name, password);

  res.status(200).send({ user });
};

exports.getUser = async (req, res, next) => {
  const { user_name } = req.params;

  const user = await selectUser(user_name);

  res.status(200).send({ user });
};
