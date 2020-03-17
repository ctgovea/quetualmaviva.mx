const { Pool } = require("pg");
const { POSTGRESQL } = process.env;

const pool = new Pool(POSTGRESQL);

module.exports = {
  query: async (text, params) => {
    return await pool.query(text, params);
  }
};
