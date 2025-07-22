import express, { Router } from "express"
import { v4 as uuidv4 } from "uuid"

let todos = [
  //   { id: "1", text: "Go shopping" },
  //   { id: "2", text: "Wash dishes" },
  //   { id: "3", text: "Study for the exam" },
  //   { id: "4", text: "Practice React" },
]
const router = express.Router()
console.log("test 1")
router.get("/", (req, res) => {
  res.send(todos)
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  console.log(id)
  todos = todos.filter((item) => {
    return item.id !== id
  })
  console.log(todos)
  res.status(200).json({ message: `Item ${id} deleted` })
})

router.put("/:id", (req, res) => {
  const { id } = req.params
  // console.log(req.body, "the body")
  const { text } = req.body
  // console.log(todos)
  // console.log(id)
  const todo = todos.findIndex((t) => t.id === id)
  todos.splice(todo, 1, req.body)
  // console.log(todo, "found todo")
  if (todo !== -1) {
    todos[todo].text = text
    res.status(200).json({ data: todos[todo] })
  } else {
    // console.log(todos)
    // console.log(id)
    // console.log(todo)
    res.status(404).json({ message: `Todo not found` })
  }
})

router.post("/", (req, res) => {
  console.log(req.body)
  const withUuid = { ...req.body, id: uuidv4() }
  todos.push(withUuid)
  console.log(todos)
  res.status(200).json({ data: withUuid, message: "New todo" })
})

export default router
