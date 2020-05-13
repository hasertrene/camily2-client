import React, { useState } from "react";
import moment from "moment";
import MonthView from "../../components/MonthView";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  Grid,
  Tooltip,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
  },
  grid: {
    overflow: "hidden",
  },
  monthBox: {
    position: " -webkit-sticky",
    position: "sticky",
    margin: "0 0 25px 0",
  },
  monthNavAdd: {
    margin: "0 -50vw 0 0",
    filter: "blur(3px)",
    cursor: "pointer",
  },
  monthNavSub: {
    margin: "0 0 0 -50vw",
    filter: "blur(3px)",
    cursor: "pointer",
  },
}));

export default function Calendar() {
  const classes = useStyles();
  // Setting first day of the week to Monday
  const now = moment().locale("en").clone();
  const [month, setMonth] = useState(now.get("month"));
  const date = moment().month(month);
  const year = moment().month(month).year();

  function clickMonth(arg) {
    if (arg === "add") {
      setMonth(month + 1);
    } else if (arg === "sub") {
      setMonth(month - 1);
    }
  }

  const nextMonth = month + 1;
  const prevMonth = month - 1;

  console.log();

  return (
    <Grid
      className={classes.grid}
      container
      direction='row'
      justify='center'
      justifyContent='space-between'
      alignItems='flex-start'>
      <Box className={classes.monthNavSub} onClick={() => clickMonth("sub")}>
        <MonthView now={now} year={year} month={prevMonth} />
      </Box>
      <Paper
        elevation={3}
        className={classes.monthBox}
        onClick={(e) => console.log(e.target)}>
        <MonthView now={now} year={year} month={month} active />
      </Paper>
      <Box className={classes.monthNavAdd} onClick={() => clickMonth("add")}>
        <MonthView now={now} year={year} month={nextMonth} />
      </Box>
    </Grid>
  );
}
