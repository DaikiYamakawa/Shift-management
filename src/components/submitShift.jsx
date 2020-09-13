import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CheckBox from "./CheckBox";
import FormTimeDialog from "./FormTimeDialog";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ShiftPickDateCalendar from "./ShiftPickDateCalendar";
import TitleButton from "./TitleButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
  },
  chip: {
    margin: "10px 50px 10px 50px",
  },
  card: {
    width: 375,
    display: "inline-block",
  },
  paper: {
    height: 200,
    width: 450,
  },
  chipGroup: {
    overflow: "scroll",
  },
  paper_calendar: {
    height: 750,
    width: 800,
    display: "inline-block",
    marginTop: "10px",
  },
  root: {},
}));

export default function submitShift() {
  const classes = useStyles();

  //ラジオボタンstate
  const [value, setValue] = React.useState("0");

  //base時間
  const [baseTime, setBaseTime] = React.useState({
    start: new Date("2020-04-26T10:00:00"),
    end: new Date("2020-04-26T18:00:00"),
  });

  // 休み
  const holiday = [
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
  ];

  //シフト希望開始時間用State
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

  //シフト希望終了時間用State
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

  let baseTimeLabel = `${
    baseTime["start"].getHours() < 10 ? "0" + baseTime["start"].getHours() : baseTime["start"].getHours()
  }:${baseTime["start"].getMinutes() < 10 ? "0" + baseTime["start"].getMinutes() : baseTime["start"].getMinutes()}~${
    baseTime["end"].getHours() < 10 ? "0" + baseTime["end"].getHours() : baseTime["end"].getHours()
  }:${baseTime["end"].getMinutes() < 10 ? "0" + baseTime["end"].getMinutes() : baseTime["end"].getMinutes()}`;

  // base時間変更
  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value == 0) {
      setShiftStartTimes(holiday);
      setShiftEndTimes(holiday);
    } else {
      let i = 0;
      let startTemp = [];
      let endTemp = [];
      while (i < 31) {
        startTemp.push(baseTime["start"]);
        endTemp.push(baseTime["end"]);
        i++;
      }
      setShiftStartTimes(startTemp);
      setShiftEndTimes(endTemp);
    }
  };

  return (
    <div className={classes.root}>
      <TitleButton name="シフト提出" button="提出" />

      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                シフトのベース
              </Typography>
              <Typography>
                <br />
              </Typography>
              <RadioGroup value={value} onChange={handleChange}>
                <FormControlLabel value="0" control={<Radio />} label="休み" />
                <FormControlLabel value="1" control={<Radio />} label={baseTimeLabel} />
              </RadioGroup>
            </CardContent>
            <CardActions>
              <FormTimeDialog time={baseTime} onSubmit={setBaseTime} />
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Paper className={classes.paper_calendar}>
            <ShiftPickDateCalendar
              shiftStartTimes={shiftStartTimes}
              setShiftStartTimes={setShiftStartTimes}
              shiftEndTimes={shiftEndTimes}
              setShiftEndTimes={setShiftEndTimes}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
