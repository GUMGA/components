# Directive - gumgaFormButtons

### Descrição
O componente gumgaFormButtons pode ser utilizado para quando necessite de botões para o formulário, tanto de continuar inserindo, de salvar e retroceder.

### Atributos

- **`submit`:** Parâmetro obrigatório que contém uma função que será executada quando o botão de continuar for clicado.
- **`valid`:** Parâmetro obrigatório que irá conter um valor booleano para validar caso o formulário é válido para liberar o botão de salvar.
- **`continue`:** Object que deverá conter um atributo booleano chamado `value`, para controlar caso continuará inserindo ou não. Essa
*  opção aparecerá apenas quando o objeto $stateParams(pertencente ao ui-router) não possuir um id, ou seja, caso esteja numa tela de inserção.
- **`confirm-dirty`:** Parâmetro não obrigatório que irá conter um booleano para indicar caso deseje ter uma confirmação de saída do formulário
*  quando este foi alterado alguma vez.

### Uso
```html
<gumga-form-buttons
  submit="{Function}"
  valid="{boolean}"
  continue="{Object}"
  confirm-dirty="{boolean}">
</gumga-form-buttons>
```
