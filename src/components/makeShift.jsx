import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import MemberList from "./MemberList";
import TitleButton from "./TitleButton";

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
});

export default function makeShift() {
  const classes = useStyles();
  const persons = [];
  const [person, setPerson] = React.useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let result;
      try {
        result = await axios.get("http://localhost:3000/non-submit-lists");
      } catch (err) {
        result = err.response;
      }
      for (let i = 0; i < result.data.length; i++) {
        persons.push(result.data[i].name);
      }
      setPerson(persons);
      setLoading(false);
    }
    fetchData();
  }, [setPerson]);

  if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
        <CircularProgress color="secondary" />
      </div>
    );
  }
  return (
    <div>
      <TitleButton name="シフト作成" button="作成" />
      <div className={classes.card}>
        <Card className={classes.root}>
          <CardContent>
            <MemberList person={person} />
          </CardContent>
          <CardActions>
            <Button className={classes.saveButton} variant="contained" color="secondary">
              save
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
