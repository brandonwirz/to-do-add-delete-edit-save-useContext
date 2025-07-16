import express, { Router } from "express"

let todos = [
  { id: "1", text: "Go shopping" },
  { id: "2", text: "Wash dishes" },
  { id: "3", text: "Study for the exam" },
  { id: "4", text: "Practice React" },
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
  console.log(req.body)
  const { text } = req.body

  const todo = todos.find((t) => t.id === id)
  todos.splice(todo, 1, req.body)
  console.log("todo")
  if (todo) {
    todo.text = text ?? todo.text
    res.status(200).json(todo)
  } else {
    res.status(404).json({ message: "Todo not found" })
  }
})

router.post("/", (req, res) => {
  console.log(req.body)
  todos.push(req.body)
  res.status(200).json({ message: `New Item has been posted` })
})

export default router
