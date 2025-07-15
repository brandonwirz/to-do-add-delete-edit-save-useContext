import ThemeContext from "./ThemeContext"
import { useContext } from "react"
// import ThemeToggle from "./Themetoggle"

const PageContent = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`app space ${theme}`}>
      <p>{theme === "light" ? "Light" : "Dark"} </p>
      {/* <ThemeToggle /> */}
    </div>
  )
}
export default PageContent
