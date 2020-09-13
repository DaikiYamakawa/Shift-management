import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PickDateCalendar from "./PickDateCalendar";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import TitleButton from "./TitleButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
  },
  box: {
    display: "inline",
    padding: "0.5em 1em",
    margin: "2em 0",
    fontWeight: "bold",
    textAlign: "center",
  },
  h1: {
    fontFamily: "Courier",
  },
  chip: {
    margin: "10px 50px 10px 50px",
  },
  parent: {
    textAlign: "center",
  },
  root_: {
    flexGrow: 1,
  },
  paper_: {
    height: 450,
    width: 650,
  },
  chipGroup: {
    overflow: "scroll",
  },
  paper_calendar: {
    height: 340,
    width: 300,
    display: "inline-block",
    marginTop: "10px",
  },
  paper_time: {
    width: 650,
  },
  inner: {
    marginTop: "10px",
  },
  calendarDiv: {
    textAlign: "center",
  },
}));

export default function registerTime() {
  const classes = useStyles();

  //繁忙期用state
  const [selectedDay, setSelectedDay] = React.useState([]);
  //時間用State
  const [selectedDate, setSelectedDate] = React.useState([
    new Date("2014-08-18T21:11:54"),
    new Date("2014-08-18T21:11:54"),
    new Date("2014-08-18T21:11:54"),
    new Date("2014-08-18T21:11:54"),
    new Date("2014-08-18T21:11:54"),
    new Date("2014-08-18T21:11:54"),
  ]);

  const firstHandleStartDateChange = (date) => {
    let temp = selectedDate;
    temp.splice(0, 1, date);
    setSelectedDate([...temp]);
  };
  const firstHandleEndDateChange = (date) => {
    let temp = selectedDate;
    temp.splice(1, 1, date);
    setSelectedDate([...temp]);
  };
  const SecondHandleStartDateChange = (date) => {
    let temp = selectedDate;
    temp.splice(2, 1, date);
    setSelectedDate([...temp]);
  };
  const SecondHandleEndDateChange = (date) => {
    let temp = selectedDate;
    temp.splice(3, 1, date);
    setSelectedDate([...temp]);
  };
  const ThirdHandleStartDateChange = (date) => {
    let temp = selectedDate;
    temp.splice(4, 1, date);
    setSelectedDate([...temp]);
  };
  const ThirdHandleEndDateChange = (date) => {
    let temp = selectedDate;
    temp.splice(5, 1, date);
    setSelectedDate([...temp]);
  };

  return (
    <div>
      <TitleButton name="時間登録" button="登録" />

      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid key={0} item>
          <Card variant="outlined">
            <CardContent>
              <Grid item>
                <Typography variant="h5" color="textPrimary">
                  繁忙期の登録　
                </Typography>
                <Typography color="textSecondary">
                  繁忙期の日付をクリックして下さい。
                  <br />
                  基本的にはシフト作成前にその月の繁忙期の入力を行なっておいて下さい。
                </Typography>
              </Grid>
              <Typography>
                <br />
              </Typography>
              <Grid item>
                <div className={classes.calendarDiv}>
                  <Paper className={classes.paper_calendar}>
                    <PickDateCalendar selectedDates={selectedDay} setSelectedDates={setSelectedDay} />
                  </Paper>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid key={1} item>
          <Card variant="outlined">
            <CardContent>
              <Grid item>
                <Typography variant="h5" className={classes.pos} color="textPrimary">
                  忙しい時間帯の登録　
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  一日の中で忙しい時間帯を登録して下さい。
                </Typography>
              </Grid>
              <Typography>
                <br />
              </Typography>
              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      margin="normal"
                      key={0}
                      label="Time picker"
                      value={selectedDate[0]}
                      onChange={firstHandleStartDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      key={1}
                      label="Time picker"
                      value={selectedDate[1]}
                      onChange={firstHandleEndDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      margin="normal"
                      key={2}
                      label="Time picker"
                      value={selectedDate[2]}
                      onChange={SecondHandleStartDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      key={3}
                      label="Time picker"
                      value={selectedDate[3]}
                      onChange={SecondHandleEndDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      margin="normal"
                      key={4}
                      label="Time picker"
                      value={selectedDate[4]}
                      onChange={ThirdHandleStartDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      key={5}
                      label="Time picker"
                      value={selectedDate[5]}
                      onChange={ThirdHandleEndDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
