const { join } = require('path');

module.exports = {
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, 'dist', '**', 'entities', '*.entity.js')],
  migrations: [join(__dirname, 'dist', '**', 'migrations', '*.migration.js')],
  migrationsRun: true,
  synchronize: true,
  type: 'sqlite'
};
