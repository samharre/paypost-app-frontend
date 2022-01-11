import { useContext } from 'react';
import { Container, CssBaseline, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PostsContext } from '../contexts/PostsContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: 100,
  },
}));

const Summary = () => {

  const classes = useStyles();

  const { posts } = useContext(PostsContext);

  const summary = {
    totalEarned: 0,
    platforms: {
      twitter: 0,
      facebook: 0
    }
  };

  posts.reduce((acc, post) => {
    acc.totalEarned += post.totalEarned;
    acc.platforms[post.platform] += post.totalEarned;

    return acc;
  }, summary);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <Typography variant="caption" display="block" gutterBottom>
                Total Posts
              </Typography>
              <Typography variant="h5" align='center' gutterBottom>
                {posts.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <Typography variant="caption" display="block" gutterBottom>
                Best Performing Media
              </Typography>
              <Typography variant="h5" align='center' gutterBottom>
                {summary.totalEarned === 0 ? '-' : (summary.platforms.facebook >= summary.platforms.twitter ? 'Facebook' : 'Twitter')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <Typography variant="caption" display="block" gutterBottom>
                Total Earned
              </Typography>
              <Typography variant="h5" align='center' gutterBottom style={{ color: '#388e3c' }}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(summary.totalEarned)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Summary;