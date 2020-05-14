import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Calendar from "../components/Calendar";
import Events from "../components/Events";

// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Home({ desktop }) {
  const classes = useStyles();

  // const GET_ALL_EVENTS = gql`
  //   query {
  //     getAllEvents {
  //       title
  //       descriptiongit
  //     }
  //   }
  // `;

  // const { loading, error, data } = useQuery(GET_ALL_EVENTS);
  // console.log(data);

  return (
    <Container>
      <Calendar desktop={desktop} />
      <Events />
    </Container>
  );
}

export default Home;
