import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import PersonIcon from "@material-ui/icons/Person";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import FormDialog from "./FormDialog";
import CheckBox from "./CheckBox";
import CircularProgress from '@material-ui/core/CircularProgress';

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
  progress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function registerPerson() {
  const classes = useStyles();
  const [selectedPersonNum, setSelectedPersonNum] = useState(0);
  const [personNames, setPersonNames] = useState([]);
  const [edit, setEdit] = useState(false);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const allSkills = [];

  useEffect(() => {
    async function fetchData() {
      const temp_personNames = [];
      const temp_skills = [];
      let result;

      try {
        // スキル情報の取得
        result = await axios.get("http://localhost:3000/skill-lists");
      } catch (err) {
        result = err.response;
      }
      for (let i = 0; i < result.data.length; i++) {
        allSkills.push(result.data[i].name);
      }

      try {
        // アルバイト情報の取得
        result = await axios.get("http://localhost:3000/part-time-job-lists");
      } catch (err) {
        result = err.response;
      }
      for (let i = 0; i < result.data.length; i++) {
        temp_personNames.push(result.data[i].name);
        temp_skills.push(result.data[i].skill);
      }
      setPersonNames(temp_personNames);
      setSkills(temp_skills);
      setLoading(false);
    }
    fetchData();
  }, [setPersonNames, setSkills, setLoading]);

  const handleDelete = (index) => () => {
    console.info("You clicked the delete icon.");
    console.log(index);
    const temp = [...personNames];
    temp.splice(index, 1);
    setPersonNames(temp);
  };

  const handleClick = (index) => () => {
    setSelectedPersonNum(index);
  };

  if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
        <CircularProgress color="secondary" />
      </div>
    );
  } else {
    const editButton = edit ? (
      <Button variant="outlined" onClick={() => setEdit(!edit)}>
        編集終了
      </Button>
    ) : (
      <Button variant="outlined" onClick={() => setEdit(!edit)}>
        編集
      </Button>
    );

    const editSkill = edit ? (
      <CheckBox allSkills={allSkills} skill={skills[selectedPersonNum]}/>
    ) : (
      <Grid item xs={12} md={6}>
        <div>
          <List>
            {skills[selectedPersonNum].map((name, index) => (
              <ListItem key={index}>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    );

    return (
      <div className={classes.parent}>
        <div className={classes.box}>
          <h1 className={classes.h1}>アルバイト登録</h1>
        </div>
  
        <Grid container className={classes.root_} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid key={0} item>
                <FormDialog id="0" name={personNames} onSubmit={setPersonNames} />
                <Paper className={classes.paper_}>
                  <div className={classes.chipGroup}>
                    {personNames.map((name, index) => (
                      <Chip
                        icon={<PersonIcon />}
                        key={index}
                        label={name}
                        onClick={handleClick(index)}
                        onDelete={handleDelete(index)}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                </Paper>
              </Grid>
              <Grid key={1} item>
                {editButton}
                <Paper className={classes.paper_}>
                  <Typography noWrap>{personNames[selectedPersonNum]}さんのスキル</Typography>
                  {editSkill}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
