import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";
import { compose } from "../../composable/composable.resolver";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { handleError } from "../../../utils/utils";


export const leaderboardResolvers = {

  Query: {

    leaderboards: ((parent, args, context: ResolverContext, info: GraphQLResolveInfo) => {
      const { db } = context;
      
      return db.models.LeaderBoardModel.findAll({
        order: [["tempoTotal", "asc"]],
        limit: 15,
      }).catch(handleError);
    }),

  },

  Mutation: {
    createLeaderboard: ((parent, { input }, context: ResolverContext, info: GraphQLResolveInfo) => {
      const { db } = context;
      return db.transaction(async (transaction: Transaction) => {
        return db.models.LeaderBoardModel.create(input, { transaction });
      })
      .catch(handleError);
    }),
    
  },

}