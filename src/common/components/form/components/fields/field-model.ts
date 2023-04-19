import { ComponentAndStylesProps } from "../../../../helpers/with-styles"

export interface FieldArgs {
  value?: string
  property: string
  label: string
  important?: boolean
  disabled?: boolean
  groups?: string[]
}

export abstract class FieldModel {
  public message: string = ""
  public value: string
  public property: string
  public label: string
  public important: boolean
  public disabled: boolean = true
  public groups: string[]

  public constructor(fieldArgs: FieldArgs) {
    this.property = fieldArgs.property
    this.label = fieldArgs.label
    this.value = fieldArgs.value || ""
    this.important = fieldArgs.important || false
    this.disabled = fieldArgs.disabled || false
    this.groups = fieldArgs.groups || []
  }

  public abstract getComponent(): (
    props: ComponentAndStylesProps<any>
  ) => React.ReactElement<any, any> | null
}
