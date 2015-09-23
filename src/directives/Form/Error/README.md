# Directive - gumgaError

### Uso:
  ```html
  <input gumga-error></input>
  ```
### Exemplo
  ```html
  <input type="number" name="minNumber" ng-model="minNumber" gumga-error gumga-min-number="20">
  ```

Um exemplo da directive gumgaError funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente gumgaError serve para mostrar mensagens de validações abaixo do input responsável pelo erro, o atributo gumga-min-error foi usada para demonstração para validação.
A responsábilidade do gumgaError é apenas marcar os elementos que terão a mensagem de erro abaixo do campo.
