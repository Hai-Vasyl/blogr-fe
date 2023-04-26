import React from "react";
import { WithStyles } from "../../../../../../../helpers/with-styles";
import styles from "./field-select-option.module.scss";

interface FieldSelectOptionProps {
  value: string;
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSelected: boolean;
}

const FieldSelectOption = WithStyles<FieldSelectOptionProps>(
  ({ value, label, styles, onClick, isSelected }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={styles.getClass(
          "select-option",
          isSelected && "select-option--selected"
        )}
        data-value={value}
        key={value}
      >
        {label}
      </button>
    );
  },
  styles
);

export default FieldSelectOption;
