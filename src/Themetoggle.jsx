import ThemeContext from "./ThemeContext"
import { useContext } from "react"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  // function ToggleTheme() {
  //   toggleTheme((prevTheme) => !prevTheme)
  // }

  console.log(theme)

  return (
    <div>
      <div className={`app space ${theme} ? "light": ""`}>
        <div className="toggler">
          <p className="toggler--light"></p>
          <div className="toggler--slider" onClick={toggleTheme}>
            <div className="toggler--slider--circle">
              {/* Switch to {theme === "light" ? "Dark" : "Light"} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle
