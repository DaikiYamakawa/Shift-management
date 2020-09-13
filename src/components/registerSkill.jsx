import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import TabPanel from "./TabPanel";
import FormDialog from "./FormDialog";
import CheckBox from "./CheckBox";
import { fetchSkills, deleteSkill, fetchSkillSets } from "../stores/skills";
import { deletePersonSkill } from "../stores/members";
import EditDialog from "./EditDialog";
import TitleButton from "./TitleButton";

const useStyles = makeStyles((theme) => ({
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
  chip: {
    margin: "10px 50px 10px 50px",
  },
  parent: {
    textAlign: "center",
  },
  root_: {
    flexGrow: 1,
  },
  paper_: {
    height: 420,
    width: 300,
    overflow: "scroll",
  },
  chipGroup: {
    overflow: "scroll",
  },
  btn: {
    marginBottom: 10,
  },
}));

export default function registerSkill() {
  const classes = useStyles();
  const loading = useSelector((state) => state.skills.loading);
  const error = useSelector((state) => state.skills.error);
  const skills = useSelector((state) => state.skills.allSkills);
  const selected = useSelector((state) => state.skills.selected);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   function fetchData() {
  //     try {
  //       dispatch(fetchSkills());
  //       dispatch(fetchSkillSets());
  //     } catch (err) {
  //       console.log(err.response);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const handleDelete = (index, name) => () => {
    console.info("You clicked the delete icon.");
    console.log(index);
    const obj = {
      index: index,
      name: name,
    };
    dispatch(deleteSkill(obj));
    dispatch(deletePersonSkill(name));
  };

  const editSkill = (
    <Grid item xs={12} md={6}>
      <div>
        <List>
          {skills.map((name) => (
            <ListItem key={name}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Grid>
  );

  if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error!!</p>;
      </div>
    );
  }

  return (
    <div className={classes.parent}>
      <TitleButton name="スキル登録" button="登録" />

      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid key={0} item>
          <Grid item>
            <div className={classes.btn}>
              <FormDialog id="1" />
            </div>
          </Grid>
          <Grid item>
            <Paper className={classes.paper_}>
              <div className={classes.chipGroup}>
                {skills.map((item, index) => (
                  <Chip
                    icon={<WorkIcon />}
                    key={item.value}
                    label={item.value}
                    onDelete={handleDelete(index, item.value)}
                    className={classes.chip}
                  />
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid key={1} item>
          <Grid item>
            <div className={classes.btn}>
              <EditDialog num="2" />
            </div>
          </Grid>
          <Grid item>
            <Paper className={classes.paper_}>
              <TabPanel value={editSkill} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
