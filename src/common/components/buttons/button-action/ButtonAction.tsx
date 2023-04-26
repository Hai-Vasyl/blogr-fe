import { WithStyles } from "../../../helpers/with-styles";
import Icon from "../../icon/Icon";
import styles from "./button-action.module.scss";

interface ButtonActionProps {
  label?: string;
  icon: string;
  disabled?: boolean;
  onClick?: () => Promise<void> | void;
}

const ButtonAction = WithStyles<ButtonActionProps>(
  ({ label, icon, disabled = false, onClick, styles }) => {
    return (
      <button
        className={styles.getClass(
          "button-action",
          disabled && "button-action--disabled"
        )}
        type="button"
        disabled={disabled}
        onClick={onClick}
      >
        <Icon styles={styles.cascade} name={icon} />
        <span className={styles.getClass("button-action__label")}>{label}</span>
      </button>
    );
  },
  styles
);

export default ButtonAction;
