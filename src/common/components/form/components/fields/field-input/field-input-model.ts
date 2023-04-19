import { FieldArgs, FieldModel } from "../field-model"
import { FieldInputTypes } from "./field-input-type.enum"
import FieldInput from "./FieldInput"

interface FieldInputArgs extends FieldArgs {
  type?: FieldInputTypes
}

export class FieldInputModel extends FieldModel {
  public type: FieldInputTypes

  public constructor(fieldInputArgs: FieldInputArgs) {
    super(fieldInputArgs)
    this.type = fieldInputArgs.type || FieldInputTypes.TEXT
  }

  public getComponent() {
    return FieldInput
  }
}
