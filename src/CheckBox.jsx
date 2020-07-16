import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

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
  const [state, setState] = React.useState(props.skill);
  // const [state, setState] = React.useState({
  //   gilad: true,
  //   jason: false,
  //   antoine: false,
  // });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.setSkill({ ...state, [event.target.name]: event.target.checked });
  };

  // const { gilad, jason, antoine } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {Object.entries(state).map((item, index) => {
            return (
              <FormControlLabel
                control={<Checkbox checked={item[1]} onChange={handleChange} name={item[0]} key={index} />}
                label={item[0]}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}
