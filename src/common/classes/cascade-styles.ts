export type Style = {
  [key: string]: string
}

export class CascadeStyles {
  private initStyle?: Style[]
  private cascadeStyles: Style[]

  public constructor(initStyle?: Style | Style[], cascadeStyles: Style[] = []) {
    if (Array.isArray(initStyle)) {
      this.initStyle = initStyle
    } else if (initStyle) {
      this.initStyle = [initStyle]
    }

    this.cascadeStyles = cascadeStyles
  }

  get cascade(): Style[] {
    if (!this.initStyle) {
      return this.cascadeStyles
    }
    return [...this.initStyle, ...this.cascadeStyles]
  }

  public getClass(...classNames: Array<string | boolean>): string {
    return (classNames.filter((classNames) => classNames) as string[])
      .map((className: string) =>
        this.cascade.map((style) => style[className]).join(" ")
      )
      .join(" ")
  }
}
