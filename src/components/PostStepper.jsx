import { useContext, useState } from 'react';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Button,
  Divider,
  Paper,
  Step,
  Stepper,
  StepLabel,
  Typography
} from '@material-ui/core';

import PlatformSelection from './PlatformSelection';

import PostForm from './PostForm';
import { PostsContext } from '../contexts/PostsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  margin: {
    padding: theme.spacing(3)
  }
}));

const getSteps = () => {
  return [
    'Select Platform',
    'Create Post',
    'Success'
  ];
};

const getStepContent = (stepIndex, platform, setPlatform, post, setPost, totalEarned) => {
  switch (stepIndex) {
    case 0:
      return <PlatformSelection platform={platform} setPlatform={setPlatform} />
    case 1:
      return <PostForm post={post} setPost={setPost} />
    case 2:
      return (
        <>
          <Typography display="block" gutterBottom style={{ marginBottom: '2rem' }}>3. Success</Typography>
          <Typography display="block" align='center' gutterBottom>You just earned</Typography>
          <Typography variant="h5" align='center' gutterBottom>
            {`$ ${totalEarned}!`}
          </Typography>
        </>
      );
    default:
      return 'Unknown stepIndex';
  }
};

const PostStepper = ({ history }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [platform, setPlatform] = useState(null);
  const [post, setPost] = useState('');
  const [totalEarned, setTotalEarned] = useState(0);

  const { createPost } = useContext(PostsContext);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePost = async (event) => {
    event.preventDefault();

    const oauth_token = localStorage.getItem(`paypost_${platform}.oauth_token`);

    const data = {
      platform,
      oauthToken: oauth_token,
      post
    };

    const newPost = await createPost(data);

    setTotalEarned(newPost.totalEarned);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleFinish = () => {
    history.push('/posts');
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />
      <Paper elevation={0} >
        <Box style={{ padding: '30px' }}>
          {getStepContent(activeStep, platform, setPlatform, post, setPost, totalEarned)}
        </Box>
        <Box className={classes.margin} display='flex' justifyContent='flex-end'>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.backButton}
          >
            Back
          </Button>
          {activeStep === 1 ?
            <Button
              variant='contained'
              color='primary'
              disabled={!post}
              onClick={handlePost}
            >
              Post
            </Button>
            :
            (activeStep === 2 ?
              <Button
                variant='contained'
                color='primary'
                disabled={!post}
                onClick={handleFinish}
              >
                Finish
              </Button>
              :
              <Button
                variant='contained'
                color='primary'
                disabled={!platform}
                onClick={handleNext}
              >
                Next
              </Button>
            )
          }
        </Box>
      </Paper>
    </div >
  );
};

export default withRouter(PostStepper);