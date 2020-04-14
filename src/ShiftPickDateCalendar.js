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
  const [selectedDates, setSelectedDates] = useState([])
  const modifiers = {
    selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = date => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDayClick = date => {
    if (selectedDates.some(selectedDate => isSameDay(selectedDate, date))) {
      // クリックされた日付が既に存在していた場合、その日付を配列から取り除き、setSelectedDatesを実行します。
      setSelectedDates(
        selectedDates.filter(selectedDate => !isSameDay(selectedDate, date))
      )
    } else {
      // クリックされた日付が既に存在していない場合、今まで通り配列に日付を追加します。
      setSelectedDates([...selectedDates, date])
    }
  }
  return (
    <div>
      <Calendar onDayClick={handleClickOpen} modifiers={modifiers} locale={enGB} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">●日のシフト希望時間</DialogTitle>
        <DialogContent>
          <DialogContentText>
            時間を登録してください。
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="開始"
              value={props.name}
              onChange={props.onSubmit}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="終了"
              value={props.name}
              onChange={props.onSubmit}
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