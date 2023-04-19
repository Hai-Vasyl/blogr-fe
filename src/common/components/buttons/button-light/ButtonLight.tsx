import React from "react"
import { WithStyles } from "../../../helpers/with-styles"
import Button from "../button/Button"
import { ButtonTypes } from "../button-type.enum"
import styles from "./button-light.module.scss"

interface ButtonLightProps {
  label?: string
  icon?: string
  type?: ButtonTypes
  disabled?: boolean
  onClick?: () => Promise<void> | void
}

const ButtonLight = WithStyles<ButtonLightProps>(
  ({ label, icon, type, disabled, onClick, styles }) => {
    return (
      <Button
        onClick={onClick}
        label={label}
        icon={icon}
        type={type}
        disabled={disabled}
        styles={styles.cascade}
      />
    )
  },
  styles
)

export default ButtonLight
