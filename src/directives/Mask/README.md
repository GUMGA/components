# Directive - gumgaMask

### Descrição
O componente **GumgaMask** serve para adicionar máscaras aos elementos inputs que se fazem necessário, como CPF, CNPJ, telefone e etc.

### Atributos

- **`gumga-mask`:** Por padrão o componente tem 3 tipos de regex aceitas, que são **9** (numéricos), **A** (alfa) e * (alfanuméricos)
- **`gumga-mask-options`:** Objeto em $scope com regex extras ou sobreescrever configurações default.
- **`gumga-mask-placeholder`:** Trabalha em conjunto com o placeholder nativo, contudo, o **gumga-mask-placeholder** deve seguir o mesmo padrão de caracteres do informado no **gumga-mask**. Enquanto o nativo fica ativo sem atividade no input, ao disparar o evento focus, o gumga-mask-placeholder ficará ativo.

### Uso:
```html
<input
  type="text"
  ng-model="cpf"
  gumga-mask="{String}"
  gumga-mask-options="{Object}"
  gumga-mask-placeholder="{String}" />
```

```js
$scope.maskOptions = {
  maskDefinitions: {
    'seuRegex': /[regex]/ // <= aqui vai sua regex
  },
  clearOnBlur: false,
  eventsToHandle: ['input', 'keyup', 'click', 'focus']
};
```
Um exemplo da directive gumgaMask funcionando pode ser encontrado [aqui](http://embed.plnkr.co/gWupU9i3MYeRwsBbNBio).
