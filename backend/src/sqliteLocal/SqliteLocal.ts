import { Sequelize } from 'sequelize-typescript';

const sqliteLocal = new Sequelize({
  username: "root",
  password: "root",
  host: "localhost",
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  models: [__dirname + '/models'],
  pool: {
    max: 1,
  },
});

export default sqliteLocal;