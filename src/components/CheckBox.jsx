import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { setSkills } from "../stores/members";
import { setSkillSet } from "../stores/skills";
import axios from "axios";

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
  let skillList;

  if (props.id == 1) {
    // アルバイトスキル登録
    selected = useSelector((state) => state.members.selected);
    skillList = useSelector((state) => state.members.members[selected].skill);
  } else if (props.id == 2) {
    // スキルセット登録
    selected = useSelector((state) => state.skills.selected);

    if (selected == 0) {
      // busy
      skillList = useSelector((state) => state.skills.busySkills);
    } else if (selected == 1) {
      // free
      skillList = useSelector((state) => state.skills.freeSkills);
    }
  }

  const handleChange = (event) => {
    async function postData() {
      const obj = {
        name: event.target.name,
        checked: event.target.checked,
      };

      if (props.id == 1) {
        const skill = {
          ...skillList,
          [event.target.name]: event.target.checked,
        };

        dispatch(setSkills(obj));
        let result;
        try {
          result = await axios.patch(`http://localhost:3000/part-time-job-lists/${selected + 1}`, {
            skill,
          });
        } catch (err) {
          result = err.response;
        }
      } else if (props.id == 2) {
        dispatch(setSkillSet(obj));
        let result;
        try {
          if (selected == 0) {
            const busy = {
              ...skillList,
              [event.target.name]: event.target.checked,
            };
            // busy
            result = await axios.patch(`http://localhost:3000/skill-sets`, {
              busy,
            });
          } else if (selected == 1) {
            const free = {
              ...skillList,
              [event.target.name]: event.target.checked,
            };
            // free
            result = await axios.patch(`http://localhost:3000/skill-sets`, {
              free,
            });
          }
        } catch (err) {
          result = err.response;
        }
      }
    }
    postData();
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {Object.entries(skillList).map((item) => {
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
