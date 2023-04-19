import { FieldInputModel } from "./field-input/field-input-model"
import { FieldSelectModel } from "./field-select/field-select-model"

export type Field = FieldInputModel | FieldSelectModel

export interface FieldProps {
  label: string
  value: string
  message: string
  hidden: boolean
  important: boolean
  disabled: boolean
  setValue: (value: string) => void
}

export interface FormInitialState {
  title: string
  property: string
  fields: Field[]
}

export type FormStateContainerName = FormInitialState["property"]
export type FormStateFieldName = Field["property"]
