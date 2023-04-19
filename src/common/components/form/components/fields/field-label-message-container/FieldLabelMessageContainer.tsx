import React from "react"
import { WithStyles } from "../../../../../helpers/with-styles"
import FieldLabel from "../field-label/FieldLabel"
import FieldMessage from "../field-message/FieldMessage"
import { MessageAlignments } from "../field-message/message-alignment.enum"
import styles from "./field-label-message-container.module.scss"

interface FieldLabelMessageContainerProps {
  important: boolean
  label: string
  message: string
  alignment?: MessageAlignments
}

const FieldLabelMessageContainer = WithStyles<FieldLabelMessageContainerProps>(
  ({ label, message, important, alignment, styles }) => {
    return (
      <div className={styles.getClass("field-label-message-container")}>
        <FieldLabel
          important={important}
          label={label}
          styles={styles.cascade}
        />
        <FieldMessage
          message={message}
          alignment={alignment}
          styles={styles.cascade}
        />
      </div>
    )
  },
  styles
)

export default FieldLabelMessageContainer
