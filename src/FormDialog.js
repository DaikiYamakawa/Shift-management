import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  const temp = [...props.name];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (props.id == 2) {
      props.onSubmit(inputRef.current.value);
    } else {
      temp.push(inputRef.current.value);
      props.onSubmit(temp);
    }
    setOpen(false);
  };

  const buttonNames = ["add new member", "add new skill", "add new time"];
  let buttonName = buttonNames[props.id];

  const dialogTitles = ["新規アルバイト登録", "新規スキル登録", "シフトのベース時間帯の登録"];
  let dialogTitle = dialogTitles[props.id];

  const dialogContents = ["新しいアルバイトの名前を記入してください", "新しいスキルを記入してください", "新しい時間帯を登録してください"];
  let dialogContent = dialogContents[props.id];

  const labels = ["Name", "Skill", "Time"];
  let label = labels[props.id];

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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={label}
            type="email"
            fullWidth
            inputRef={inputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}