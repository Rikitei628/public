const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "";
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 2,
});
class SQLManager {
  static async getClient() {
    return await pool.connect();
  }
  static release(client) {
    if (client) client.release();
  }
}
module.exports = SQLManager;
