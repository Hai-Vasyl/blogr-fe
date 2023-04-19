import { WithStyles } from "../../helpers/with-styles"
import styles from "./loader.module.scss"

interface LoaderProps {
  active: boolean
}

const Loader = WithStyles<LoaderProps>(({ active, styles }) => {
  return active ? (
    <div className={styles.getClass("loader")}>
      <span className={styles.getClass("loader__spin")}></span>
    </div>
  ) : null
}, styles)

export default Loader
