import React from "react"
import { WithStyles } from "../../helpers/with-styles"
import styles from "./form.module.scss"
import { GetContainersType } from "./hooks/useForm"

interface FormProps {
  children: React.ReactNode
  getContainers: GetContainersType
  onSubmit?: () => Promise<void> | void
  isLoading?: boolean
}

const Form = WithStyles<FormProps>(
  ({
    onSubmit = () => {},
    getContainers,
    isLoading = false,
    children,
    styles,
  }) => {
    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit()
    }

    const containers = getContainers(styles.cascade, isLoading)

    return (
      <form className={styles.getClass("form")} onSubmit={handleSubmitForm}>
        <div className={styles.getClass("form__container")}>{containers}</div>
        <div className={styles.getClass("form__buttons")}>{children}</div>
      </form>
    )
  },
  styles
)

export default Form
