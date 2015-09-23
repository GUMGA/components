# Directives - gumgaMax[ [Date](#gumgaMaxDate) | [Length](#gumgaMaxLength) | [Number](#gumgaMaxNumber) ]

## gumgaMaxDate

### Uso:
  ```html
  <input gumga-max-date label="{String}"></input>
  ```

### Exemplo
  ```html
  <form name="myForm">
    <input type="date" name="maxDate" ng-model="maxDate" gumga-max-date="2015-07-20">
    <p ng-show="myForm.maxDate.$error.maxdate" class="text-danger">Data superior a esperada</p>
  </form>
  ```
Um exemplo da directive gumgaMaxDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaMaxDate serve para validar datas máximas em entradas de formulários.

##### Nota
Esta diretiva suporta apenas **inputs** do tipo **date**. O valor do atributo/diretiva é **obrigatório** e deve ser uma **data**.

### Atributos

 - **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.

---

## gumgaMaxLength

### Uso:
 ```html
 <input gumga-max-length label="{String}"></input>
 ```

### Exemplo
 ```html
 <form name="myForm">
   <input type="date" name="maxLength" ng-model="maxLength" gumga-max-length="20" id="maxLength">
   <p ng-show="myForm.maxLength.$error.maxlength" class="text-danger">Tamanho superior ao esperado</p>
 </form>
 ```
Um exemplo da directive gumgaMaxDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaMaxLength serve para validar quantidades máximas de caracteres em entradas de formulários.

##### Nota
O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.

### Atributos

- **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.

---

## gumgaMaxNumber

### Uso:
 ```html
 <input gumga-max-number label="{String}"></input>
 ```

### Exemplo
 ```html
 <form name="myForm">
   <input type="number" name="maxNumber" ng-model="maxNumber" gumga-max-number="20">
   <p ng-show="myForm.maxNumber.$error.maxnumber" class="text-danger">Número superior ao esperado</p>
 </form>
 ```
Um exemplo da directive gumgaMaxDate funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaMaxNumber serve para validar números máximos em entradas de formulários.

##### Nota
Esta diretiva suporta apenas **inputs** do tipo **number**. O valor do atributo/diretiva é **obrigatório** e deve ser um **número**.

### Atributos

- **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.
