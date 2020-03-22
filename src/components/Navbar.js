import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  title: {
    marginRight: '20px'
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Board
          </Typography>
          <Button color="inherit">Tasks</Button>
          <Button color="inherit">Passed</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}