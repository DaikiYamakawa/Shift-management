import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CheckBox from "./CheckBox";
import FormDialog from "./FormDialog";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import TabPanel from "./TabPanel";

const useStyles = makeStyles(() => ({
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
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 420,
    width: 300,
    overflow: "scroll",
  },
  chipGroup: {
    overflow: "scroll",
  },
}));

export default function registerSkill() {
  const classes = useStyles();

  const [personNames, setPersonNames] = useState(["キャッシャー", "ベーカリー", "ウォッシャー"]);

  const handleDelete = (index) => () => {
    console.info("You clicked the delete icon.");
    console.log(index);
    const temp = [...personNames];
    temp.splice(index, 1);
    setPersonNames(temp);
  };

  const [edit, setEdit] = useState(false);
  const editSkill = edit ? (
    <CheckBox />
  ) : (
    <Grid item xs={12} md={6}>
      <div>
        <List>
          {["キャッシャー", "ベーカリー", "ウォッシャー"].map((name, index) => (
            <ListItem key={index}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Grid>
  );

  const editButton = edit ? (
    <Button variant="outlined" onClick={() => setEdit(!edit)}>
      編集終了
    </Button>
  ) : (
    <Button variant="outlined" onClick={() => setEdit(!edit)}>
      編集
    </Button>
  );

  return (
    <div className={classes.parent}>
      <div className={classes.box}>
        <h1 className={classes.h1}>スキル登録</h1>
      </div>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={0} item>
              <FormDialog id="1" name={personNames} onSubmit={setPersonNames} />
              <Paper className={classes.paper}>
                <div className={classes.chipGroup}>
                  {personNames.map((name, index) => (
                    <Chip
                      icon={<WorkIcon />}
                      key={index}
                      label={name}
                      onDelete={handleDelete(index)}
                      className={classes.chip}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
            <Grid key={1} item>
              {editButton}
              <Paper className={classes.paper}>
                <TabPanel value={editSkill} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
