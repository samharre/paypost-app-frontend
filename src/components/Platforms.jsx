import { useContext } from 'react';
import { withRouter } from 'react-router';

import {
  Box,
  Container,
  CssBaseline,
  Fab,
  Grid
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

import Twitter from './Twitter';
import Facebook from './Facebook';

import { PlatformsAuthContext } from '../contexts/PlatformsAuthContext';

const useStyles = makeStyles((theme) => ({
  addIcon: {
    marginRight: theme.spacing(0.5),
  },
  margin: {
    marginTop: theme.spacing(4),
  }
}));

const Platforms = ({ history }) => {

  const classes = useStyles();

  const { platformsAuthenticated } = useContext(PlatformsAuthContext);

  const handlePost = () => {
    history.replace('/post');
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Facebook />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Twitter />
          </Grid>
        </Grid>

        {Object.keys(platformsAuthenticated).length > 0 &&
          <Box className={classes.margin} display='flex' justifyContent='flex-end'>
            <Fab
              color="primary"
              variant="extended"
              aria-label="add post"
              onClick={handlePost}
            >
              <AddIcon className={classes.addIcon} />
              Post
            </Fab>
          </Box>
        }
      </Container>
    </>
  );

};

export default withRouter(Platforms);