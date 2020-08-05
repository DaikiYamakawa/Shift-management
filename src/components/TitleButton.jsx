import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: "0.5em 1em",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 auto",
  },
  h1: {
    fontFamily: "Courier",
    display: "inline-block",
  },
  createButton: {
    marginLeft: "30px",
  },
}));

export default function TitleButton(props) {
  const classes = useStyles();

  const selected = useSelector((state) => state.members.selected);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // dispatch(setSkills( selected, event.target.name, event.target.checked ));
    
    //dispatch(setSkills(obj));
  };

  return (
    <div className={classes.box}>
      <h1 className={classes.h1}>{props.name}</h1>
      <Button className={classes.createButton} variant="contained" color="primary">
        {props.button}
      </Button>
    </div>
  );
}
