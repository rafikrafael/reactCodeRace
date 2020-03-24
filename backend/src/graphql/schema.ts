import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';

import { leaderboardTypes } from './resources/leaderboard/leaderboard.schema';
import { leaderboardResolvers } from './resources/leaderboard/leaderboard.resolvers';


const resolvers = merge(
  leaderboardResolvers,
)

const schemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    schemaDefinition,
    Query,
    Mutation,
    leaderboardTypes,
  ],
  resolvers
});