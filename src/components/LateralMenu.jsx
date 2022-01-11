import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    color: theme.palette.primary.dark
  }
}));

const LateralMenu = ({ onClose, open, history }) => {
  const location = useLocation();
  const classes = useStyles();

  const handleClick = (link) => {
    history.push(link);
  }

  useEffect(() => {
    if (open && onClose) {
      onClose();
    }
  }, [location.pathname]);

  const content = (
    <Box className={classes.list}>
      <Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          justifyItems="center"
          style={{ margin: '20px' }}
        >
          <Typography
            variant="h6" style={{ marginLeft: '20px' }}
          >
            Pay Post
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <List>
          <ListItem button onClick={() => handleClick('/dashboard')}>
            <ListItemText secondary="Dashboard" />
          </ListItem>

          <ListItem button onClick={() => handleClick('/posts', true)}>
            <ListItemText secondary="Posts" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer className={classes.list}
      anchor="left"
      onClose={onClose}
      open={open}
      variant="temporary"
      PaperProps={{
        sx: {
          width: 256
        }
      }}
    >
      {content}
    </Drawer>
  );
};

export default withRouter(LateralMenu);