const uniqid = require('uniqid');

const initialState = [{
    dateCreated: new Date(),
    dateDone: new Date(),
    title: 'task title',
    description: 'this is the task description, here you can see the description of the task this is the task description, here you can see the description of the task',
    status: 1,
    id: uniqid()
}];

function TasksReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                action.payload
            ];
        case "EDIT":
            return state.map(task => task.id === action.payload.id ? action.payload : task);
        case "DELETE":
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
}

export default TasksReducer;