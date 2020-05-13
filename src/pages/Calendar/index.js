import React, { useState } from "react";
import moment from "moment";
import MonthView from "../../components/MonthView";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
  },
  monthBox: {
    position: " -webkit-sticky",
    position: "sticky",
    // display: "inline-block",
  },
  monthNav: {
    position: "relative",
    // display: "inline-block",
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
    <Grid container direction='row' justify='center' alignItems='flex-start'>
      <Box className={classes.monthNav} onClick={() => clickMonth("sub")}>
        <MonthView year={year} month={prevMonth} />
      </Box>
      <Box className={classes.monthBox} onClick={(e) => console.log(e.target)}>
        <MonthView year={year} month={month} active />
      </Box>
      <Box className={classes.monthNav} onClick={() => clickMonth("add")}>
        <MonthView year={year} month={nextMonth} />
      </Box>
    </Grid>
  );
}
