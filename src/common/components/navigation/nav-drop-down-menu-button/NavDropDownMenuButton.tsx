import React, { useState } from "react"
import { WithStyles } from "../../../helpers/with-styles"
import NavDropDownLink from "../nav-drop-down-link/NavDropDownLink"
import NavDropDownButton from "../nav-drop-down-button/NavDropDownButton"
import styles from "./nav-drop-down-menu-button.module.scss"

interface Option {
  to?: string
  label: string
  onClick?: () => void
}

interface NavDropDownMenuButtonProps {
  children: React.ReactNode
  options: Option[]
}

const NavDropDownMenuButton = WithStyles<NavDropDownMenuButtonProps>(
  ({ children, options, styles }) => {
    const [isActive, setIsActive] = useState(false)

    const handleSetIsActiveDropDown = () => {
      setIsActive((prevIsActive) => !prevIsActive)
    }

    const dropDownOptions = options.map((option) => {
      return "to" in option ? (
        <NavDropDownLink
          onClick={handleSetIsActiveDropDown}
          to={option.to!}
          label={option.label}
          key={option.to}
        />
      ) : (
        <NavDropDownButton
          onClick={() => {
            handleSetIsActiveDropDown()
            option.onClick?.()
          }}
          label={option.label}
          key={option.label}
        />
      )
    })

    return (
      <div
        className={styles.getClass(
          "nav-drop-down-menu-button",
          isActive && "nav-drop-down-menu-button--active"
        )}
      >
        <button
          onClick={handleSetIsActiveDropDown}
          className={styles.getClass("nav-drop-down-menu-button__button")}
        >
          {children}
        </button>
        <div className={styles.getClass("nav-drop-down-menu-button__options")}>
          <span
            className={styles.getClass("nav-drop-down-menu-button__triangle")}
          ></span>
          {dropDownOptions}
        </div>
      </div>
    )
  },
  styles
)

export default NavDropDownMenuButton
