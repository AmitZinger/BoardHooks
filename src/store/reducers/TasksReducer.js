import produce from "immer"
import uniqid from "uniqid"

const initialState = [{
    dateCreated: new Date(),
    dateDone: new Date(),
    title: 'task title',
    description: 'this is the task description, here you can see the description of the task this is the task description, here you can see the description of the task',
    status: 1,
    id: uniqid()
}];

export default (state = initialState, action) =>
produce(state, draft => {
    switch (action.type) {
        case 'ADD':
            draft.push(action.payload);
            break;
        case 'EDIT':
            const indexToEdit = draft.findIndex(task => task.id === action.payload.id);
            draft[indexToEdit] = action.payload;
            break;
        case "DELETE":
            const indexToDelete = draft.findIndex(task => task.id === action.payload.id);
            draft.splice(indexToDelete, 1);
            break;
    }
})