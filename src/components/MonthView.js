import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dayDesk: {
    padding: "10px",
    justify: "flex-start",
    alignItems: "flex-start",
  },
  dayActiveDesk: {
    padding: "2.5vw",
    lineHeight: "2.5vw",
    justify: "flex-start",
    alignItems: "flex-start",
  },
  day: {
    padding: "2.5vw",
  },
  week: {
    backgroundColor: "#00000011",
  },
}));

export default function MonthView(props) {
  const classes = useStyles();
  const { now, month, active, desktop } = props;
  const startWeek = moment().month(month).startOf("M").week();
  const endWeek = moment().month(month).endOf("M").week();

  // Setting first day of the Week and first day of the Year
  moment.updateLocale("en", {
    week: {
      dow: 1,
      doy: 7,
    },
  });

  if (moment().month(month).format("M") === "12") {
    moment.updateLocale("en", {
      week: {
        dow: 1,
        doy: 1,
      },
    });
  }

  // Caledar array assembly
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
  const weekDays = Array.apply(null, Array(7)).map(function (_, i) {
    return moment(i, "e")
      .startOf("week")
      .isoWeekday(i + 1)
      .format("dd");
  });

  return (
    <Box component='span' color={active ? "black" : "gray"}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {weekDays.map((day, i) => (
              <TableCell key={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {calendar.map((week, i) => (
            <TableRow key={i}>
              <TableCell
                className={classes.week}
                style={
                  i === i.length - 1 || i === 0
                    ? { color: "red" }
                    : { color: "green" }
                }>
                {week.week}
              </TableCell>
              {week.days.map((day, i) => (
                <TableCell
                  key={i}
                  className={
                    desktop
                      ? active
                        ? classes.dayActiveDesk
                        : classes.dayDesk
                      : classes.day
                  }
                  style={
                    moment().month(month).month() !== moment(day).month() &&
                    active
                      ? { color: "gray" }
                      : moment(now).format("YY, MM, DD") ===
                        moment(day).format("YY, MM, DD")
                      ? {
                          fontWeight: "bold",
                          backgroundColor: "#88000022",
                          borderRadius: "10px",
                        }
                      : {}
                  }>
                  {moment(day).format("DD") + " "}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
