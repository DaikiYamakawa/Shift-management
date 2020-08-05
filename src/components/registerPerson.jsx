import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import PersonIcon from "@material-ui/icons/Person";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormDialog from "./FormDialog";
import EditDialog from "./EditDialog";
import { useSelector, useDispatch } from "react-redux";
import { deletePerson, selectPerson } from "../stores/members";
import TitleButton from "./TitleButton";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
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
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function registerPerson() {
  const classes = useStyles();
  const [personNames, setPersonNames] = useState([]);
  const [skills, setSkills] = useState([]);

  // 新規
  const loading = useSelector((state) => state.members.loading);
  const error = useSelector((state) => state.members.error);
  const members = useSelector((state) => state.members.members);
  const selected = useSelector((state) => state.members.selected);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const temp_personNames = [];
      const temp_skills = [];
      let result;

      try {
        // アルバイト情報の取得
        result = await axios.get("http://localhost:3000/part-time-job-lists");
        // dispatch(setPersons(result.data));
        // dispatch(fetchMembers());
      } catch (err) {
        result = err.response;
      }
      for (let i = 0; i < result.data.length; i++) {
        temp_personNames.push(result.data[i].name);
        temp_skills.push(result.data[i].skill);
      }
      setPersonNames(temp_personNames);
      setSkills(temp_skills);
      //setLoading(false);
    }
    fetchData();
  }, [setPersonNames, setSkills]);

  const handleDelete = (index) => () => {
    console.info("You clicked the delete icon.");
    console.log(index);
    // const temp = [...personNames];
    // temp.splice(index, 1);
    // setPersonNames(temp);
    dispatch(deletePerson(index));
  };

  const handleClick = (index) => () => {
    //setSelectedPersonNum(index);
    dispatch(selectPerson(index));
  };

  const handleSubmit = () => {
    async function patchData() {
      let result;
      try {
        result = await axios.patch(`http://localhost:3000/part-time-job-lists/${props.num}`, {
          skill,
        });
        console.log(result);
      } catch (err) {
        result = err.response;
      }
    }
    patchData();
  };

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
      <TitleButton name="アルバイト登録" button="登録" />

      <Grid container className={classes.root_} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={0} item>
              <FormDialog id="0" name={personNames} onSubmit={setPersonNames} />
              <Paper className={classes.paper_}>
                <div className={classes.chipGroup}>
                  {members.map((item, index) => (
                    <Chip
                      icon={<PersonIcon />}
                      key={index}
                      label={item.name}
                      onClick={handleClick(index)}
                      onDelete={handleDelete(index)}
                      className={classes.chip}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            <Grid key={1} item>
              {/* <EditDialog name={personNames[selectedPersonNum]} skill={skills[selectedPersonNum]} num={num} /> */}
              <EditDialog name={members[selected].name} skill={members[selected].skill} num="1" />
              <Paper className={classes.paper_}>
                {/* <Typography noWrap>{personNames[selectedPersonNum]}さんのスキル</Typography> */}
                <Typography noWrap>{members[selected].name}さんのスキル</Typography>
                <Grid item xs={12} md={6}>
                  <div>
                    <List>
                      {/* {Object.entries(skills[selected]) */}
                      {Object.entries(members[selected].skill)
                        .filter((x) => x[1])
                        .map((item) => {
                          return (
                            <ListItem key={item[0]}>
                              <ListItemText primary={item[0]} />
                            </ListItem>
                          );
                        })}
                    </List>
                  </div>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
