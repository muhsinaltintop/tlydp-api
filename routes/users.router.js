const express = require("express");
const { postNewUser, getUser, postExistingUser } = require("../controllers/users.controllers");

const usersRouter = express.Router();

usersRouter.route("/register").post(postNewUser);

usersRouter.route("/login").post(postExistingUser);

usersRouter.route("/:user_name").get(getUser);

module.exports = usersRouter;
