import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Grid, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Statuses from '../consts/Statuses'
import Task from './Task'
import AddEditTask from './AddEditTask'
import ExcelExport from './ExcelExport'
import uniqid from 'uniqid'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Tasks = () => {
  const classes = useStyles();
  const tasks = useSelector(state => state.tasks)
  const [selectedStatus, setSelectedStatus] = useState(0)
  const [open, setOpen] = useState(false);

  const tasksShown = selectedStatus === 0 ? tasks : tasks.filter(task => task.status === selectedStatus);
  const numberOfTasksShown = tasksShown.length;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button size="large" variant="contained" color="primary" onClick={handleClickOpen} style={{ marginRight: 20 }}>
          add task
        </Button>
        <ExcelExport tasks={tasksShown} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={handleChange}
            label="status"
          >
            <MenuItem value={0}>all</MenuItem>
            {
              Object.entries(Statuses).map(([key, value]) => {
                return (
                  <MenuItem key={uniqid()} value={Number(key)}>{value}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <span>
          number of tasks: {numberOfTasksShown}
        </span>
      </div>
      <br />
      <Grid container spacing={2}>
        {
          tasksShown.map(task => {
            return (
              <Grid key={uniqid()} item xs={4}>
                <Task
                  task={task}
                />
              </Grid>
            )
          })
        }
      </Grid>
      <AddEditTask open={open} handleClose={handleClose} mode="add" />
    </div>
  );
}

export default Tasks;