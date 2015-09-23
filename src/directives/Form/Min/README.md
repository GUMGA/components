# Directives - gumgaMin[ [Date](#gumgaMinDate) | [Length](#gumgaMinLength) | [Number](#gumgaMinNumber) ]

## gumgaMinDate

### Uso:
  ```html
  <input gumga-min-date label="{String}"></input>
  ```

### Exemplo
  ```html
  <form name="myForm">
    <input type="date" name="minDate" ng-model="minDate" gumga-min-date="2015-07-20">
    <p ng-show="myForm.minDate.$error.mindate" class="text-danger">Data inferior a esperada</p>
  </form>
  ```
Um exemplo da directive gumgaMinDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaMinDate serve para validar datas máximas em entradas de formulários.

##### Nota
Esta diretiva suporta apenas **inputs** do tipo **date**. O valor do atributo/diretiva é **obrigatório** e deve ser uma **data**.

### Atributos
 - **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.

---

## gumgaMinLength

### Uso:
 ```html
 <input gumga-min-length label="{String}"></input>
 ```

### Exemplo
 ```html
 <form name="myForm">
   <input type="date" name="minLength" ng-model="minLength" gumga-min-length="20" id="minLength">
   <p ng-show="myForm.minLength.$error.minlength" class="text-danger">Tamanho inferior ao esperado</p>
 </form>
 ```
Um exemplo da directive gumgaMinDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaMinLength serve para validar quantidades máximas de caracteres em entradas de formulários.

##### Nota
O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.

### Atributos
- **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.

---

## gumgaMinNumber

### Uso:
 ```html
 <input gumga-min-number label="{String}"></input>
 ```

### Exemplo
 ```html
 <form name="myForm">
   <input type="number" name="minNumber" ng-model="minNumber" gumga-min-number="20">
   <p ng-show="myForm.minNumber.$error.minnumber" class="text-danger">Número inferior ao esperado</p>
 </form>
 ```
Um exemplo da directive gumgaMinDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaMinNumber serve para validar números máximos em entradas de formulários.

##### Nota
Esta diretiva suporta apenas **inputs** do tipo **number**. O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.

### Atributos
- **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.
