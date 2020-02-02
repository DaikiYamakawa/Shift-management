import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
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
});

export default function Make_Shift() {
  const classes = useStyles();

  return (
    <div>
      <h1>シフト作成</h1>
      <Card className={classes.card}>
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
          <Button size="small"><SaveAltIcon />画像の保存</Button>
        </CardActions>
      </Card>
    </div>
  );
}