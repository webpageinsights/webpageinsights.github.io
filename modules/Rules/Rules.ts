export interface Rule {
  id?: number
  level: 'info' | 'warning' | 'danger'
  length: 'any' | 'none' | 'one' | 'some'
  selector: string
  category?: 'images' | 'headings' | 'metadata' | 'pwa' | 'structure' | string
}

export type AttributeRule<T extends string | number = string> = Rule & {
  attribute: string
  method: 'isEqual' | 'isNotEqual'
  | 'absoluteUrl'
  | 'minLength' | 'maxLength'
  | 'exists' | 'doesNotExist'
  | 'isNumber' | 'isNotNumber'
  | 'contains' | 'doesNotContain'
  toBe?: T
}
