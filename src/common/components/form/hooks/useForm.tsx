import { useState } from "react"
import { Style } from "../../../classes/cascade-styles"
import FormContainer from "../components/form-container/FormContainer"
import {
  FormState,
  FieldState,
  ContainerState,
} from "../components/classes/form-state"
import {
  FormInitialState,
  FormStateContainerName,
  FormStateFieldName,
} from "../components/fields/interfaces"
import { FieldErrorMapped } from "../../../hooks/useErrorHandler"

interface UseFormProps {
  state: FormInitialState | FormInitialState[]
  group?: string
}

interface SetFieldOptions {
  container: FormStateContainerName
  field: FormStateFieldName
}

type ActiveFormValues = {
  [key: string]: {
    [key: string]: string
  }
}

export type GetContainersType = (
  styles: Style[],
  isLoading: boolean
) => JSX.Element[]

export type SetFormValueType = (
  container: FormStateContainerName,
  property: FormStateFieldName,
  value: string
) => void

const useForm = ({ state, group }: UseFormProps) => {
  const form = new FormState(state)

  const [activeGroup, setActiveGroup] = useState<string | undefined>(group)
  const [formState, setFormState] = useState(form.getFormState())

  const setContainer = (
    setState: (prevState: ContainerState) => ContainerState,
    container?: FormStateContainerName
  ) => {
    const containerName = container || Object.keys(formState)[0]

    setFormState((prevForm) => ({
      ...prevForm,
      [containerName]: {
        ...prevForm[containerName],
        ...setState({ label: prevForm[containerName].label }),
      },
    }))
  }

  const setField = (
    setState: (prevState: FieldState) => FieldState,
    options: SetFieldOptions | FormStateFieldName
  ) => {
    const isOptionFieldName = typeof options === "string"

    let containerName: FormStateContainerName
    let fieldName: FormStateFieldName

    if (isOptionFieldName) {
      containerName = Object.keys(formState)[0]
      fieldName = options
    } else {
      containerName = options.container
      fieldName = options.field
    }

    setFormState((prevForm) => ({
      ...prevForm,
      [containerName]: {
        ...prevForm[containerName],
        fields: {
          ...prevForm[containerName].fields,
          [fieldName]: setState(prevForm[containerName].fields[fieldName]),
        },
      },
    }))
  }

  const setFormValue = (
    container: FormStateContainerName,
    field: FormStateFieldName,
    value: string
  ) => {
    setField((prev) => ({ ...prev, value, message: "" }), { container, field })
  }

  const setErrors = (errors?: FieldErrorMapped) => {
    setFormState((prevFormState) =>
      Object.fromEntries(
        Object.entries(prevFormState).map(([containerKey, containerValue]) => {
          return [
            containerKey,
            {
              ...containerValue,
              fields: Object.fromEntries(
                Object.entries(containerValue.fields).map(
                  ([fieldKey, fieldValue]) => {
                    return [
                      fieldKey,
                      {
                        ...fieldValue,
                        message: errors ? errors[fieldKey] : "",
                      },
                    ]
                  }
                )
              ),
            },
          ]
        })
      )
    )
  }

  const getContainers = (styles: Style[], isLoading: boolean) =>
    form
      .getFormComponents()
      .map((container) => (
        <FormContainer
          container={container}
          formState={formState}
          setFormValue={setFormValue}
          activeGroup={activeGroup}
          key={container.property}
          styles={styles}
          isLoading={isLoading}
        />
      ))

  const activeFormValues: ActiveFormValues = Object.fromEntries(
    Object.entries(formState).map(([containerKey, containerValue]) => {
      return [
        containerKey,
        Object.fromEntries(
          Object.entries(containerValue.fields).reduce(
            (accumulator: Array<[string, string]>, [fieldKey, fieldValue]) => {
              if (!activeGroup || fieldValue.groups.includes(activeGroup)) {
                accumulator.push([fieldKey, fieldValue.value])
              }

              return accumulator
            },
            []
          )
        ),
      ]
    })
  )

  return {
    formValues: activeFormValues,
    group: activeGroup,
    setGroup: setActiveGroup,
    form: formState,
    setForm: setFormState,
    setField,
    getContainers,
    setContainer,
    setErrors,
  }
}

export default useForm
