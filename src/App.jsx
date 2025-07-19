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
    // console.log(handleSubmit)
    e.preventDefault()
    if (newItem === "") return
    const newObj = { text: newItem, id: "" + Math.ceil(Math.random() * 1000) }
    // setItems([...items, newObj])
    // setNewItem("")
    // const newObj = { text: newItem }
    axios
      .post("/api/todos", newObj)
      .then(() => {
        setItems([...items, newObj])
        setNewItem("")
      })
      .catch((error) => {
        alert("Error creating todo:", error)
      })
  }

  // function handleDelete(index) {
  //   axios
  //     .delete(`/api/todos/${index}`)

  //     .then(() => {
  //       setItems((prevItems) => {
  //         return prevItems.filter((item, i) => i !== index)
  //       })
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting todo:", error)
  //     })
  // }
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
  // function handleSave(index, update) {
  //   // console.log(items[index].id)
  //   axios
  //     .put(`/api/todos/${items[index].id}`, update)

  //     .then((response) => {
  //       const update = response.data
  //       // console.log(response.data)
  //       setItems((prevItems) =>
  //         prevItems.map((item, i) => (i === index ? update : item))
  //       )
  //     })
  //     .catch((error) => {
  //       alert("Error updating new item", error)
  //     })
  // }
  function handleSave(updatedItem) {
    const index = items.findIndex((item) => item.id === updatedItem.id)
    axios
      .put(`/api/todos/${updatedItem.id}`, updatedItem)
      .then((response) => {
        const newItem = response.data
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
