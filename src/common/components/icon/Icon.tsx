import React from "react"
import { WithStyles } from "../../helpers/with-styles"
import styles from "./icon.module.scss"

interface IconProps {
  name: string
}

const Icon = WithStyles<IconProps>(({ name, styles }) => {
  return (
    <span className={`material-symbols-outlined ${styles.getClass("icon")}`}>
      {name}
    </span>
  )
}, styles)

export default Icon
