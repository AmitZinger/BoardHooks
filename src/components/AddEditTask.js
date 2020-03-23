import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import uniqid from 'uniqid'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select, MenuItem, InputLabel, FormControl, TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import Actions from '../store/actions/index'
import Statuses from '../consts/Statuses'
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function AddTask(props) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState(null)
    const [id, setId] = useState(null)
    const [dateDone, setDateDone] = useState(new Date().toISOString().substring(0, 10))
    const { open, handleClose, mode, taskToEdit } = props;

    const notify = (message, type) => toast[type](message);

    const onClose = () => {
        setId(null);
        setStatus(null);
        setTitle('');
        setDescription('');
        setDateDone(new Date().toISOString().substring(0, 10));
        handleClose()
    }

    useEffect(() => {
        if (mode === 'edit') {
            setId(taskToEdit.id);
            setStatus(taskToEdit.status);
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setDateDone(taskToEdit.dateDone.toISOString().substring(0, 10));
        }
    }, [])

    const createTask = () => {
        if (title.length === 0 || description.length === 0) {
            notify('fill required fields', 'error')
        } else {
            const taskToCreate = {
                title,
                description,
                dateCreated: new Date(),
                dateDone: new Date(dateDone),
                status: 1,
                id: uniqid()
            }
            dispatch(Actions.TasksActions.addTask(taskToCreate))
            notify('task added', 'success')
            onClose()
        }
    }

    const editTask = () => {
        if (title.length === 0 || description.length === 0) {
            notify('fill required fields', 'error')
        } else {
            const editedTask = {
                title,
                description,
                status,
                id,
                dateDone: new Date(dateDone),
                dateCreated: taskToEdit.dateCreated
            }
            dispatch(Actions.TasksActions.editTask(editedTask))
            notify('task edited', 'success')
            onClose()
        }
    }

    const handleChange = event => {
        setStatus(event.target.value);
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{mode} task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the following information to {mode} the task
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        InputLabelProps={{ required: true }}
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        InputLabelProps={{ required: true }}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Due"
                        type="date"
                        InputLabelProps={{ shrink: true, required: true }}
                        fullWidth
                        value={dateDone}
                        onChange={(e) => setDateDone(e.target.value)}
                    />
                    {mode === 'edit' && <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>status</InputLabel>
                        <Select
                            value={status}
                            onChange={handleChange}
                            label="status"
                        >
                            {
                                Object.entries(Statuses).map(([key, value]) => {
                                    return (
                                        <MenuItem key={uniqid()} value={Number(key)}>{value}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={mode === 'add' ? createTask : editTask} color="primary">
                        {mode}
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </div>
    );
}