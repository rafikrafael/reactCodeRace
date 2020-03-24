import Umzug, { UmzugOptions } from 'umzug';
import path from 'path';
import sqliteLocal from './SqliteLocal';

const wrapperMigration = (fn) => {
  return fn(sqliteLocal.getQueryInterface(), sqliteLocal.Sequelize);
};

const wrapperSeeders = (fn) => {
  return fn(sqliteLocal.getQueryInterface());
};

// config for using Umzug for migrations
const migratorConfig: UmzugOptions = {
  storage: 'sequelize',
  storageOptions: {
    sequelize: sqliteLocal,
    modelName: 'SequelizeMeta',
  },
  logging: console.log,
  migrations: {
    path: path.join(__dirname, 'migrations'),
    pattern: /(.ts|.js)$/i,
    wrap: wrapperMigration
  }
}

// config for using Umzug for DB seeding
const seederConfig: UmzugOptions = {
  storage: "sequelize",
  storageOptions: {
    sequelize: sqliteLocal,
    modelName: 'SequelizeData',
  },
  logging: console.log,
  migrations: {
    path: path.join(__dirname, 'seeders'),
    pattern: /(.ts|.js)$/i,
    wrap: wrapperSeeders
  }
}

export const migrator = new Umzug(migratorConfig)
export const seeder = new Umzug(seederConfig)

function retryDBConnect (resolve, reject, context, maxTries) {
  sqliteLocal.authenticate()
    .then(() => {
      console.log('Database Connected')
      resolve()
    },
    function (err) {
      if (maxTries < 0) {
        console.log('Sequelize reached max tries to connect. FAIL.')
        reject(err)
      } else {
        setTimeout(function () {
          console.log('Not connected to the DB, trying again in 2 seconds')
          retryDBConnect(resolve, reject, context, maxTries - 1)
        }, 2000)
      }
    })
};

export function tryDBConnect () {
  return new Promise(function (resolve, reject) {
    retryDBConnect(resolve, reject, null, 10)
  })
};