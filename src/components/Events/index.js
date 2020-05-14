import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function index() {
  return (
    <div>
      <Grid container direction='row' justify='center' alignItems='flex-start'>
        <Box></Box>
        <Paper elevation={3}>Dicks</Paper>
        <Box></Box>
      </Grid>
    </div>
  );
}
