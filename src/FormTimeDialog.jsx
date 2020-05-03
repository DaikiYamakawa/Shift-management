import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles(() => ({
  validation: {
    color: "red",
  },
}));

export default function FormTimeDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [temp, setTemp] = React.useState({ ...props.time });
  const [validated, setValidated] = React.useState(true);
  const DAYS = 31;

  const buttonName = ["add new time"];

  const dialogTitle = ["シフトのベース時間帯の登録"];

  const dialogContent = ["新しい時間帯を登録してください"];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTemp({ ...temp, start: props.time.start, end: props.time.end });
    setOpen(false);
    setValidated(true);
  };

  const handleSubmit = () => {
    console.log("OK!");
    props.onSubmit(temp);
    console.log(props.radio);
    if (props.radio === "1") {
      let tempStart = [];
      let tempEnd = [];
      for (let i = 0; i < DAYS; i++) {
        tempStart[i] = temp.start;
      }
      for (let i = 0; i < DAYS; i++) {
        tempEnd[i] = temp.end;
      }
      props.setShiftStartTimes([...tempStart]);
      props.setShiftEndTimes([...tempEnd]);
    }
    setOpen(false);
  };

  const handleStartTimeChange = (time) => {
    setTemp({ ...temp, start: time });
    if (temp["end"].getHours() - time.getHours() < 0) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const handleEndTimeChange = (time) => {
    setTemp({ ...temp, end: time });
    if (time.getHours() - temp["start"].getHours() < 0) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const button = validated ? (
    <Button onClick={handleSubmit} color="primary">
      登録
    </Button>
  ) : (
    <Button disabled color="primary">
      登録
    </Button>
  );

  var err = validated ? (
    <p></p>
  ) : (
    <p className={classes.validation}>有効な時間を入力して下さい.</p>
  );

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardTimePicker
                margin="normal"
                id="start"
                label="start"
                value={temp.start}
                onChange={handleStartTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="end"
                label="end"
                value={temp.end}
                onChange={handleEndTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
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
  );
}
