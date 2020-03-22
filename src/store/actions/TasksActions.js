const addTask = (task) => {
    return {
        type: "ADD",
        payload: task
    }
}

const editTask = (task) => {
    return {
        type: "EDIT",
        payload: task
    }
}

const deleteTask = (taskId) => {
    return {
        type: "DELETE",
        payload: taskId
    }
}

export default {
    addTask,
    editTask,
    deleteTask
}