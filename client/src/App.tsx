/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react';
import './styles.scss';

// const App: React.FC = () => (
//     <div className="wrapper">
//         <h1>React 17 and TypeScript 4 App!🚀</h1>
//     </div>
// );

// export default App;
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, deleteTodo, getTodo, updateTodo} from './action';
import {NewTodoInput} from './NewTodoInput';
import {ITodoState} from './reducers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {
    Grid,
    Paper,
    makeStyles,
    IconButton,
    Typography,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
function App() {
    const classes = useStyles();
    const _todos = useSelector<ITodoState, ITodoState['todos']>(
        (state) => state.todos,
    );
    // console.log("🚀 ~ file: App.tsx ~ line 7 ~ App ~ _todos", _todos);
    const dispatch = useDispatch();

    // const onSave = () => {
    //   dispatch(saveTodos());
    // };

    // const onLoad = () => {
    //   dispatch(getTodo());
    // };

    useEffect(() => {
        dispatch(getTodo());
        return () => {
            // cleanup
        };
    }, []);
    return (
        <div className="main">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12} md={12}>
                        <Paper className={classes.paper}>
                            <NewTodoInput
                                addTodo={(todo: string) =>
                                    dispatch(addTodo(todo))
                                }
                            />
                        </Paper>
                    </Grid>

                    <Grid
                        className="list-container"
                        item
                        xs={12}
                        lg={12}
                        md={12}>
                        {_todos?.map((todo) => (
                            <Paper
                                className={'todo-list'}
                                variant="outlined"
                                key={todo?._id}>
                                <div
                                    className="todo-title-warper"
                                    onClick={() =>
                                        dispatch(
                                            updateTodo(
                                                todo?._id,
                                                todo?.status !== 'completed'
                                                    ? 'completed'
                                                    : 'revert',
                                            ),
                                        )
                                    }>
                                    <div className="todo-flex">
                                        {todo?.status !== 'completed' ? (
                                            <RadioButtonUncheckedIcon
                                            // style={{
                                            //   color: "red",
                                            //   background: "green",
                                            // }}
                                            />
                                        ) : (
                                            <CheckCircleOutlineIcon
                                                style={{
                                                    color: '#24d42b',
                                                    // background: "green",
                                                }}
                                            />
                                        )}
                                        <Typography
                                            style={{
                                                marginLeft: '15px',
                                                textDecoration:
                                                    todo?.status === 'completed'
                                                        ? 'line-through'
                                                        : 'none',
                                            }}
                                            variant="subtitle1"
                                            display="block"
                                            // gutter={10}
                                        >
                                            {todo?.title}{' '}
                                        </Typography>
                                    </div>
                                </div>
                                <div>
                                    <IconButton
                                        onClick={() =>
                                            dispatch(deleteTodo(todo?._id))
                                        }
                                        color="secondary"
                                        aria-label="add an alarm">
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                </div>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default App;
