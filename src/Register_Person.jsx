import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import MemberList from './MemberList';
import CheckBox from './CheckBox';
import FormDialog from './FormDialog';
import DelteButton from './DeleteButton';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 14,
  },
  box: {
    display: 'inline',
    padding: '0.5em 1em',
    margin: '2em 0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h1: {
    fontFamily: 'Courier',
  },
  chip: {
    margin: '10px 50px 10px 50px',
  },
  parent: {
    textAlign: 'center'
  },
  root_: {
    flexGrow: 1,
  },
  paper_: {
    height: 420,
    width: 300,
    overflow: 'scroll',
  },
  chipGroup: {
    overflow: 'scroll'
  }
}));

export default function Register_Person() {
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = (name) => () => {
    console.info('You clicked the Chip.');
    console.log(name);
    setPerson(name);
  };

  const [person, setPerson] = useState("秋山諒太");
  const personNames = ['秋山諒太', '山田花子', '立命太郎', '山田孝之', '山田二郎', '山田三郎', '竈門炭治郎', '嘴平伊之助', 'クリスティアーノロナウド'];

  const [edit, setEdit] = useState(false);
  let editSkill = edit ? <CheckBox /> : <div><h1>仮</h1> <h1>仮</h1> <h1>仮</h1> <h1>仮</h1> <h1>仮</h1> <h1>仮</h1><h1>仮</h1></div>;
  let editButton = edit ?
    <Button variant="outlined" onClick={() => setEdit(!edit)}>編集終了</Button> :
    <Button variant="outlined" onClick={() => setEdit(!edit)}>編集</Button>;

  return (
    <div className={classes.parent}>
      <div className={classes.box}>
        <h1 className={classes.h1}>アルバイト登録</h1>
      </div>

      <Grid container className={classes.root_} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid key={0} item>
              <FormDialog />
              <Paper className={classes.paper_}>
                <div className={classes.chipGroup}>
                  {personNames.map(name =>
                    <Chip
                      icon={<PersonIcon />}
                      key={name}
                      label={name}
                      onClick={handleClick(name)}
                      onDelete={handleDelete}
                      className={classes.chip}
                    />)}
                </div>
              </Paper>
            </Grid>
            <Grid key={1} item>
              {editButton}
              <Paper className={classes.paper_}>
                <Typography noWrap>{person}さんのスキル</Typography>
                {editSkill}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}