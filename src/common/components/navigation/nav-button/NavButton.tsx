import React from "react"
import { WithStyles } from "../../../helpers/with-styles"
import stylesNavLink from "../nav-link/nav-link.module.scss"
import styles from "./nav-button.module.scss"
import Icon from "../../icon/Icon"

interface NavLinkProps {
  icon: string
  label: string
  onClick: () => void
}

const NavButton = WithStyles<NavLinkProps>(
  ({ icon, label, onClick, styles }) => {
    return (
      <button className={styles.getClass("nav-link")} onClick={onClick}>
        <Icon name={icon} styles={styles.cascade} />
        <span className={styles.getClass("nav-link__label")}>
          <span className={styles.getClass("nav-link__triangle")}></span>
          {label}
        </span>
      </button>
    )
  },
  [stylesNavLink, styles]
)

export default NavButton
