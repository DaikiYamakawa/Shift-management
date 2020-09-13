import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import MemberList from "./MemberList";
import TitleButton from "./TitleButton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  card: {
    width: 375,
    display: "inline-block",
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
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Card className={classes.card}>
            <CardContent>
              <MemberList person={person} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
