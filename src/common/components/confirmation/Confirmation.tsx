import React from "react"
import { WithStyles } from "../../helpers/with-styles"
import styles from "./confirmation.module.scss"
import useStore from "../../hooks/useStore"
import Button from "../buttons/button/Button"
import ButtonLight from "../buttons/button-light/ButtonLight"
import { deactivateConfirmation } from "./confirmation-slice"

interface ConfirmationProps {}

const Confirmation = WithStyles<ConfirmationProps>(({ styles }) => {
  const {
    dispatch,
    state: {
      confirmation: { title, description, isActive, onAccept },
    },
  } = useStore()

  const handleAcceptConfirmation = () => {
    onAccept()
    dispatch(deactivateConfirmation())
  }

  const handleCancelConfirmation = () => {
    dispatch(deactivateConfirmation())
  }

  const handleStopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  return (
    <div
      className={styles.getClass(
        "confirmation",
        isActive && "confirmation--active"
      )}
      onClick={handleCancelConfirmation}
    >
      <div
        className={styles.getClass("confirmation__frame")}
        onClick={handleStopPropagation}
      >
        <h4 className={styles.getClass("confirmation__title")}>{title}</h4>
        <p className={styles.getClass("confirmation__description")}>
          {description}
        </p>
        <div className={styles.getClass("confirmation__buttons")}>
          <Button label='Accept' onClick={handleAcceptConfirmation} />
          <ButtonLight label='Cancel' onClick={handleCancelConfirmation} />
        </div>
      </div>
    </div>
  )
}, styles)

export default Confirmation
