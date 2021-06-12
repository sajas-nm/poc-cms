"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const parseBody = (bodyString) => {
    try {
        return JSON.parse(bodyString);
    }
    catch (e) {
        return bodyString;
    }
};
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("........");
        const todos = yield todo_1.default.find();
        // res.sendStatus(200).json({ todos });
        res.json({ data: todos });
    }
    catch (error) {
        console.error({ error });
        console.error({ error });
        res.status(500).json({ error: error });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = parseBody(req.body);
        const _todo = new todo_1.default({
            title: body.title,
            status: "new",
        });
        const newTodo = yield _todo.save();
        const allTodos = yield todo_1.default.find();
        res.json({ mesage: "todo sucessfully", data: allTodos });
    }
    catch (error) {
        console.error({ error });
        res.status(500).json({ error: error });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        parseBody(req.body);
        const updated = yield todo_1.default.findByIdAndUpdate({ _id: id }, { status: status });
        const allTodos = yield todo_1.default.find();
        console.log("🚀 ~ file: index.ts ~ line 63 ~ allTodos", allTodos);
        res.json({ mesage: "todo updated succesfully", data: allTodos });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = parseBody(req.body);
        const deletedTodo = yield todo_1.default.findByIdAndRemove(id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Todo deleted",
            data: allTodos,
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.deleteTodo = deleteTodo;
