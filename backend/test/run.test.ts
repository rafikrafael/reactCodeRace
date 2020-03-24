import fs from 'fs';
import { tryDBConnect, 
  migrator, 
  seeder 
} from '../src/sqliteLocal/DBUpdater';
import enviroments from '../src/config/enviroments';

function validaPastaDB() {
  const dbPath = './db_test';
  if (!fs.existsSync(dbPath)){
    fs.mkdirSync(dbPath);
  }
  if (fs.existsSync(enviroments.databaseName)) fs.unlinkSync(enviroments.databaseName);
}

validaPastaDB();

tryDBConnect().then(async () => {
  await migrator.up();
  run();
});