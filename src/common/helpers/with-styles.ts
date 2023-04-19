import React from "react"
import { CascadeStyles, Style } from "../classes/cascade-styles"

export type ComponentAndStylesProps<Props> = Props & {
  styles?: Style[]
}

type ComponentAndCascadeStylesProps<Props> = Props & {
  styles: CascadeStyles
}

export const WithStyles = function <Props>(
  componentConstructor: React.FC<ComponentAndCascadeStylesProps<Props>>,
  baseStyle?: Style | Style[]
) {
  return (props: ComponentAndStylesProps<Props>) => {
    const styles = new CascadeStyles(baseStyle, props.styles)

    return componentConstructor({
      ...props,
      styles,
    })
  }
}
