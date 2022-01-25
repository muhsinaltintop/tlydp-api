const db = require("../db/connection");

exports.selectDucks = async () => {
  const { rows } = await db.query(`
  SELECT * FROM ducks`);

  return rows;
};

exports.selectFoundDucks = async () => {
  const { rows } = await db.query(`
  SELECT * FROM ducks
  WHERE finder_id IS NOT NULL`);
  
  return rows;
};
