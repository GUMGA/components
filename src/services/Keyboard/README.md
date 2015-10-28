# Service - gumgaKeyboard

### Descrição
A directive GumgaKeyboard é um Wrapper de uma biblioteca chamada [Mousetrap](https://craig.is/killing/mice) que é utilizada para adicionar funcionalidades quando determinadas teclas são pressionadas.

### Métodos
`addBind(key, function, event);`

O método `addBind` adiciona uma função a combinação de teclas passada como parâmetro. Ele recebe três parâmetros, `key` e `function` e `event`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Quais teclas serão clicadas para que a função seja executada.
**function** | `Function` | Função que será executada quando sequência de teclas especificadas for digitada pelo usuário.
**event** | `String` | Em qual evento de teclado será disparado, como por exemplo `keypress` ou`keydown`

#### Retorno
`Boolean` Retona um boolean. Se o bind foi feito, retorna true, caso ao contrário retorna false.

---

`removeBind(key);`

O método `removeBind` remove as funções que estão atribuídas a `key` que foi passada . Ele recebe um parâmetro `key`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Quais teclas que o desenvolvedor deseja remover o bind.

---

`triggerBoundedEvent(key);`

O método `triggerBoundedEvent` dispara o evento atribuído a `key` que foi passada.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Quais teclas que o desenvolvedor deseja remover o bind.

---

`bindToElement(element,key,function,event);`

O método `bindToElement` adiciona uma função a combinação de teclas passada como parâmetro em um elemento específico. Ele recebe quatro parâmetros,`element`, `key` e `function` e `event`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**element** | `String` | Elemento no qual a sequência de teclas deve ser executada para disparar o evento.
**key** | `String` | Quais teclas serão clicadas para que a função seja executada.
**function** | `Function` | Função que será executada quando sequência de teclas especificadas for digitada pelo usuário.
**event** | `String` | Em qual evento de teclado será disparado, como por exemplo `keypress` ou`keydown`

#### Retorno
`Boolean` Se o bind foi feito, retorna true, caso ao contrário retorna false.

---

`unbindFromElement(element,key);`

O método `unbindFromElement` remove as teclas do elemento passado como parâmetro. Ele recebe dois parâmetros,`element` e `key`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**element** | `String` | Elemento no qual a sequência de teclas vai ser retirada.
**element** | `String` | Quais teclas serão removidas do element.

---

`getBinds();`

Retorna todos os binds que foram adicionados.

#### Retorno
`Array` Retorna uma lista de todos os binds já feitos.
