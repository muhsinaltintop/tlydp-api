const format = require("pg-format");
const db = require("./db/connection");

exports.checkExists = async (table, column, value) => {
  const item = table.slice(0, -1);

  const queryStr = format(
    `SELECT * FROM %I
    WHERE %I = $1;`,
    table,
    column
  );
  const { rows } = await db.query(queryStr, [value]);

  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `${item} does not exist`,
    });
  }
};

exports.typeChecker = (typesArr, fieldsArr, type) => {
  const invalid = typesArr.findIndex((item) => typeof item !== type);
  const invalidFieldName = fieldsArr[invalid];

  return Promise.reject({
    status: 400,
    msg: `${invalidFieldName} must be a ${type}`,
  });
};

exports.checkUniqueUser = async (column, value) => {
  const queryStr = format(
    `SELECT * FROM users
    WHERE %I = $1;`,
    column
  );
  const { rows } = await db.query(queryStr, [value]);

  if (rows[0]) {
    return Promise.reject({
      status: 400,
      msg: `An account with that ${column} already exists`,
    });
  }
};

exports.checkCoordinates = (latitude, longitude) => {
  if ((latitude && !longitude) || (longitude && !latitude)) {
    return Promise.reject({
      status: 400,
      msg: "Both latitude and longitude coordinates required",
    });
  }
  if (isNaN(latitude) || isNaN(longitude)) {
    return Promise.reject({
      status: 400,
      msg: "Coordinates must be numbers",
    });
  }
};
