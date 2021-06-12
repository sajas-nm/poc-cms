/* eslint-disable @typescript-eslint/no-unused-vars */
import {Dispatch} from 'redux';
export type TodoAction = {type: 'ADD_TODO'; payload: []};

export const addTodo = (todo: string) => async (
    dispatch: Dispatch<TodoAction>,
) => {
    try {
        console.log('todo', todo);
        const res = await fetch('http://localhost:4000/add-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: todo}),
        });
        const result = await res.json();
        console.log('🚀 ~ file: action.ts ~ line 22 ~ result', res);
        if (res?.status === 200) {
            dispatch({
                type: 'ADD_TODO',
                payload: result?.data,
            });
        }
    } catch (e) {
        console.log('e', e);
        alert('somthing went wrong!');
    }
};
export const updateTodo = (id: string, status: string) => async (
    dispatch: Dispatch<TodoAction>,
) => {
    try {
        console.log('todo', status);
        const res = await fetch('http://localhost:4000/edit-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, status: status}),
        });
        const result = await res.json();
        console.log('🚀 ~ file: action.ts ~ line 22 ~ result', res);
        if (res?.status === 200) {
            dispatch({
                type: 'ADD_TODO',
                payload: result?.data,
            });
        }
    } catch (e) {
        console.log('e', e);
        alert('somthing went wrong!');
    }
};

export const deleteTodo = (id: string) => async (
    dispatch: Dispatch<TodoAction>,
) => {
    try {
        const res = await fetch('http://localhost:4000/delete-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        });
        const result = await res.json();
        console.log('🚀 ~ file: action.ts ~ line 22 ~ result', res);
        if (res?.status === 200) {
            dispatch({
                type: 'ADD_TODO',
                payload: result?.data,
            });
        }
    } catch (e) {
        console.log('e', e);
        alert('somthing went wrong!');
    }
};
export const getTodo = () => async (dispatch: Dispatch<TodoAction>) => {
    try {
        const res = await fetch('http://localhost:4000/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ id: id, title: todo }),
        });
        const result = await res.json();
        console.log('🚀 ~ file: action.ts ~ line 22 ~ result', res);
        if (res?.status === 200) {
            dispatch({
                type: 'ADD_TODO',
                payload: result?.data,
            });
        }
    } catch (e) {
        console.log('e', e);
        alert('somthing went wrong!');
    }
};
export const shortBy = (sort: string) => async (
    dispatch: Dispatch<TodoAction>,
) => {
    try {
        const res = await fetch('http://localhost:4000/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ id: id, title: todo }),
        });
        const result = await res.json();
        console.log('🚀 ~ file: action.ts ~ line 22 ~ result', res);
        if (res?.status === 200) {
            dispatch({
                type: 'ADD_TODO',
                payload: result?.data,
            });
        }
    } catch (e) {
        console.log('e', e);
        alert('somthing went wrong!');
    }
};
