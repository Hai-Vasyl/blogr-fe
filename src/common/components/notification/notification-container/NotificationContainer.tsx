import { useEffect } from "react"
import { WithStyles } from "../../../helpers/with-styles"
import NotificationItem from "../notification-item/Notification-item"
import useStore from "../../../hooks/useStore"
import { shiftNotification } from "../notification-slice"
import styles from "./notification-container.module.scss"

const NotificationContainer = WithStyles(({ styles }) => {
  const {
    dispatch,
    state: {
      notification: { list },
    },
  } = useStore()

  useEffect(() => {
    if (list.length) {
      setTimeout(() => {
        dispatch(shiftNotification())
      }, 3000)
    }
  }, [list])

  const notifications = list.map(({ id, message, type }) => (
    <NotificationItem id={id} message={message} type={type} key={id} />
  ))

  return (
    <div className={styles.getClass("notification-container")}>
      {notifications}
    </div>
  )
}, styles)

export default NotificationContainer
