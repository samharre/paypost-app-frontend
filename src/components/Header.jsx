import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { makeStyles } from '@material-ui/core/styles';

import LateralMenu from './LateralMenu';
import { PlatformsAuthContext } from '../contexts/PlatformsAuthContext';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarTitle: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1)
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto'
  },
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

const Header = ({ history }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const { signOutPlatforms } = useContext(PlatformsAuthContext);
  const { signOut } = useContext(AuthContext);

  const handleSignOut = async () => {

    await signOutPlatforms();
    await signOut();

    history.push('/');

  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start"
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <LateralMenu
            onClose={() => setOpen(false)}
            open={open}
          />

          <Typography className={classes.toolbarTitle} variant="h5">
            Pay Post
          </Typography >
          <div className={classes.iconsContainer}>
            <div>
              <ExitToAppIcon
                className={classes.icon}
                onClick={handleSignOut}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
