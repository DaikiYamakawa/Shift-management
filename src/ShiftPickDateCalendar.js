import React, { useState } from 'react'
import { isSameDay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  validation: {
    color: 'red',
  },

}));

// Very rough implementation of multiple date selection
export default function ShiftPickDateCalendar(props) {
  const classes = useStyles();


  const [pickedDate, setPickedDate] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tempStart, setTempStart] = React.useState([...props.shiftStartTimes]);
  const [tempEnd, setTempEnd] = React.useState([...props.shiftEndTimes]);

  const [valueStartTime, setValueStartTime] = React.useState(new Date('2020-04-02T11:00:54'));
  const [valueEndTime, setValueEndTime] = React.useState(new Date('2020-04-01T11:00:54'));

  const [validated, setValidated] = React.useState(true);


  const handleClickOpen = date => {
    let day = date.getDate();
    setPickedDate(day);

    //Timepickerに渡すデフォルト値
    setValueStartTime(props.shiftStartTimes[day - 1]);
    setValueEndTime(props.shiftEndTimes[day - 1]);
    setOpen(true);
  };

  const handleStartTimeChange = date => {
    setValueStartTime(date);
    let temp = [...props.shiftStartTimes];
    temp[pickedDate - 1] = date;
    setTempStart([...temp]);
    if (tempEnd[pickedDate - 1].getHours() - date.getHours() < 0) {
      setValidated(false);
    } else {
      setValidated(true);
    }

  };

  const handleEndTimeChange = date => {
    setValueEndTime(date);
    let temp = [...props.shiftEndTimes];
    temp[pickedDate - 1] = date;
    setTempEnd([...temp]);
    if (date.getHours() - tempStart[pickedDate - 1].getHours() < 0) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const handleSubmit = () => {
    props.setShiftStartTimes([...tempStart]);
    props.setShiftEndTimes([...tempEnd]);
    setOpen(false);

  };

  const handleClose = () => {
    setTempStart([...props.shiftStartTimes]);
    setTempEnd([...props.shiftEndTimes]);
    setOpen(false);
    setValidated(true);
  };

  var button = validated ?
    <Button onClick={handleSubmit} color="primary">登録</Button> :
    <Button disabled color="primary">登録</Button>;

  var err = validated ?
    <p></p> :
    <p className={classes.validation}>有効な時間を入力して下さい.</p>;

  return (
    <div>
      <Calendar onDayClick={handleClickOpen} locale={enGB} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{pickedDate}日のシフト希望時間</DialogTitle>
        <DialogContent>
          <DialogContentText>
            時間を登録してください。
            </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="start"
              label="start"
              value={valueStartTime}
              onChange={handleStartTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="end"
              label="end"
              value={valueEndTime}
              onChange={handleEndTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />

          </MuiPickersUtilsProvider>
          {err}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          {button}
        </DialogActions>
      </Dialog>
    </div>
  )
}