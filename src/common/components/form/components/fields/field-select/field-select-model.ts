import { FieldArgs, FieldModel } from "../field-model";
import FieldSelect from "./FieldSelect";

export interface FieldSelectOption {
  label: string;
  value: string;
}

interface FieldSelectArgs extends FieldArgs {
  options: FieldSelectOption[];
}

export class FieldSelectModel extends FieldModel {
  public options: FieldSelectOption[];

  public constructor(fieldSelectArgs: FieldSelectArgs) {
    super(fieldSelectArgs);
    this.options = fieldSelectArgs.options;
    this.value = fieldSelectArgs.value
      ? fieldSelectArgs.value
      : fieldSelectArgs.options?.[0]?.value || "";
  }

  public getComponent() {
    return FieldSelect;
  }
}
