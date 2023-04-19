import React from "react"
import { WithStyles } from "../../../helpers/with-styles"
import styles from "./nav-link.module.scss"
import { NavLink as NavigationLink } from "react-router-dom"
import Icon from "../../icon/Icon"

interface NavLinkProps {
  to: string
  icon: string
  label: string
}

const NavLink = WithStyles<NavLinkProps>(({ to, icon, label, styles }) => {
  return (
    <NavigationLink
      to={to}
      className={({ isActive }) =>
        styles.getClass("nav-link", isActive && "nav-link--active")
      }
    >
      <Icon name={icon} styles={styles.cascade} />
      <span className={styles.getClass("nav-link__label")}>
        <span className={styles.getClass("nav-link__triangle")}></span>
        {label}
      </span>
    </NavigationLink>
  )
}, styles)

export default NavLink
