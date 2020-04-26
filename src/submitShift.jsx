import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckBox from './CheckBox';
import FormTimeDialog from './FormTimeDialog';
import TimeFormDialog from './TimeFormDialog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ShiftPickDateCalendar from './ShiftPickDateCalendar';


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
  root_: {
    flexGrow: 1,
  },
  paper_: {
    height: 100,
    width: 250,
    overflow: 'scroll',
  },
  chipGroup: {
    overflow: 'scroll'
  },
  paper_calendar: {
    height: 750,
    width: 800,
    display: 'inline-block',
    marginTop: '10px',
  },
}));

export default function submitShift() {
  const classes = useStyles();

  const handleDelete = (index) => () => {
    console.info('You clicked the delete icon.');
    console.log(index);
    const temp = [...personNames];
    temp.splice(index, 1);
    setPersonNames(temp);
  };

  const [value, setValue] = React.useState("0");

  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-04-01T21:11:54'));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //シフト希望開始時間用State
  const [shiftStartTimes, setShiftStartTimes] = React.useState({
    1: new Date(),
    2: new Date(),
    3: new Date(),
    4: new Date(),
    5: new Date(),
    6: new Date(),
    7: new Date(),
    8: new Date(),
    9: new Date(),
    10: new Date(),
    11: new Date(),
    12: new Date(),
    13: new Date(),
    14: new Date(),
    15: new Date(),
    16: new Date(),
    17: new Date(),
    18: new Date(),
    19: new Date(),
    20: new Date(),
    21: new Date(),
    22: new Date(),
    23: new Date(),
    24: new Date(),
    25: new Date(),
    26: new Date(),
    27: new Date(),
    28: new Date(),
    29: new Date(),
    30: new Date(),
    31: new Date(),
  });

  //シフト希望終了時間用State
  const [shiftEndTimes, setShiftEndTimes] = React.useState({
    1: new Date(),
    2: new Date(),
    3: new Date(),
    4: new Date(),
    5: new Date(),
    6: new Date(),
    7: new Date(),
    8: new Date(),
    9: new Date(),
    10: new Date(),
    11: new Date(),
    12: new Date(),
    13: new Date(),
    14: new Date(),
    15: new Date(),
    16: new Date(),
    17: new Date(),
    18: new Date(),
    19: new Date(),
    20: new Date(),
    21: new Date(),
    22: new Date(),
    23: new Date(),
    24: new Date(),
    25: new Date(),
    26: new Date(),
    27: new Date(),
    28: new Date(),
    29: new Date(),
    30: new Date(),
    31: new Date(),
  });


  //const [personNames, setPersonNames] = useState(['キャッシャー', 'ベーカリー', 'ウォッシャー']);
  const [baseTime, setBaseTime] = React.useState({ 'start': new Date('2020-04-26T10:00:00'), 'end': new Date('2020-04-26T18:00:00') });

  const [edit, setEdit] = useState(false);
  let editSkill = edit ? <CheckBox /> :
    <Grid item xs={12} md={6}>
      <div>
        <List>
          {["キャッシャー", "ベーカリー", "ウォッシャー"].map((name, index) =>
            <ListItem key={index}>
              <ListItemText
                primary={name}
              />
            </ListItem>
          )}
        </List>
      </div>
    </Grid>;

  let editButton = edit ?
    <Button variant="outlined" onClick={() => setEdit(!edit)}>編集終了</Button> :
    <Button variant="outlined" onClick={() => setEdit(!edit)}>編集</Button>;

  let baseTimeLabel = `${baseTime['start'].getHours() < 10 ? "0" + baseTime['start'].getHours() : baseTime['start'].getHours()}:${baseTime['start'].getMinutes() < 10 ? "0" + baseTime['start'].getMinutes() : baseTime['start'].getMinutes()}~${baseTime['end'].getHours() < 10 ? "0" + baseTime['end'].getHours() : baseTime['end'].getHours()}:${baseTime['end'].getMinutes() < 10 ? "0" + baseTime['end'].getMinutes() : baseTime['end'].getMinutes()}`


  return (
    <div>
      <div className={classes.box}>
        <h1 className={classes.h1}>シフト提出</h1>
      </div>

      <Grid container className={classes.root_} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={0} item>
              <FormTimeDialog time={baseTime} onSubmit={setBaseTime} />
              <Paper className={classes.paper_}>
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

      <div>
        <Paper className={classes.paper_calendar}>
          <ShiftPickDateCalendar
            shiftStartTimes={shiftStartTimes} setShiftStartTimes={setShiftStartTimes}
            shiftEndTimes={shiftEndTimes} setShiftEndTimes={setShiftEndTimes}
          />
        </Paper>
      </div>
    </div>
  );

}
