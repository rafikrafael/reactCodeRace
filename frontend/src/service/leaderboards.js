import { doResquestGraphql } from "../helpers/graphql";

export async function getUltimos15Leaderboards() {
  const query = `
    query getLeaderboards {
      leaderboards {
        id
        nome
        tempoTotal
        createdAt
      }
    }
  `;

  const retorno = await doResquestGraphql(query);
  if (retorno && retorno.status && retorno.data && retorno.data.leaderboards)
    return retorno.data.leaderboards;
  return;
}

export async function saveToLeaderboard(input) {
  const query = `
        mutation doCreateLeaderboard($input: LeaderboardCreateInput!) {
          createLeaderboard(input: $input) {
            id
          }
        }
      `;

  const variables = {
    input,
  };

  return await doResquestGraphql(query, variables);
}
