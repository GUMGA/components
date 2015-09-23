# Directives - gumgaRange[ [Date](#gumgaRangeDate) | [Number](#gumgaRangeNumber) ]

## gumgaRangeDate

### Uso:
  ```html
  <input gumga-range-date label="{String}"></input>
  ```

### Exemplo
  ```html
  <form name="myForm">
    <input type="date" name="rangeDate" ng-model="rangeDate" gumga-range-date="{min: '1986-12-29', max: '2015-07-20'}" id="rangedate">
    <p ng-show="myForm.cep.$error.rangedate" class="text-danger">A data informada não está entre os valores esperados</p>
  </form>
  ```

Um exemplo da directive gumgaErrors funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaRangeDate serve para validar datas mínimas e máximas para entradas em formulários com campos do tipo date.

#### Nota
O valor do atributo/diretiva é **obrigatório** e deve ser um **objeto** contendo duas propriedades, **min** e **max** com os valores de suas respectivas datas para execução da validação range.

### Atributos
 - **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.

---

## gumgaRangeNumber

### Uso:
  ```html
  <input gumga-range-number label="{String}"></input>
  ```

### Exemplo
  ```html
  <form name="myForm">
    <input type="date" name="rangeNumber" ng-model="rangeNumber" gumga-number-date="{min: 0, max: 20}">
    <p ng-show="myForm.rangeNumber.$error.rangenumber" class="text-danger">O número informado não está entre os valores esperados</p>
  </form>
  ```

Um exemplo da directive gumgaErrors funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaRangeNumber serve para validar números mínimos e máximos em entradas de formulários com campos do tipo number.

#### Nota
O valor do atributo/diretiva é **obrigatório** e deve ser um **objeto** contendo duas propriedades, **min** e **max** com os valores de suas respectivas datas para execução da validação range.

### Atributos
 - **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.
