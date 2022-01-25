const db = require("../db/connection");

exports.selectDucks = async (maker_id) => {
  const queryStr = `
  SELECT ducks.*, makers.user_name AS maker_name, finders.user_name AS finder_name
  FROM ducks
  JOIN users AS makers ON ducks.maker_id = maker.user_id
  LEFT JOIN users AS finders ON ducks.finder_id = finder.user_id
  ${maker_id ? "WHERE maker_id = $1" : ""};`;

  const queryValues = maker_id ? [maker_id] : null;

  const { rows } = await db.query(queryStr, queryValues);

  return rows;
};

exports.selectFoundDucks = async (finder_id) => {
  const queryStr = `
  SELECT ducks.*, makers.user_name AS maker_name, finders.user_name AS finder_name
  FROM ducks
  JOIN users AS makers ON ducks.maker_id = maker.user_id
  JOIN users AS finders ON ducks.finder_id = finder.user_id
  WHERE finder_id ${finder_id ? "= $1" : "IS NOT NULL"};`;

  const queryValues = finder_id ? [finder_id] : null;

  const { rows } = await db.query(queryStr, queryValues);

  return rows;
};

exports.selectUnfoundDucks = async () => {
  const { rows } = await db.query(`
  SELECT ducks.duck_name, ducks.finder_id, ducks.location_placed_lat, ducks.location_placed_lng, ducks.clue, users.user_name AS maker_name
  FROM ducks
  JOIN users ON ducks.maker_id = users.user_id
  WHERE finder_id IS NULL;`);

  return rows;
};

exports.selectDuckById = async (id) => {
  const { rows } = await db.query(
    `
  SELECT * FROM ducks
  WHERE duck_id = $1;`,
    [id]
  );

  return rows[0];
};

exports.updateDuckById = async (
  duck_id,
  { finder_id, location_found_lat, location_found_lng, image, comments }
) => {
  const { rows } = await db.query(
    `
  UPDATE ducks
  SET finder_id = $1,
      location_found_lat = $2,
      location_found_lng = $3,
      image = $4,
      comments = $5
  WHERE duck_id = $6
  RETURNING *;`,
    [
      finder_id,
      location_found_lat,
      location_found_lng,
      image,
      comments,
      duck_id,
    ]
  );

  return rows[0];
};

exports.insertDuck = async ({
  duck_name,
  maker_id,
  location_placed_lat,
  location_placed_lng,
  clue,
}) => {
  const { rows } = await db.query(
    `
  INSERT INTO ducks
  (duck_name, maker_id, location_placed_lat, location_placed_lng, clue)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`,
    [duck_name, maker_id, location_placed_lat, location_placed_lng, clue]
  );

  return rows[0];
};
