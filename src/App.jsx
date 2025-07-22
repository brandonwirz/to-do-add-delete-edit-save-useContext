import { useState, useContext, useEffect } from "react"
import ThemeContext from "./ThemeContext"
import Task from "./Task"
import Themetoggle from "./Themetoggle"
import PageContent from "./PageContent"
import axios from "axios"
// import data from "./data"

import "./index.css"

export default function App() {
  const { theme } = useContext(ThemeContext)

  //STATE
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState("")

  useEffect(() => {
    const fetchData = async function () {
      try {
        const response = await axios.get("/api/todos")
        if (response.statusText !== "OK") {
          throw new Error(response.status)
        }
        // const result = await response.json()
        setItems(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  //SUBMIT AND HANDLE FUNCTIONS
  function handleChange(e) {
    setNewItem(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === "") return
    const newObj = { text: newItem }
    axios
      .post("/api/todos", newObj)
      .then((res) => {
        console.log(res.body, "new object")
        console.dir(res)
        setItems([...items, res.data.data])
        setNewItem("")
      })
      .catch((error) => {
        console.error("Error creating todo:", error)
        alert("Error creating todo. Please try again.")
      })
  }

  function handleDelete(id) {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
      })
      .catch((error) => {
        console.error("Error deleting todo:", error)
      })
  }

  function handleSave(updatedItem) {
    const index = items.findIndex((item) => item.id === updatedItem.id)
    axios
      .put(`/api/todos/${updatedItem.id}`, updatedItem)
      .then((response) => {
        const newItem = response.data.data
        setItems((prevItems) =>
          prevItems.map((item, i) => (i === index ? newItem : item))
        )
      })
      .catch((error) => {
        alert("Error updating new item", error)
      })
  }
  const itemList = items.map((item) => (
    <Task
      key={item.id}
      task={item}
      handleDelete={() => handleDelete(item.id)}
      handleSave={handleSave}
    />
  ))

  return (
    <div className="container">
      <div className={`app ${theme}`}>
        <Themetoggle />
        <PageContent />
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Add a todo..."
            value={newItem}
            type="text"
            onChange={handleChange}
          />
          <button type="submit">Add Todo</button>
        </form>
        {itemList}
      </div>
    </div>
  )
}
