import { WithStyles } from "../../../helpers/with-styles";
import Icon from "../../icon/Icon";
import { ButtonTypes } from "../button-type.enum";
import styles from "./button.module.scss";

interface ButtonProps {
  label?: string;
  icon?: string;
  type?: ButtonTypes;
  disabled?: boolean;
  onClick?: () => Promise<void> | void;
}

const Button = WithStyles<ButtonProps>(
  ({
    onClick = () => {},
    label,
    icon,
    type = ButtonTypes.BUTTON,
    disabled = false,
    styles,
  }) => {
    return (
      <button
        className={styles.getClass("button", disabled && "button--disabled")}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {icon && <Icon name={icon} styles={styles.cascade} />}
        {label && (
          <span className={styles.getClass("button__name")}>
            {label.toUpperCase()}
          </span>
        )}
      </button>
    );
  },
  styles
);

export default Button;
