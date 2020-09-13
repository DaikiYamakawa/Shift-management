import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function MemberList(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const person = props.person;

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          シフト未提出者リスト
        </Grid>
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>
          {person.map((name) => {
            return (
              <ListItem key={name}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={name} secondary={secondary ? "Secondary text" : null} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}
