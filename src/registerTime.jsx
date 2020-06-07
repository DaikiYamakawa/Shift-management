import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PickDateCalendar from "./PickDateCalendar";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
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
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 450,
    width: 650,
  },
  chipGroup: {
    overflow: "scroll",
  },
  papercalendar: {
    height: 340,
    width: 300,
    display: "inline-block",
    marginTop: "10px",
  },
  papertime: {
    width: 650,
  },
  inner: {
    margin: "30px 30px 30px 30px",
  },
  calendarDiv: {
    textAlign: "center",
  },
}));

export default function registerTime() {
  const classes = useStyles();

  const [selectedDates, setSelectedDates] = useState([]);

  const [editDate, setEditDate] = useState(false);
  const editDateButton = editDate ? (
    <Button variant="outlined" onClick={() => setEditDate(!editDate)}>
      編集終了
    </Button>
  ) : (
    <Button variant="outlined" onClick={() => setEditDate(!editDate)}>
      編集
    </Button>
  );

  const [editTime, setEditTime] = useState(false);
  const editTimeButton = editTime ? (
    <Button variant="outlined" onClick={() => setEditTime(!editTime)}>
      編集終了
    </Button>
  ) : (
    <Button variant="outlined" onClick={() => setEditTime(!editTime)}>
      編集
    </Button>
  );

  // 時間用State
  const [selectedTime, setSelectedTime] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedTime(date);
  };

  return (
    <div>
      <div className={classes.box}>
        <h1 className={classes.h1}>時間登録</h1>
      </div>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={0} item>
              <Paper className={classes.paper}>
                <div className={classes.inner}>
                  <Typography className={classes.pos} color="textPrimary">
                    繁忙期の登録{editDateButton}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    繁忙期の日付をクリックして下さい。
                    <br />
                    基本的にはシフト作成前にその月の繁忙期の入力を行なっておいて下さい。
                  </Typography>
                  <div className={classes.calendarDiv}>
                    <Paper className={classes.papercalendar}>
                      <PickDateCalendar selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
                    </Paper>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid key={1} item>
              <Paper className={classes.papertime}>
                <div className={classes.inner}>
                  <Typography className={classes.pos} color="textPrimary">
                    忙しい時間帯の登録{editTimeButton}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    一日の中で忙しい時間帯を登録して下さい。
                  </Typography>
                  
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="start"
                        label="Time picker"
                        value={selectedTime}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="end"
                        label="Time picker"
                        value={selectedTime}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
