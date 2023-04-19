import { WithStyles } from "../../../../../helpers/with-styles"
import styles from "./field-label.module.scss"

interface FieldLabelProps {
  label: string
  important: boolean
}

const FieldLabel = WithStyles<FieldLabelProps>(
  ({ label, important, styles }) => {
    return (
      <label className={styles.getClass("field-label")}>
        {label}
        {important && (
          <span className={styles.getClass("field-label__important")}>*</span>
        )}
      </label>
    )
  },
  styles
)

export default FieldLabel
