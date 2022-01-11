import { Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(4),
    color: 'white',
  },
  filtersSection: {
    height: 35,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
}));

const SubHeader = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Grid alignItems="center" container className={classes.root}>
      <Grid item xs={12} >
        <Typography
          variant="h6"
          color="inherit"
          className={classes.title}
        >
          {title}
        </Typography>
      </Grid>
      <Grid
        container
        className={classes.filtersSection}
        justifyContent="center"
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default SubHeader;