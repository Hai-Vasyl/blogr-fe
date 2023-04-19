import { WithStyles } from "../../../../../helpers/with-styles"
import Icon from "../../../../icon/Icon"
import styles from "./field-message.module.scss"
import { MessageAlignments } from "./message-alignment.enum"

interface FieldMessageProps {
  message: string
  alignment?: MessageAlignments
}

const FieldMessage = WithStyles<FieldMessageProps>(
  ({ message, alignment = MessageAlignments.LEFT, styles }) => {
    return (
      <div
        className={styles.getClass(
          "field-message",
          message && "field-message--active"
        )}
      >
        <div className={styles.getClass("field-message__icon")}>
          <Icon name='info' styles={styles.cascade} />
          <span className={styles.getClass("field-message__triangle")}></span>
        </div>
        <p
          className={styles.getClass(
            "field-message__message",
            alignment === MessageAlignments.RIGHT &&
              "field-message__message--right"
          )}
        >
          {message}
        </p>
      </div>
    )
  },
  styles
)

export default FieldMessage
