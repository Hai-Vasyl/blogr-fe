import React, { useState } from "react";
import { WithStyles } from "../../../../../helpers/with-styles";
import Icon from "../../../../icon/Icon";
import FieldLabelMessageContainer from "../field-label-message-container/FieldLabelMessageContainer";
import { FieldProps } from "../interfaces";
import { FieldSelectOption as FieldSelectOptionType } from "./field-select-model";
import styles from "./field-select.module.scss";
import FieldSelectOption from "./components/field-select-option/FieldSelectOption";

interface FieldSelectProps extends FieldProps {
  options: FieldSelectOptionType[];
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
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const handleToggleDropdownMenu = () => {
      setIsDropdownActive((prevIsDropdownActive) => !prevIsDropdownActive);
    };

    const handleChangeFieldSelect = (event: any) => {
      setValue(event.target.dataset.value);
      handleToggleDropdownMenu();
    };

    const selectOptions = options.map((option) => (
      <FieldSelectOption
        key={option.value}
        value={option.value}
        label={option.label}
        onClick={handleChangeFieldSelect}
        isSelected={option.value === value}
      />
    ));

    const selectedOption = options.find((option) => option.value === value);

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
              type="button"
              onClick={handleToggleDropdownMenu}
              className={styles.getClass(
                "select__button",
                message && "select__button--error"
              )}
            >
              <span className={styles.getClass("select__label")}>
                {selectedOption?.label || "..."}
              </span>
              <span className={styles.getClass("select__icon")}>
                <Icon name="expand_more" styles={styles.cascade} />
              </span>
            </button>
            <div className={styles.getClass("select__options")}>
              {selectOptions.length ? (
                selectOptions
              ) : (
                <button
                  onClick={handleToggleDropdownMenu}
                  type="button"
                  className={styles.getClass("select__empty-options-label")}
                >
                  Empty
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  styles
);

export default FieldSelect;
