import {TodoAction} from './action';

export interface ITodoState {
    todos: TodoType[];
}

export type TodoType = {
    title: string;
    _id: string;
    status: string;
    createdAt: string;
};
// title
const intialState = {
    todos: [],
};

export const todoReducer = (
    state: ITodoState = intialState,
    action: TodoAction,
) => {
    // console.log("action", action);
    switch (action.type) {
        case 'ADD_TODO': {
            return {todos: action.payload};
        }
        default:
            return state;
    }
};
