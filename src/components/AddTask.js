import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { Button, Select, MenuItem, InputLabel, FormControl, TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import Actions from '../store/actions/index'
import uniqid from 'uniqid'
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask(props) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dateDone, setDateDone] = useState(new Date().toISOString().substring(0, 10))
    const { open, handleClose } = props;

    const notify = (message, type) => toast[type](message);

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
            handleClose()
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the following information to add the task
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={createTask} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </div>
    );
}