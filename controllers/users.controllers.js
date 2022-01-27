const { insertNewUser, selectUser } = require("../models/users.models");
const { checkExists, checkUniqueUser, typeChecker } = require("../utils");

exports.postNewUser = async (req, res, next) => {
  try {
    const { user_name, email } = req.body;

    const stringTypes = Object.values(req.body);
    const stringFields = Object.keys(req.body);

    if (stringTypes.some((item) => !isNaN(item))) {
      await typeChecker(stringTypes, stringFields, "string");
    }

    const checkUsername = checkUniqueUser("user_name", user_name);
    const checkEmail = checkUniqueUser("email", email);
    await Promise.all([checkUsername, checkEmail]);

    const user = await insertNewUser(req.body);

    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.postExistingUser = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;

    if (!isNaN(user_name) || !isNaN(password)) {
      let field = !isNaN(user_name)
        ? "user_name"
        : !isNaN(password)
        ? "password"
        : null;

      await Promise.reject({ status: 400, msg: `${field} must be a string` });
    }

    await checkExists("users", "user_name", user_name);

    const user = await selectUser(user_name, password);

    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const { user_name } = req.params;

  const user = await selectUser(user_name);

  res.status(200).send({ user });
};
