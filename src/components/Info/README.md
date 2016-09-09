# GumgaInfo

### Uso

```html
<button type="button" ng-click="foo()"
  gumga-info="Descrição informativa..."
  icon="glyphicon glyphicon-info-sign text-primary"
  dismiss-button="Não"
  dismiss-button-class="btn btn-default">
</button>
```

## Descrição
O componente gumgaConfirm pode ser utilizado para interceptar um clique em algum elemento que contenha a diretiva `ng-click`, mostrar um modal de confirmação que, se o usuário clicar no botão de confirmação,
a ação que está registrada no `ng-click` será executada.

#### Parâmetros

- **`gumga-info`:** Atributo **obrigatório**  que deve ser uma string que irá conter o conteúdo da mensagem que será mostrado no modal.
- **`dismiss-button`:** Atributo **opcional** que deve ser uma string que irá conter o texto que irá no botão de cancelar.
- **`dismiss-button-class`:** Atributo **opcional** que deve ser uma string que irá conter qual classe o botão de cancelar assumirá.
- **`icon`**: Atributo **opcional** que deve ser o nome de uma classe que represente um ícone. Ex.: Glyphicon Twiiter Bootstrap ou FontAwesome, por padrão será usado *glyphicon-info-sign*.
- **`size`**: Atributo **opcional** que deve ter o tamanho da modal. Ex.: sm ou lg, por padrão será usado *md*.

