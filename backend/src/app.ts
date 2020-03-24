import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import compression from 'compression';
import bodyparser from 'body-parser';
import path from 'path';
import fs from 'fs';

import { tryDBConnect, 
  migrator, 
  seeder 
} from './sqliteLocal/DBUpdater';
import schema from './graphql/schema';
import db from './sqliteLocal/SqliteLocal';
import FormatError from 'easygraphql-format-error';
import { DataLoaderFactory } from './graphql/dataloaders/DataLoaderFactory';
import { RequestedFields } from './graphql/ast/RequestedFields';

const formatError = new FormatError([
  {  
    name: 'USUARIO_SENHA_INVALIDOS',  
    message: 'Usuario ou senha inválidos.',
    statusCode: 400
  },
  {  
    name: 'FILIAL_INVALIDA',  
    message: 'Filial informada não encontrada.',
    statusCode: 400
  }
]);

const errorName = formatError.errorName

function validaPastaDB() {
  const dbPath = './db';
  if (!fs.existsSync(dbPath)){
    fs.mkdirSync(dbPath);
  }
}

class App {

  public express: express.Application;
  private dataLoaderFactory: DataLoaderFactory;
  private requestedFields: RequestedFields;

  constructor() {
    this.express = express();
    this.sincronizaDB()
      .then(() => this.init());
  }

  private async sincronizaDB() {
    validaPastaDB();
    await tryDBConnect()
    await migrator.up();
    if (fs.existsSync('./sqliteLocal/seeders')) await seeder.up();
  }

  private init(): void {
    this.requestedFields = new RequestedFields();
    this.dataLoaderFactory = new DataLoaderFactory(db, this.requestedFields);
    this.middleware();
  }

  private middleware(): void {
    this.express.disable('x-powered-by');
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(bodyparser.urlencoded({
      extended: true,
      limit: '50mb',
    }));
    this.express.use(bodyparser.json({
        limit: '50mb',
    }));
   

    this.express.use('/graphql',
    
      (req, res ,next) => {
        req['context'] = {}
        req['context']['db'] = db;
        req['context']['dataloaders'] = this.dataLoaderFactory.getLoaders();
        req['context']['requestedFields'] = this.requestedFields;
        req['context']['errorName'] = errorName;
        next();
      },

      graphqlHTTP((req, res) => ({
        schema: schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: req['context'],
        formatError: (err) => {      
          const error = formatError.getError(err);
          if (error && error.statusCode) res.status(error.statusCode);
          return error;
        } 
      }))
    );
  }
}

export default new App().express;