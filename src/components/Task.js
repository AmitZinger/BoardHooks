import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Actions from '../store/actions/index'
import Statuses from '../consts/Statuses'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 250,
  },
  passed: {
    backgroundColor: '#ff000040'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Task(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { task } = props;

  const deleteTask = () => {
    dispatch(Actions.TasksActions.deleteTask(task.id))
  }

  return (
    <Card className={`${classes.root} ${task.status === 1 && classes.passed}`} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {task.title}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          status: {Statuses[task.status]}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          created at: {task.dateCreated.toLocaleDateString()}
          <br />
          due to: {task.dateDone.toLocaleDateString()}
        </Typography>
        <Typography variant="body2" component="p" style={{ overflow: 'auto', height: 60 }}>
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">edit</Button>
        <Button size="small" onClick={deleteTask}>delete</Button>
      </CardActions>
    </Card >
  );
}