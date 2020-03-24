import DataLoader from 'dataloader';

import { Sequelize } from 'sequelize-typescript';
import { DataLoaders } from "../../interfaces/DataLoadersInterface";
import { RequestedFields } from '../ast/RequestedFields';

export class DataLoaderFactory {

  constructor(
    private db: Sequelize,
    private requestedFields: RequestedFields
  ) {

  }

  getLoaders(): DataLoaders {
    return {
    }
  }

}