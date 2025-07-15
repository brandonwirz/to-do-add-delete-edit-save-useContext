import express from "express"
import todos from "./todos.js"
// const express = require("express")
const app = express()
const port = 3000

app.use("/todos", todos)

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
