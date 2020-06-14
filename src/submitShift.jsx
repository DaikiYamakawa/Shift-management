import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import ShiftPickDateCalendar from "./ShiftPickDateCalendar";
import FormTimeDialog from "./FormTimeDialog";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
  },
  title: {
    fontSize: 14,
  },
  box: {
    display: "inline",
    padding: "0.5em 1em",
    margin: "2em 0",
    fontWeight: "bold",
    // textAlign: "center",
  },
  h1: {
    fontFamily: "Courier",
  },
  chip: {
    margin: "10px 50px 10px 50px",
  },
  grid: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 250,
    overflow: "scroll",
  },
  chipGroup: {
    overflow: "scroll",
  },
  papercalendar: {
    height: 750,
    width: 800,
    display: "inline-block",
    marginTop: "10px",
    textAlign: "center",
  },
  submitButton: {
    
    
  },
  calendarArea: {
    marginTop: "50px",
  },
}));

export default function submitShift() {
  const classes = useStyles();
  const DAYS = 31;

  // シフト希望開始時間用State
  const [shiftStartTimes, setShiftStartTimes] = React.useState([
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
  ]);

  // シフト希望終了時間用State
  const [shiftEndTimes, setShiftEndTimes] = React.useState([
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
    new Date("2020-04-01T10:00:54"),
  ]);

  const [baseTime, setBaseTime] = React.useState({
    start: new Date("2020-04-26T10:00:00"),
    end: new Date("2020-04-26T18:00:00"),
  });

  const baseTimeLabel = `${
    baseTime.start.getHours() < 10 ? `0${baseTime.start.getHours()}` : baseTime.start.getHours()
  }:${baseTime.start.getMinutes() < 10 ? `0${baseTime.start.getMinutes()}` : baseTime.start.getMinutes()}~${
    baseTime.end.getHours() < 10 ? `0${baseTime.end.getHours()}` : baseTime.end.getHours()
  }:${baseTime.end.getMinutes() < 10 ? `0${baseTime.end.getMinutes()}` : baseTime.end.getMinutes()}`;

  // ラジオボタン用State
  const [value, setValue] = React.useState("0");
  // ラジオボタンハンドラ
  const handleChange = (event) => {
    setValue(event.target.value);

    // ベース時間の変更
    if (event.target.value === "0") {
      const temp = [];
      for (let i = 0; i < DAYS; i++) {
        temp[i] = new Date("2020-04-01T10:00:54");
      }
      setShiftStartTimes([...temp]);
      setShiftEndTimes([...temp]);
    } else {
      const tempStart = [];
      const tempEnd = [];
      for (let i = 0; i < DAYS; i++) {
        tempStart[i] = baseTime.start;
      }
      for (let i = 0; i < DAYS; i++) {
        tempEnd[i] = baseTime.end;
      }
      setShiftStartTimes([...tempStart]);
      setShiftEndTimes([...tempEnd]);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <h1 className={classes.h1}>シフト提出</h1>
      </div>

      <Grid container className={classes.grid} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={0} item>
              <FormTimeDialog
                time={baseTime}
                onSubmit={setBaseTime}
                radio={value}
                setShiftStartTimes={setShiftStartTimes}
                setShiftEndTimes={setShiftEndTimes}
              />
              <Paper className={classes.paper}>
                <div className={classes.chipGroup}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">シフトのベース</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                      <FormControlLabel value="0" control={<Radio />} label="休み" />
                      <FormControlLabel value="1" control={<Radio />} label={baseTimeLabel} />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.calendarArea}>
        <div>
          <Button className={classes.submitButton} variant="contained" color="primary">
            シフト提出
          </Button>
        </div>

        <div>
          <Paper className={classes.papercalendar}>
            <ShiftPickDateCalendar
              shiftStartTimes={shiftStartTimes}
              setShiftStartTimes={setShiftStartTimes}
              shiftEndTimes={shiftEndTimes}
              setShiftEndTimes={setShiftEndTimes}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}
