import { WithStyles } from "../../../../helpers/with-styles"
import {
  FormContainerComponentRaw,
  FormMappedState,
} from "../classes/form-state"
import styles from "./form-container.module.scss"
import Loader from "../../../loader/Loader"
import { SetFormValueType } from "../../hooks/useForm"

interface FormContainerProps {
  container: FormContainerComponentRaw
  formState: FormMappedState
  setFormValue: SetFormValueType
  isLoading: boolean
  activeGroup?: string
}

const FormContainer = WithStyles<FormContainerProps>(
  ({ container, formState, setFormValue, activeGroup, isLoading, styles }) => {
    const title = formState[container.property].label

    const fields = container.fields.map(({ Component, property }) => {
      const fieldProps = formState[container.property].fields[property]

      const setValue = (value: string) => {
        setFormValue(container.property, property, value)
      }

      let hidden = true

      if (!activeGroup || fieldProps.groups.includes(activeGroup)) {
        hidden = false
      }

      return (
        <Component
          {...fieldProps}
          setValue={setValue}
          key={property}
          hidden={hidden}
          styles={styles.cascade}
        />
      )
    })

    return (
      <div className={styles.getClass("form-container")}>
        <h3 className={styles.getClass("form-container__title")}>{title}</h3>
        <div className={styles.getClass("form-container__fields")}>
          <Loader active={isLoading} />
          {fields}
        </div>
      </div>
    )
  },
  styles
)

export default FormContainer
