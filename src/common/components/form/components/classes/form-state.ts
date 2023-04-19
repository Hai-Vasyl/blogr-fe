import {
  Field,
  FormInitialState,
  FormStateContainerName,
  FormStateFieldName,
} from "../fields/interfaces"

export type FieldState = Omit<Field, "getComponent">
export type ContainerState = {
  label: FormInitialState["title"]
}

type FieldMappedState = {
  [key: FormStateFieldName]: FieldState
}

export type FormMappedState = {
  [key: FormStateContainerName]: {
    label: FormInitialState["title"]
    fields: FieldMappedState
  }
}

interface FieldComponentRaw {
  property: FormStateFieldName
  Component: React.FC<any>
}

export interface FormContainerComponentRaw {
  property: FormStateContainerName
  fields: FieldComponentRaw[]
}

export class FormState {
  public mappedState: FormMappedState
  private components: FormContainerComponentRaw[]

  public constructor(state: FormInitialState | FormInitialState[]) {
    state = Array.isArray(state) ? state : [state]

    this.mappedState = state.reduce(
      (accumulatorForm: FormMappedState, formContainer) => {
        accumulatorForm[formContainer.property] = {
          label: formContainer.title,
          fields: formContainer.fields.reduce(
            (
              accumulatorField: FieldMappedState,
              { getComponent, ...field }
            ) => {
              accumulatorField[field.property] = field
              return accumulatorField
            },
            {}
          ),
        }
        return accumulatorForm
      },
      {}
    )

    this.components = state.map(({ fields, property }) => {
      return {
        property,
        fields: fields.map(({ property, getComponent }) => ({
          Component: getComponent(),
          property,
        })),
      }
    })
  }

  public getFormState(): FormMappedState {
    return this.mappedState
  }

  public getFormComponents(): FormContainerComponentRaw[] {
    return this.components
  }
}
