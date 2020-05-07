import gql from "graphql-tag";

export const GET_ALL_EVENTS = gql`
  query AllEvents {
    events {
      id
      title
    }
  }
`;
