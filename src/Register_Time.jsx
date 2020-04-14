import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PickDateCalendar from './PickDateCalendar';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 14,
  },
  box: {
    display: 'inline',
    padding: '0.5em 1em',
    margin: '2em 0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h1: {
    fontFamily: 'Courier',
  },
  chip: {
    margin: '10px 50px 10px 50px',
  },
  parent: {
    textAlign: 'center'
  },
  root_: {
    flexGrow: 1,
  },
  paper_: {
    height: 450,
    width: 650,
  },
  chipGroup: {
    overflow: 'scroll'
  },
  paper_calendar: {
    height: 340,
    width: 300,
    display: 'inline-block',
    marginTop: '10px',
  },
  paper_time: {
    width: 650,
  },
  inner: {
    margin: '30px 30px 30px 30px',
  },
  calendarDiv: {
    textAlign: 'center',
  }
}));

export default function Register_skill() {
  const classes = useStyles();

  const handleDelete = (index) => () => {
    console.info('You clicked the delete icon.');
    console.log(index);
    const temp = [...personNames];
    temp.splice(index, 1);
    setPersonNames(temp);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [personNames, setPersonNames] = useState(['キャッシャー', 'ベーカリー', 'ウォッシャー']);

  const [editDate, setEditDate] = useState(false);
  let editDateButton = editDate ?
    <Button variant="outlined" onClick={() => setEditDate(!editDate)}>編集終了</Button> :
    <Button variant="outlined" onClick={() => setEditDate(!editDate)}>編集</Button>;

  const [editTime, setEditTime] = useState(false);
  let editTimeButton = editTime ?
    <Button variant="outlined" onClick={() => setEditTime(!editTime)}>編集終了</Button> :
    <Button variant="outlined" onClick={() => setEditTime(!editTime)}>編集</Button>;

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div>
      <div className={classes.box}>
        <h1 className={classes.h1}>時間登録</h1>
      </div>

      <Grid container className={classes.root_} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={0} item>
              <Paper className={classes.paper_}>
                <div className={classes.inner}>
                  <Typography className={classes.pos} color="textPrimary">
                    繁忙期の登録　{editDateButton}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    繁忙期の日付をクリックして下さい。<br />基本的にはシフト作成前にその月の繁忙期の入力を行なっておいて下さい。
                  </Typography>
                  <div className={classes.calendarDiv}>
                    <Paper className={classes.paper_calendar}>
                      <PickDateCalendar />
                    </Paper>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid key={1} item>
              <Paper className={classes.paper_time}>
                <div className={classes.inner}>
                  <Typography className={classes.pos} color="textPrimary">
                    忙しい時間帯の登録　{editTimeButton}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    一日の中で忙しい時間帯を登録して下さい。
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
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