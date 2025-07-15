import { useState, useContext } from "react"
import ThemeContext from "./ThemeContext"
import Task from "./Task"
import Themetoggle from "./Themetoggle"
import PageContent from "./PageContent"
import data from "./data"
import "./index.css"

export default function App() {
  const { theme } = useContext(ThemeContext)

  //STATE
  const [items, setItems] = useState(data)
  const [newItem, setNewItem] = useState("")

  //SUBMIT AND HANDLE FUNCTIONS
  function handleChange(e) {
    setNewItem(e.target.value)
  }

  function handleSubmit(e) {
    // console.log(handleSubmit)
    e.preventDefault()
    if (newItem === "") return
    setItems([...items, { text: newItem, id: Math.ceil(Math.random() * 1000) }])
    setNewItem("")
  }

  function handleDelete(index) {
    setItems((prevItems) => {
      return prevItems.filter((item, i) => i !== index)
    })
  }

  function handleSave(index, update) {
    setItems((prevItems) => {
      return prevItems.map((item, i) => (i === index ? update : item))
    })
  }

  const itemList = items.map((item, i) => (
    <Task
      key={i}
      task={item}
      handleDelete={() => handleDelete(i)}
      handleSave={(editText) => handleSave(i, editText)}
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
            text="type"
            onChange={handleChange}
          />
          <button>submit</button>
        </form>
        {itemList}
      </div>
    </div>
  )
}
