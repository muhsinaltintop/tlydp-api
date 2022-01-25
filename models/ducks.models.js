const db = require("../db/connection");

exports.selectDucks = async () => {
  const { rows } = await db.query(`
  SELECT * FROM ducks;`);

  return rows;
};

exports.selectFoundDucks = async () => {
  const { rows } = await db.query(`
  SELECT * FROM ducks
  WHERE finder_id IS NOT NULL;`);

  return rows;
};

exports.selectUnfoundDucks = async () => {
  const {rows} = await db.query(`
  SELECT ducks.duck_name, ducks.finder_id, ducks.location_placed_lat, ducks.location_placed_lng, ducks.clue, users.user_name
  FROM ducks
  JOIN users ON ducks.maker_id = users.user_id
  WHERE finder_id IS NULL;`)

  return rows;
};
