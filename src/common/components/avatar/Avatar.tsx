import React from "react"
import { WithStyles } from "../../helpers/with-styles"
import styles from "./avatar.module.scss"

interface AvatarProps {
  color: string
  image?: string
}

const Avatar = WithStyles<AvatarProps>(({ color, image, styles }) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className={styles.getClass("avatar")}
    >
      {image && (
        <img
          className={styles.getClass("avatar__image")}
          src={image}
          alt='User avatar image'
        />
      )}
    </span>
  )
}, styles)

export default Avatar
