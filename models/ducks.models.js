const db = require("../db/connection");

exports.selectDucks = async () => {
  const { rows } = await db.query(`
    SELECT * FROM ducks`);

  return rows;
};
