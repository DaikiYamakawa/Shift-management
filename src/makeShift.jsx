import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MemberList from "./MemberList";

const useStyles = makeStyles({
  container: {
    maxWidth: "70%",
    maxHeight: "70%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  box: {
    display: "inline",
    padding: "0.5em 1em",
    margin: "2em 0",
    fontWeight: "bold",
    textAlign: "center",
  },
  h1: {
    fontFamily: "Courier",
  },
  root: {
    minWidth: "70%",
    display: "inline-block",
  },
  card: {
    textAlign: "center",
  },
  saveButton: {
    display: "block",
    margin: "0 0 0 auto",
  },
  createButton: {
    display: "block",
    margin: "0 auto",
  },
  createDiv: {
    display: "block",
    textAlign: "center",
  },
});

export default function makeShift() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.box}>
        <h1 className={classes.h1}>シフト作成</h1>
      </div>
      <div className={classes.card}>
        <Card className={classes.root}>
          <CardContent>
            <MemberList />
          </CardContent>
          <CardActions>
            <Button className={classes.saveButton} variant="contained" color="secondary">
              save
            </Button>
          </CardActions>
        </Card>
      </div>
      <div className={classes.createDiv}>
        <Typography className={classes.pos} color="textSecondary">
          シフトを作成するには、以下のボタンをクリックして下さい
        </Typography>
        <Button className={classes.createButton} variant="contained" color="primary">
          Create Shift
        </Button>
      </div>
    </div>
  );
}
