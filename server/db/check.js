// Quick connectivity check: `npm run db:check`
const { testConnection, query, closePool } = require('../src/config/database');

(async () => {
  try {
    await testConnection();
    const tables = await query('SHOW TABLES');
    console.log('✅ Connected to MariaDB. Tables:', tables.map((t) => Object.values(t)[0]).join(', ') || '(none)');
    const [counts] = await query(
      'SELECT (SELECT COUNT(*) FROM users) AS users, (SELECT COUNT(*) FROM strategies) AS strategies, (SELECT COUNT(*) FROM orders) AS orders'
    );
    console.log('   Row counts:', counts);
  } catch (err) {
    console.error('❌ DB check failed:', err.message);
    process.exitCode = 1;
  } finally {
    await closePool();
  }
})();
