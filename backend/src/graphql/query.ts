import { leaderboardQueries } from './resources/leaderboard/leaderboard.schema';

const Query = `
  type Query {
    ${leaderboardQueries}
  }
`;

export {
  Query
}