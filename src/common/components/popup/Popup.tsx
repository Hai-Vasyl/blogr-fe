import React from "react"
import styles from "./popup.module.scss"
import useStore from "../../hooks/useStore"
import { deactivatePopup } from "./popup-slice"
import { WithStyles } from "../../helpers/with-styles"

interface PopupProps {}

const Popup = WithStyles<PopupProps>(({ styles }) => {
  const {
    state: {
      popup: { Component, isActive },
    },
    dispatch,
  } = useStore()

  const handleDeactivatePopup = () => {
    dispatch(deactivatePopup())
  }

  const handleStopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  return (
    <div
      className={styles.getClass("popup", isActive && "popup--active")}
      onClick={handleDeactivatePopup}
    >
      <div
        className={styles.getClass("popup__window")}
        onClick={handleStopPropagation}
      >
        {<Component />}
      </div>
    </div>
  )
}, styles)

export default Popup
