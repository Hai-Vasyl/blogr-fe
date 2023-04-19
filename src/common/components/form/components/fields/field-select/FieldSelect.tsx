import React, { useState } from "react"
import { WithStyles } from "../../../../../helpers/with-styles"
import Icon from "../../../../icon/Icon"
import FieldLabelMessageContainer from "../field-label-message-container/FieldLabelMessageContainer"
import { FieldProps } from "../interfaces"
import { FieldSelectOption } from "./field-select-model"
import styles from "./field-select.module.scss"

interface FieldSelectProps extends FieldProps {
  options: FieldSelectOption[]
}

const FieldSelect = WithStyles<FieldSelectProps>(
  ({
    label,
    message,
    options,
    value,
    hidden,
    important,
    setValue,
    disabled,
    styles,
  }) => {
    const [isDropdownActive, setIsDropdownActive] = useState(false)

    const handleToggleDropdownMenu = () => {
      setIsDropdownActive((prevIsDropdownActive) => !prevIsDropdownActive)
    }

    const handleChangeFieldSelect = (event: any) => {
      setValue(event.target.dataset.value)
      handleToggleDropdownMenu()
    }

    const selectOptions = options.map((option) => (
      <button
        type='button'
        onClick={handleChangeFieldSelect}
        className={styles.getClass(
          "select__option",
          option.value === value && "select__option--selected"
        )}
        data-value={option.value}
        key={option.value}
      >
        {option.label}
      </button>
    ))

    const selectedOption = options.find((option) => option.value === value)

    return (
      <div
        className={styles.getClass(
          "field-select",
          disabled && "field-select--disabled",
          hidden && "field-select--hidden"
        )}
      >
        <FieldLabelMessageContainer
          label={label}
          message={message}
          important={important}
        />
        <div className={styles.getClass("field-select__field-container")}>
          <div
            className={styles.getClass(
              "select",
              isDropdownActive && "select--active"
            )}
          >
            <button
              type='button'
              onClick={handleToggleDropdownMenu}
              className={styles.getClass(
                "select__button",
                message && "select__button--error"
              )}
            >
              <span className={styles.getClass("select__label")}>
                {selectedOption?.label}
              </span>
              <span className={styles.getClass("select__icon")}>
                <Icon name='expand_more' styles={styles.cascade} />
              </span>
            </button>
            <div className={styles.getClass("select__options")}>
              {selectOptions}
            </div>
          </div>
          {/* <select
            className={styles.getClass("field-select__select")}
            onChange={handleChangeFieldSelect}
            value={value}
            disabled={disabled}
          >
            {selectOptions}
          </select> */}

          {/* <select
          className={styles.getClass(
            "field-select__field",
            message && "field-select__field--error"
          )}
          type={type}
          onChange={handleChangeFieldInput}
          value={value}
        /> */}
        </div>
      </div>
    )
  },
  styles
)

export default FieldSelect
