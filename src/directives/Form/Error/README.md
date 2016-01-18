# Directive - gumgaError

### Uso:
  ```html
  <input gumga-error></input>
  ```
### Exemplo
  ```html
  <input type="text" name="name" field="nome do cliente" ng-model="entity.name" gumga-error gumga-required>
  ```

Um exemplo da directive gumgaError funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente gumgaError serve para mostrar mensagens de validações abaixo do input responsável pelo erro, o atributo gumga-required foi usada para demonstração para validação.
A responsábilidade do gumgaError é apenas marcar os elementos que terão a mensagem de erro abaixo do campo.

##### Parâmetros
 - **`String`** **`field`:** String que terá o nome do input para retornar nas mensagens de erros.