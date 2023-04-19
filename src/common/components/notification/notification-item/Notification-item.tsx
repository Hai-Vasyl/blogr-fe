import { WithStyles } from "../../../helpers/with-styles"
import styles from "./notification-item.module.scss"
import useStore from "../../../hooks/useStore"
import Icon from "../../icon/Icon"
import { NotificationTypes } from "../notification-type.enum"
import { shiftNotificationById } from "../notification-slice"

interface NotificationItemProps {
  id: string
  message: string
  type: NotificationTypes
}

const NotificationItem = WithStyles<NotificationItemProps>(
  ({ id, message, type, styles }) => {
    const { dispatch } = useStore()

    const icons = {
      [NotificationTypes.ERROR]: {
        icon: "error",
        class: "notification-item--error",
      },
      [NotificationTypes.INFO]: {
        icon: "info",
        class: "notification-item--info",
      },
      [NotificationTypes.SUCCESS]: {
        icon: "check_circle",
        class: "notification-item--success",
      },
      [NotificationTypes.WARNING]: {
        icon: "warning",
        class: "notification-item--warning",
      },
    }

    const handleDeactivateNotification = () => {
      dispatch(shiftNotificationById(id))
    }

    return (
      <div
        className={styles.getClass("notification-item", icons[type].class)}
        onClick={handleDeactivateNotification}
      >
        <span className={styles.getClass("notification-item__icon")}>
          <Icon name={icons[type].icon} styles={styles.cascade} />
        </span>
        <span className={styles.getClass("notification-item__message")}>
          {message}
        </span>
      </div>
    )
  },
  styles
)

export default NotificationItem
