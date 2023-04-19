import React from "react"
import { WithStyles } from "../../../helpers/with-styles"
import stylesNavDropDownLink from "./../nav-drop-down-link/nav-drop-down-link.module.scss"
import styles from "./nav-drop-down-button.module.scss"

interface NavDropDownButtonProps {
  label: string
  onClick: () => void
}

const NavDropDownButton = WithStyles<NavDropDownButtonProps>(
  ({ label, onClick, styles }) => {
    return (
      <button
        className={styles.getClass("nav-drop-down-link")}
        onClick={onClick}
      >
        {label}
      </button>
    )
  },
  [stylesNavDropDownLink, styles]
)

export default NavDropDownButton
