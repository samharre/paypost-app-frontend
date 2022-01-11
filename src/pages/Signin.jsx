import React, { useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { AuthContext } from '../contexts/AuthContext';


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    width: '100%',
    marginTop: '15px',
    marginBottom: '10px',
    elevation: 0,
    backgroundColor: theme.palette.secondary.main,
  }
}));

const Signin = ({ history }) => {

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {

    await signIn({ email, password });

    history.push("/dashboard");

  }

  return (
    <Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center" >
      <Box width="100%" maxWidth={360} >
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          < Avatar className={classes.avatar} >
            <LockOutlinedIcon />
          </Avatar >

          <Typography component="h1" variant="h6">
            Welcome to PayPost
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box >
  );
};

export default Signin;