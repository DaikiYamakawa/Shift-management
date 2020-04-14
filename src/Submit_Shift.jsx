import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckBox from './CheckBox';
import FormDialog from './FormDialog';
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
    height: 350,
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

export default function Submit_Shift() {
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


  const [personNames, setPersonNames] = useState(['キャッシャー', 'ベーカリー', 'ウォッシャー']);

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

  return (
    <div>
      <div className={classes.box}>
        <h1 className={classes.h1}>シフト提出</h1>
      </div>

      <Grid container className={classes.root_} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={0} item>
              <FormDialog id="1" name={personNames} onSubmit={setPersonNames} />
              <Paper className={classes.paper_}>
                <div className={classes.chipGroup}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">シフトのベース</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                      <FormControlLabel value="0" control={<Radio />} label="休み" />
                      <FormControlLabel value="1" control={<Radio />} label="17:00~L" />
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
          <ShiftPickDateCalendar name={selectedDate} onSubmit={handleDateChange} />
        </Paper>
      </div>
    </div>
  );

}
