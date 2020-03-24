const leaderboardTypes = `
  # Leaderboard definition type -> # documentação !!

  type Leaderboard {
    # chave primária do registro
    id: ID!
    nome: String!
    tempoTotal: Float!
    createdAt: String!
  }

  input LeaderboardCreateInput {
    nome: String!
    tempoTotal: Float!
  }

`;

const leaderboardQueries = `
  leaderboards: [ Leaderboard! ]!
`;

const leaderboardMutations = `
  createLeaderboard(input: LeaderboardCreateInput!): Leaderboard!
`;

export {
  leaderboardTypes,
  leaderboardQueries,
  leaderboardMutations,
}