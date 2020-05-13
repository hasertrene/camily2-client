import React, { useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    width: "40vw",
    textAlign: "center",
  },
  rootActive: {
    padding: "3em",
    width: "80vw",
    textAlign: "center",
  },
  day: {
    padding: "22px",
    justify: "flex-start",
    alignItems: "flex-start",
  },
  dayActive: {
    padding: "35px",
    lineHeight: "2rem",
    justify: "flex-start",
    alignItems: "flex-start",
  },
}));

export default function MonthView(props) {
  const classes = useStyles();
  const month = props.month;
  const year = props.year;
  const startWeek = moment().month(month).startOf("M").week();
  const endWeek = moment().month(month).endOf("M").week();
  const startMonth = moment().month(month).startOf("M").day();
  moment.updateLocale("en", {
    week: {
      dow: 1,
      doy: 7,
    },
  });

  if (startMonth === 0) {
    moment.updateLocale("en", {
      week: {
        dow: 1,
        doy: 7,
      },
    });
  }

  if (moment().month(month).format("M") === "12") {
    moment.updateLocale("en", {
      week: {
        dow: 1,
        doy: 1,
      },
    });
  }

  const calendar = [];
  for (let week = startWeek; week <= endWeek; week++) {
    calendar.push({
      week: week,
      days: Array(7)
        .fill(0)
        // eslint-disable-next-line
        .map((n, i) =>
          moment()
            .month(month)
            .week(week)
            .startOf("week")
            .add(n + i, "day")
        ),
    });
  }

  return (
    <Box
      component='span'
      className={props.active ? classes.rootActive : classes.root}
      color={props.active ? "black" : "gray"}>
      <Typography variant='h4'>
        {moment().month(month).format("MMMM, YYYY")}
      </Typography>
      {calendar.map((week) => (
        <p>
          {week.days.map((day) => (
            <span
              className={props.active ? classes.dayActive : classes.day}
              style={
                moment().month(month).month() !== moment(day).month() &&
                props.active
                  ? { color: "gray" }
                  : moment(props.now).format("YY, MM, DD") ===
                    moment(day).format("YY, MM, DD")
                  ? { fontWeight: "bold" }
                  : {}
              }>
              {moment(day).format("DD") + " "}
            </span>
          ))}
          <hr />
        </p>
      ))}
    </Box>
  );
}
