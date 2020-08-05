import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { setSkills } from "../stores/members";
import { setSkillSet } from "../stores/skills";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckBox(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let selected;
  let skill;

  if (props.id == 1) {
    // アルバイトスキル登録
    selected = useSelector((state) => state.members.selected);
    skill = useSelector((state) => state.members.members[selected].skill);
  } else if (props.id == 2) {
    // スキルセット登録
    selected = useSelector((state) => state.skills.selected);

    if (selected == 0) {
      // busy
      skill = useSelector((state) => state.skills.busySkills);
    } else if (selected == 1) {
      // free
      skill = useSelector((state) => state.skills.freeSkills);
    }
  }

  const handleChange = (event) => {
    const obj = {
      name: event.target.name,
      checked: event.target.checked,
    };

    if (props.id == 1) {
      dispatch(setSkills(obj));
    } else if (props.id == 2) {
      dispatch(setSkillSet(obj));
    }
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {Object.entries(skill).map((item) => {
            return (
              <FormControlLabel
                control={<Checkbox checked={item[1]} onChange={handleChange} name={item[0]} key={item[0]} />}
                label={item[0]}
                key={item[0]}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}
