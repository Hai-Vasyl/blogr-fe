import React from "react"
import styles from "./test.module.scss"

const Test: React.FC = () => {
  return (
    <div className={styles["test"]}>
      <div className={styles["test__name"]}>name</div>
      <div className={styles["test__description"]}>description</div>
    </div>
  )
}

export default Test
