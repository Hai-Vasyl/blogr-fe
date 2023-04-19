import React from "react"
import { WithStyles } from "../../../../../helpers/with-styles"
import FieldLabelMessageContainer from "../field-label-message-container/FieldLabelMessageContainer"
import { FieldProps } from "../interfaces"
import { FieldInputTypes } from "./field-input-type.enum"
import styles from "./field-input.module.scss"

interface FieldInputProps extends FieldProps {
  type: FieldInputTypes
}

const FieldInput = WithStyles<FieldInputProps>(
  ({
    label,
    message,
    type,
    value,
    hidden,
    important,
    setValue,
    disabled,
    styles,
  }) => {
    const handleChangeFieldInput = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setValue(event.target.value)
    }

    return (
      <div
        className={styles.getClass(
          "field-input",
          disabled && "field-input--disabled",
          hidden && "field-input--hidden"
        )}
      >
        <FieldLabelMessageContainer
          label={label}
          message={message}
          important={important}
        />
        <div className={styles.getClass("field-input__field-container")}>
          <input
            className={styles.getClass(
              "field-input__field",
              message && "field-input__field--error"
            )}
            type={type}
            onChange={handleChangeFieldInput}
            value={value}
            disabled={disabled}
          />
        </div>
      </div>
    )
  },
  styles
)

export default FieldInput
