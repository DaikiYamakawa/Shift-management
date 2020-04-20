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

// Very rough implementation of multiple date selection
export default function ShiftPickDateCalendar(props) {
  const [date, setDate] = useState([]);
  const [open, setOpen] = React.useState(false);

  let valueStartTime;
  let valueEndTime;

  const handleClickOpen = date => {
    let clickedDay = date.getDate();
    setDate(clickedDay);
    console.log(clickedDay);
    console.log(typeof (clickedDay));
    //Timepickerに渡すデフォルト値
    valueStartTime = props.shiftStartTimes.clickedDay;
    valueEndTime = props.shiftEndTimes.clickedDay;
    setOpen(true);
  };

  const handleStartTimeChange = date => {
    let day = date.getDate();
    //props.setShiftStartTimes(({ ...props.shiftStartTimes, [day]: date }));
    let time = { ...props.shiftStartTimes };
    time[day] = date;
    props.setShiftStartTimes(time);
    console.log(props.shiftStartTimes);
  };

  const handleEndTimeChange = date => {
    let day = date.getDate();
    props.setShiftEndTimes(({ ...props.shiftEndTimes, [day]: date }));
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Calendar onDayClick={handleClickOpen} locale={enGB} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{date}日のシフト希望時間</DialogTitle>
        <DialogContent>
          <DialogContentText>
            時間を登録してください。
            </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="開始"
              value={valueStartTime}
              onChange={handleStartTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="終了"
              value={valueStartTime}
              onChange={handleEndTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleClose} color="primary">
            登録
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}