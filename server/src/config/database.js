// MariaDB connection pool configuration
require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'algopulse_db',
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 5,
  // Return DECIMAL / BIGINT as JS numbers instead of strings / BigInt
  decimalAsNumber: true,
  bigIntAsNumber: true,
  insertIdAsNumber: true,
  dateStrings: false,
});

/**
 * Run a parameterised query using a pooled connection.
 * @param {string} sql - SQL with `?` placeholders
 * @param {Array} [params] - placeholder values
 */
async function query(sql, params = []) {
  return pool.query(sql, params);
}

/**
 * Run several statements in one transaction.
 * @param {(conn: import('mariadb').PoolConnection) => Promise<any>} work
 */
async function withTransaction(work) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await work(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/** Verify connectivity; resolves to true or throws. */
async function testConnection() {
  const rows = await query('SELECT 1 AS ok');
  return rows[0].ok === 1;
}

async function closePool() {
  await pool.end();
}

module.exports = { pool, query, withTransaction, testConnection, closePool };
