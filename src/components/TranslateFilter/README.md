# Filtro - gumgaTranslate

### Descrição
O filtro gumgaTranslate pode ser utilizado como uma alternativa para a [gumgaTranslateTag](../directives/Translate/TranslateTag/), e pode ser utilizado também como um tradutor no Javascript.


### Atributos
Parametro             | Tipo        | Detalhe
---                   | ---         | ---
**parent**            | `String`    | String que será utilizada para dizer se o campo está em algum nível que não seja o primeiro nível no JSON.


### Uso:
```html
<span> {{ 'name' | gumgaTranslate: 'person' }}</span>
```

```js
  $filter('gumgaTranslate')('name', 'person');
```
