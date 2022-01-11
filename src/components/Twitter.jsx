import { useContext } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';

import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import { makeStyles } from '@material-ui/core/styles';

import { PlatformsAuthContext } from '../contexts/PlatformsAuthContext';
import { constants } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    paddingBottom: theme.spacing(0.5)
  }
}));

const Twitter = () => {

  const classes = useStyles();

  const { platformsAuthenticated, signInTwitter } = useContext(PlatformsAuthContext);

  const handleTwitterSignIn = async () => {
    await signInTwitter();
  }

  return (
    <Card >
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant='h5' component='h2' align='center'>
          Twitter
        </Typography>
        <Box display='flex' justifyContent='center'>
          {!!platformsAuthenticated[constants.TWITTER] ?
            <MoodIcon /> :
            <MoodBadIcon />
          }
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          color='primary'
          style={{ minWidth: '100%' }}
          onClick={handleTwitterSignIn}
        >
          {!!platformsAuthenticated[constants.TWITTER] ? "Connected" : "Connect"}
        </Button>
      </CardActions>
    </Card>
  );

};

export default Twitter;