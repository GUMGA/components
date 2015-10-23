# Directive - gumgaMenu

### Descrição
O componente gumgaMenu é uma directive que cria um menu na lateral esquerda da tela para facilitar a navegação do usuário no sistema.
Seus itens são carregados de forma dinâmica através de um arquivo `json` que é carregado através de uma requisição HTTP. Além disso, ele faz um filtro de acordo com as keys passadas para ele também através de um arquivo `json`.

### Atributos

- **`menu-url`:** Parâmetro obrigatório que irá conter uma variável com o endereço do arquivo `json` para que seja carregada as entradas do menu.
- **`keys-url`:** Parâmetro obrigatório que irá conter uma variável com o endereço do arquivo `json` para que seja carregada as chaves que farão o filtro do menu.
- **`image`:** Parâmetro obrigatório que irá conter uma variável com o endereço da imagem que ficará no menu.

### Uso:
```js
// menu.json
[
  {
    "label": "Home",
    "URL": "welcome",
    "key": "CRUD-BASE",
    "icon": "glyphicon glyphicon-home",
    "icon_color": "",
    "imageUrl": "",
    "imageWidth": "",
    "imageHeight": "",
    "filhos": []
  }
]

// keys.json
[
  "CRUD-BASE",
  "CRUD-User"
]
```

```html
<gumga-menu menu-url="menu.json" keys-url="keys.json" image="menu.svg"></gumga-menu>
```

Veja um exemplo em funcionamento [aqui](http://embed.plnkr.co/UcMtAor6sUA6s0oZnJiu/preview).
