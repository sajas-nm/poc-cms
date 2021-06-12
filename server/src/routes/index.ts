import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todo"

const router: Router = Router()

router.get("/todos", getTodos)

router.post("/add-todo", addTodo)

router.post("/edit-todo", updateTodo)

router.post("/delete-todo", deleteTodo)

export default router
