import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { addSkill } from "../stores/skills";
import { addPersonSkill, addPerson } from "../stores/members";
import { useSelector, useDispatch } from "react-redux";
import { getUniqueStr } from "../modules/getUniqueStr";

const useStyles = makeStyles(() => ({
  validation: {
    color: "red",
    display: "block",
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.allSkills);
  const busySkills = useSelector((state) => state.skills.busySkills);
  const freeSkills = useSelector((state) => state.skills.freeSkills);
  const members = useSelector((state) => state.members.members);

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const inputRef = React.useRef(null);
  // const temp = [...props.name];

  /**
   * バリデーション用state
   * @type {Object}
   */
  // const { handleSubmit, register, errors } = useForm();

  const buttonNames = ["add new member", "add new skill", "add new time"];
  const buttonName = buttonNames[props.id];

  const dialogTitles = ["新規アルバイト登録", "新規スキル登録", "シフトのベース時間帯の登録"];
  const dialogTitle = dialogTitles[props.id];

  const dialogContents = [
    "新しいアルバイトの名前を記入してください",
    "新しいスキルを記入してください",
    "新しい時間帯を登録してください",
  ];
  const dialogContent = dialogContents[props.id];

  const labels = ["Name", "Skill", "Time"];
  const label = labels[props.id];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    async function postData() {
      let res;

      if (props.id === "0") {
        // アルバイト追加処理
        try {
          //全スキルを取ってきてオブジェクトの作成
          let temp = {};
          skills.map((item) => {
            temp = { ...temp, [item.value]: false };
          });
          const obj = {
            name: inputRef.current.value,
            skill: temp,
          };
          dispatch(addPerson(obj));
          res = await axios.post("http://localhost:3000/part-time-job-lists", {
            id: getUniqueStr(),
            name: inputRef.current.value,
            skill: temp,
          });
        } catch (err) {
          res = err.response;
        }
      } else if (props.id === "1") {
        // スキル追加処理
        try {
          dispatch(addSkill(inputRef.current.value));
          dispatch(addPersonSkill(inputRef.current.value));
          res = await axios.post("http://localhost:3000/skill-lists", { value: inputRef.current.value });
          res = await axios.post("http://localhost:3000/skill-sets", {
            busy: { ...busySkills, [inputRef.current.value]: false },
            free: { ...freeSkills, [inputRef.current.value]: false },
          });
          let temp_members = members;
          temp_members.map((item, index) => {
            console.log(temp_members[index].skill);
            temp_members[index].skill = { ...temp_members[index].skill, [inputRef.current.value]: false };
            console.log("ok");
          });
          console.log(temp_members);
          res = await axios.post("http://localhost:3000/part-time-job-lists", temp_members);
        } catch (err) {
          res = err.response;
        }
      }
    }

    postData();
    setValidated(false);
    setOpen(false);
  };

  const handleValidation = (e) => {
    const val = e.target.value;

    if (val === "") {
      setError(<span className={classes.validation}>入力必須</span>);
      setValidated(false);
      return;
    } else if (val.length > 10) {
      setError(<span className={classes.validation}>10文字以下にしてください.</span>);
      setValidated(false);
    } else {
      setError(<span></span>);
      setValidated(true);
      return;
    }
  };

  const button = validated ? (
    <Button onClick={handleSubmit} color="primary">
      OK
    </Button>
  ) : (
    <Button disabled color="primary">
      OK
    </Button>
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
          <TextField
            autoFocus
            margin="dense"
            label={label}
            name="input"
            fullWidth
            inputRef={inputRef}
            onChange={handleValidation}
          />
          {error}
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
