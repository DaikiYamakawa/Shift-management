import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  validation: {
    color: 'red',
  },

}));

export default function FormTimeDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [temp, setTemp] = React.useState({ ...props.time });

  /**
  * バリデーション用state
  * @type {Object} 
  */
  //const { handleSubmit, register, errors } = useForm();

  const buttonName = ["add new time"];

  const dialogTitle = ["シフトのベース時間帯の登録"];

  const dialogContent = ["新しい時間帯を登録してください"];

  //let temp = { ...props.time };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTemp({ ...temp, 'start': props.time['start'], 'end': props.time['end'] });
    setOpen(false);
  };

  const handleSubmit = () => {
    props.onSubmit(temp);
    setOpen(false);
  };

  const handleStartTimeChange = (time) => {
    setTemp({ ...temp, 'start': time });
  };

  const handleEndTimeChange = (time) => {
    setTemp({ ...temp, 'end': time });
  };


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="start"
                value={temp['start']}
                onChange={handleStartTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="end"
                value={temp['end']}
                onChange={handleEndTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}