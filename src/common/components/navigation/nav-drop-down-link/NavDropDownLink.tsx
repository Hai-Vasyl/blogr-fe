import React from "react"
import { WithStyles } from "../../../helpers/with-styles"
import styles from "./nav-drop-down-link.module.scss"
import { NavLink } from "react-router-dom"

interface NavDropDownLinkProps {
  to: string
  label: string
  onClick: () => void
}

const NavDropDownLink = WithStyles<NavDropDownLinkProps>(
  ({ to, label, onClick, styles }) => {
    return (
      <NavLink
        onClick={onClick}
        className={({ isActive }) =>
          styles.getClass(
            "nav-drop-down-link",
            isActive && "nav-drop-down-link--active"
          )
        }
        to={to}
        end
      >
        {label}
      </NavLink>
    )
  },
  styles
)

export default NavDropDownLink
