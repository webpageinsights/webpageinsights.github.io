// Toda página deve ter 1 e somente 1 <h1>
// Toda página deve ter pelo menos um <h2>
// Todas as imagens da página devem ter atributo alt
// Todas as imagens da página devem ter atributo width e height
// Todas as imagens da página devem ter atributo loading='lazy'
// Toda página deve ter uma e somente uma url canônica válida
// Toda página deve ter uma e somente uma url amphtml
// Toda página deve ter uma e somente uma link rel next
// Toda página deve ter uma e somente uma link rel prev
// Toda página deve ter um e somente um meta robots
//-- CHECAR
// Toda página deve ter um e somente um meta name viewport válido
//-- FALTA
// Os <h1> deve ter no máximo 150 caracteres

const Validations = [
  {
    selector: "h1",
    level: "danger",
    length: "one"
  },
  {
    selector: "h2",
    level: "info",
    length: "moreThanZero"
  },
  {
    selector: "img",
    length: "zero",
    level: "danger",
    condition: {
      name: "alt",
      assertName: "doesNotExist"
    }
  },
  {
    selector: "img",
    length: "zero",
    level: "danger",
    condition: {
      name: "width",
      assertName: "isNotNumber"
    }
  },
  {
    selector: "img",
    length: "zero",
    level: "danger",
    condition: {
      name: "heigth",
      assertName: "isNotNumber"
    }
  },
  {
    selector: "img",
    length: "zero",
    level: "warning",
    condition: {
      name: "loading",
      assertName: "contains",
      assertValue: "lazy"
    }
  },
  {
    selector: "head > link[rel=\"canonical\"]",
    length: "one",
    level: "danger",
    condition: {
      name: "href",
      assertName: "isValidUrl"
    }
  },
  {
    selector: "head > link[rel=\"amphtml\"]",
    length: "one",
    level: "info",
    condition: {
      name: "href",
      assertName: "isValidUrl"
    }
  },
  {
    selector: "head > link[rel=\"prev\"]",
    level: "info",
    length: "one",
    condition: {
      name: "href",
      assertName: "isValidUrl"
    }
  },
  {
    selector: "head > link[rel=\"next\"]",
    length: "one",
    level: "info",
    condition: {
      name: "href",
      assertName: "isValidUrl"
    }
  },
  {
    selector: "head > meta[name=\"viewport\"]",
    level: "danger",
    length: "one"
  },
  {
    selector: "head > meta[name=\"robots\"]",
    level: "warning",
    length: "one"
  }
];

export default Validations;
