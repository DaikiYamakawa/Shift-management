import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import CheckBox from "./CheckBox";

const useStyles = makeStyles(() => ({
  validation: {
    color: "red",
    display: "block",
  },
}));

export default function EditDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [skill, setSkill] = React.useState(props.skill);

  const Name = props.name;

  const buttonName = "編集";

  const dialogTitle = "スキル変更";

  const dialogContent = "スキルを編集してください";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log("ok");

    async function patchData() {
      let result;
      try {
        result = await axios.patch(`http://localhost:3000/part-time-job-lists/${props.num}`, {
          skill,
        });
        console.log(result);
      } catch (err) {
        result = err.response;
      }
    }
    patchData();
    setOpen(false);

    // if (props.id === 2) {
    //   props.onSubmit(inputRef.current.value);
    // } else {
    //   console.log("OK");
    //   temp.push(inputRef.current.value);
    //   props.onSubmit(temp);
    // }
  };

  //   async function postData() {
  //     let res;

  //     if (props.id === "0") {
  //       try {
  //         res = await axios.post("http://localhost:3000/part-time-job-lists", {
  //           name: inputRef.current.value,
  //           skill: [],
  //         });
  //         temp.push(inputRef.current.value);
  //         props.onSubmit(temp);
  //       } catch (err) {
  //         res = err.response;
  //       }
  //     } else if (props.id === "1") {
  //       try {
  //         res = await axios.post("http://localhost:3000/skill-lists", {
  //           name: inputRef.current.value,
  //         });
  //         temp.push(inputRef.current.value);
  //         props.onSubmit(temp);
  //       } catch (err) {
  //         res = err.response;
  //       }
  //     }
  //   }

  //   postData();
  //   setOpen(false);
  // };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {Name}さん{dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
          <CheckBox skill={props.skill} setSkill={setSkill} />
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
