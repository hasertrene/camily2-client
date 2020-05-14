import React, { useState } from "react";
import moment from "moment";
import MonthView from "../MonthView";
import { Typography, Box, Grid, Paper, Drawer } from "@material-ui/core";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    display: "flex",
  },
  grid: {
    overflow: "hidden",
  },
  monthActiveMob: {
    margin: "10px 0 25px 0",
    width: "85vw",
    textAlign: "center",
  },
  monthNavMob: {
    filter: "blur(3px)",
    cursor: "pointer",
    userSelect: "none",
    width: "80vw",
    textAlign: "center",
  },
  monthActiveDesk: {
    margin: "10px 0 25px 0",
    padding: "3rem",
    width: "85vw",
    textAlign: "center",
  },
  monthNavDesk: {
    filter: "blur(3px)",
    cursor: "pointer",
    userSelect: "none",
    padding: "2em",
    width: "40vw",
    textAlign: "center",
  },
  // Drawer classes
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["height", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(["height", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    width: "100vw",
  },
  drawerOpen: {
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    height: theme.spacing(5) + 1,
    [theme.breakpoints.up("sm")]: {
      height: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    cursor: "pointer",
  },
  arrow: {
    margin: "1vw 0 0 2vw",
    transition: "transform .1s ease",
  },
}));

export default function Calendar({ desktop }) {
  const classes = useStyles();
  const now = moment().locale("en").clone();
  const [month, setMonth] = useState(now.get("month"));
  const events = [];
  const nextMonth = month + 1;
  const prevMonth = month - 1;

  function clickMonth(arg) {
    if (arg === "add") {
      setMonth(month + 1);
    } else if (arg === "sub") {
      setMonth(month - 1);
    }
  }

  // Drawer code
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div
          className={classes.toolbar}
          onClick={open ? handleDrawerClose : handleDrawerOpen}>
          <Typography
            align='center'
            variant={desktop ? "h3" : "h5"}
            style={{ fontFamily: "'Spicy Rice', cursive" }}>
            {moment().month(month).format("MMMM YYYY")}
          </Typography>
          <ArrowBackIosSharpIcon
            fontSize={desktop ? "large" : "small"}
            className={classes.arrow}
            style={
              open
                ? { transform: "rotate(270deg)" }
                : { transform: "rotate(90deg)" }
            }
          />
        </div>
        <Grid
          className={classes.grid}
          container
          direction='row'
          justify='center'
          alignItems='flex-start'>
          <Box
            className={desktop ? classes.monthNavDesk : classes.monthNavMob}
            style={
              desktop ? { margin: "0 0 0 -50vw" } : { margin: "0 0 0 -80vw" }
            }
            onClick={() => clickMonth("sub")}>
            <MonthView
              now={now}
              month={prevMonth}
              desktop={desktop}
              events={events}
            />
          </Box>
          <Paper
            elevation={3}
            className={
              desktop ? classes.monthActiveDesk : classes.monthActiveMob
            }
            onClick={(e) => console.log(e.target)}>
            <MonthView
              now={now}
              month={month}
              desktop={desktop}
              events={events}
              active
            />
          </Paper>
          <Box
            className={desktop ? classes.monthNavDesk : classes.monthNavMob}
            style={
              desktop ? { margin: "0 -50vw 0 0" } : { margin: "0 -80vw 0 0" }
            }
            onClick={() => clickMonth("add")}>
            <MonthView
              now={now}
              month={nextMonth}
              desktop={desktop}
              events={events}
            />
          </Box>
        </Grid>
      </Drawer>
    </div>
  );
}
