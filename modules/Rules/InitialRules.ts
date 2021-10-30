import { Rule, AttributeRule } from '~/modules/Rules/Rules'

// Deve haver um e somente um elemento 'head > title'
const titleRule: Rule = {
  level: 'danger',
  length: 'one',
  category: 'headings',
  selector: 'head > title'
}

// Deve haver um e somente um elemento 'body h1'
const h1Rule: Rule = {
  level: 'danger',
  length: 'one',
  selector: 'body h1',
  category: 'headings'
}

// Deve haver ao menos um elemento 'body h2'
const h2Rule: Rule = {
  level: 'danger',
  length: 'some',
  selector: 'body h2',
  category: 'headings'
}

// Pode haver zero ou mais elementos 'noscript'
const noScriptRule: Rule = {
  level: 'danger',
  length: 'any',
  selector: 'noscript',
  category: 'structure'
}

// Deve haver um e somente um elemento 'head > link[rel='canonical']' com atributo 'href' como url absoluta
const canonicalRule: AttributeRule = {
  level: 'danger',
  length: 'one',
  selector: "head > link[rel='canonical']",
  category: 'metadata',
  attribute: 'href',
  method: 'absoluteUrl'
}

// Recomenda-se a existência de um e somente um elemento 'head > meta[name="description"]' com atributo 'href' com tamanho mínimo de '40'
const metaDescriptionMin: AttributeRule<number> = {
  level: 'warning',
  length: 'one',
  selector: 'head > meta[name="description"]',
  category: 'metadata',
  attribute: 'content',
  method: 'minLength',
  toBe: 40
}

// Deve haver um e somente um elemento 'head > meta[name="description"]' com atributo 'href' com tamanho máximo de '200'
const metaDescriptionMax: AttributeRule<number> = {
  level: 'danger',
  length: 'one',
  selector: 'head > meta[name="description"]',
  category: 'metadata',
  attribute: 'content',
  method: 'maxLength',
  toBe: 200
}

// Recomenda-se a existência de um e somente um elemento 'head > meta[name="robots"]' com atributo 'content' igual a 'index, follow'
const robotsRule: AttributeRule = {
  level: 'warning',
  length: 'one',
  selector: 'head > meta[name="robots"]',
  category: 'metadata',
  attribute: 'content',
  method: 'isEqual',
  toBe: 'index, follow'
}

// Não pode existir nenhum elemento 'body > img' com atributo 'alt' não existente
const altImageRule: AttributeRule = {
  level: 'danger',
  length: 'none',
  selector: 'body img',
  category: 'images',
  attribute: 'alt',
  method: 'doesNotExist'
}

// Recomenda-se que não exista elemento algum 'body > img' com atributo 'width' não numérico
const widthImageRule: AttributeRule<number> = {
  level: 'warning',
  length: 'none',
  selector: 'body img',
  category: 'images',
  attribute: 'width',
  method: 'isNotNumber'
}

// Recomenda-se que não exista elemento algum 'body > img' com atributo 'heigth' não numérico
const heigthImageRule: AttributeRule<number> = {
  level: 'warning',
  length: 'none',
  selector: 'body img',
  category: 'images',
  attribute: 'heigth',
  method: 'isNotNumber'
}

// Dica: evite quaisquer elementos 'body > img' com atributo 'loading' não igual a 'lazy'
const imgLazyLoading: AttributeRule = {
  level: 'info',
  length: 'none',
  selector: 'body img',
  category: 'images',
  attribute: 'loading',
  method: 'isNotEqual',
  toBe: 'lazy'
}

// Dica: procure utilizar ao menos um elemento 'body > h2:not(empty)'
const h2Rules: Rule = {
  level: 'info',
  length: 'some',
  selector: 'body h2:not(empty)',
  category: 'headings'
}

// Dica: tente utilizar um e somente um elemento 'meta[name="theme-color"]' com atributo 'content' existente
const themeColor: AttributeRule = {
  level: 'info',
  length: 'one',
  selector: 'head > meta[name="theme-color"]',
  category: 'pwa',
  attribute: 'content',
  method: 'exists'
}

const InitialRules: Array<Rule| AttributeRule<string | number>> = [
  titleRule,
  h1Rule,
  h2Rule,
  noScriptRule,
  canonicalRule,
  metaDescriptionMin,
  metaDescriptionMax,
  robotsRule,
  altImageRule,
  widthImageRule,
  heigthImageRule,
  imgLazyLoading,
  h2Rules,
  themeColor
]

export default InitialRules
