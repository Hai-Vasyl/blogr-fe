import { FieldArgs, FieldModel } from "../field-model"
import FieldSelect from "./FieldSelect"

export interface FieldSelectOption {
  label: string
  value: string
}

interface FieldSelectArgs extends FieldArgs {
  options: FieldSelectOption[]
}

export class FieldSelectModel extends FieldModel {
  public options: FieldSelectOption[]

  public constructor(fieldSelectArgs: FieldSelectArgs) {
    super(fieldSelectArgs)
    this.options = fieldSelectArgs.options
  }

  public getComponent() {
    return FieldSelect
  }
}
