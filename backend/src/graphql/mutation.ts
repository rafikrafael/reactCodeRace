import { leaderboardMutations } from './resources/leaderboard/leaderboard.schema';

const Mutation = `
  type Mutation {
    ${leaderboardMutations}
  }
`;

export {
  Mutation
}