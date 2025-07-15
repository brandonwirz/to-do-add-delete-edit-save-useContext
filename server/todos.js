import express, { Router } from "express"
const todos = []
const router = express.Router()
console.log("test 1")
router.get("/", (req, res) => {
  res.send(todos)
})

export default router
