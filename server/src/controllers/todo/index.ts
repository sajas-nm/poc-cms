import express, { Response, Request } from "express";

import { ITodo } from "./../../types/todo";

import Todo from "../../models/todo";

const parseBody = (bodyString: string) => {
  try {
    return JSON.parse(bodyString);
  } catch (e) {
    return bodyString;
  }
};
const getTodos = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    console.log("........");
    const todos: ITodo[] = await Todo.find();
    // res.sendStatus(200).json({ todos });
    res.json({ data: todos });
  } catch (error) {
    console.error({ error });
    console.error({ error });
    res.status(500).json({ error: error });
  }
};

const addTodo = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const body = parseBody(req.body);
    const _todo: ITodo = new Todo({
      title: body.title,
      status: "new",
    });

    const newTodo: ITodo = await _todo.save();
    const allTodos: ITodo[] = await Todo.find();
    res.json({ mesage: "todo sucessfully", data: allTodos });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: error });
  }
};

const updateTodo = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { id, status } = req.body;
    parseBody(req.body);

    const updated: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      { status: status }
    );
    const allTodos: ITodo[] = await Todo.find();
    console.log("🚀 ~ file: index.ts ~ line 63 ~ allTodos", allTodos)
    res.json({ mesage: "todo updated succesfully", data: allTodos });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = parseBody(req.body);
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(id);

    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      data: allTodos,
      // todo: deletedTodo,
      // todos: allTodos,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
