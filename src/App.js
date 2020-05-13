import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from "@material-ui/core";
import Calendar from "./pages/Calendar";
// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  // const GET_ALL_EVENTS = gql`
  //   query {
  //     getAllEvents {
  //       title
  //       description
  //     }
  //   }
  // `;

  // const { loading, error, data } = useQuery(GET_ALL_EVENTS);
  // console.log(data);

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <Box>
        <Calendar />
      </Box>
    </Container>
  );
}

export default App;
