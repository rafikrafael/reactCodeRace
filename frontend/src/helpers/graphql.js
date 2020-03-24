import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/graphql",
  {}
);

export const newClient = new GraphQLClient(
  process.env.REACT_APP_BACKEND_URL,
  {}
);

export async function doResquestGraphql(query, variables) {
  const retorno = {
    status: false,
  };
  try {
    retorno.data = await client.request(query, variables);
    retorno.status = true;
  } catch (error) {
    retorno.errors = error;
    console.log(error);

  }
  return retorno;
}
