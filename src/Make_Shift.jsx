import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  container: {
    maxWidth: '70%',
    maxHeight: '70%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
  di: {
    display: 'inline-block',
    margin: '30px',
  },
});

export default function Make_Shift() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.box}>
        <h1 className={classes.h1}>Create Shift</h1>
      </div>
      {/* <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            未提出者
        </Typography>
          <ul>
            <li>秋山諒太</li>
            <li>その他</li>
          </ul>
        </CardContent>
        <CardActions>
          <Button size="small"><SaveAltIcon />save</Button>
        </CardActions>
      </Card> */}
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.container}>
          <Typography component="div" style={{ backgroundColor: '#EEEEEE', height: '50vh' }}>
            <div className={classes.di}>
              <ul>
                <li>秋山諒太</li>
                <li>その他</li>
              </ul>
            </div>
            <Button size="small"><SaveAltIcon />save</Button>
          </Typography>
        </Container>
      </React.Fragment>
      <Button>Create Shift</Button>
    </div>
  );
}