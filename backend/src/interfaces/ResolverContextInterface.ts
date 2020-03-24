import { Sequelize } from 'sequelize-typescript';
import { DataLoaders } from "./DataLoadersInterface";
import { RequestedFields } from "../graphql/ast/RequestedFields";

export interface ResolverContext {

  db?: Sequelize;
  dataloaders?: DataLoaders;
  requestedFields?: RequestedFields;
  
}