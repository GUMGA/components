# Directive - gumgaCounter

### Uso:
  ```html
    <form name="SampleForm" novalidate>
      <input type="text" gumga-counter ng-model="entity.name" />
    </form>
  ```

  ```html
  <form name="SampleForm" novalidate>
    <input type="text" gumga-counter ng-model="entity.name" gumga-max-length="10" />
  </form>
  ```

### Descrição
O componente gumgaCounter permite escolher um tamanho máximo permitido no campo e também cria um contador de que indica se o número de caracteres do que está no input. Caso seja passado um valor para a directive ou ela seja utilizada em conjunto com a directive gumgaMaxLength, o contador indicará o máximo de caracteres possíveis também.


### Atributos

 - **`gumgaCounter`:** Valor opcional que contém um número inteiro com o máximo de caracteres possíveis.
