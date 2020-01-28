import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Accessibility';
import CreateIcon from '@material-ui/icons/Create';
import StoreIcon from '@material-ui/icons/Store';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl_icon, setAnchorEl_icon] = React.useState(null);
  const [anchorEl_menu, setAnchorEl_menu] = React.useState(null);
  const open_icon = Boolean(anchorEl_icon);
  const open_menu = Boolean(anchorEl_menu);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl_icon(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl_icon(null);
    setAnchorEl_menu(null);
  };

  const handleClick = event => {
    setAnchorEl_menu(event.currentTarget);
  };

  const handleToShiftPage = () => {
    props.history.push('/shift')
    setAnchorEl_icon(null);
    setAnchorEl_menu(null);
  }

  const handleToHomePage = () => {
    props.history.push('/')
    setAnchorEl_icon(null);
    setAnchorEl_menu(null);
  }

  const handleToManagerPage = () => {
    props.history.push('/manager')
    setAnchorEl_icon(null);
    setAnchorEl_menu(null);
  }

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
            />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl_menu}
            keepMounted
            open={open_menu}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleToHomePage}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="シフト" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleToShiftPage}>
              <ListItemIcon>
                <CreateIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="シフト提出" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleToManagerPage}>
              <ListItemIcon>
                <StoreIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="店長" />
            </StyledMenuItem>
          </StyledMenu>
          <Typography variant="h6" className={classes.title}>
            Shift Management
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl_icon}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open_icon}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(MenuAppBar)