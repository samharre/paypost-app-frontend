import { useContext } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

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

const Facebook = () => {

  const classes = useStyles();

  const { platformsAuthenticated, signInFacebook } = useContext(PlatformsAuthContext);

  const responseFacebook = async (response) => {
    await signInFacebook(response.accessToken);
  }

  return (
    <Card >
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant='h5' component='h2' align='center'>
          Facebook
        </Typography>
        <Box display='flex' justifyContent='center'>
          {!!platformsAuthenticated[constants.FACEBOOK] ?
            <MoodIcon /> :
            <MoodBadIcon />
          }
        </Box>
      </CardContent>
      <CardActions>
        <FacebookLogin
          appId="638866444067457"
          autoLoad={false}
          callback={responseFacebook}
          scope="pages_manage_posts,pages_read_engagement"
          render={renderProps => (
            <Button
              size='small'
              color='primary'
              style={{ minWidth: '100%' }}
              onClick={renderProps.onClick}
            >
              {!!platformsAuthenticated[constants.FACEBOOK] ? "Connected" : "Connect"}
            </Button>
          )}
        />

      </CardActions>
    </Card>
  );

};

export default Facebook;