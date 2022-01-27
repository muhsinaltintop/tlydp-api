const db = require("../db/connection");

exports.insertNewUser = async ({
  user_name,
  first_name,
  last_name,
  password,
  email,
  profile_pic,
}) => {
  const { rows } = await db.query(
    `INSERT INTO users
        (user_name, first_name, last_name, password, email, profile_pic)
    VALUES
        ($1, $2, $3, $4, $5, $6)
    RETURNING *;`,
    [user_name, first_name, last_name, password, email, profile_pic]
  );

  return rows[0];
};

exports.selectUser = async (user_name, password) => {
  const { rows } = await db.query(
    `SELECT * FROM users
    WHERE user_name = $1;`,
    [user_name]
  );

  const user = rows[0];

  return !password || password === user.password
    ? user
    : Promise.reject({ status: 400, msg: "Incorrect password" });
};
