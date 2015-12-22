# Service - gumgaWebStorage

### Descrição
O service GumgaWebStorage é utilizado para ajudar o desenvolvedor a trabalhar com o storage do Browser.

### Métodos

`setSessionStorageItem(key, value);`

O método setSessionStorageItem aceita dois parâmetros `key` e `value`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Qual o identificador do valor que será salvo.
**value** | `String/Number/Object` | Valor que será salvo no sessionStorage.

---

`getSessionStorageItem(key);`

O método setSessionStorageItem aceita um parâmetro `key`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Qual o identificador do valor que será salvo.

#### Retorno
`String/Number/Object` Retorna o valor que estiver na sessionStorage daquela key específica. Caso não encontre, o valor retornado é null.

---

`removeSessionStorageItem(key);`

O método removeSessionStorageItem aceita um parâmetro `key`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Qual o identificador do valor que será removido da sessionStorage.

---

`clearSessionStorage();`

O método clearSessionStorage não aceita nenhum parâmetro e limpa a sessionStorage.

---

`getNumberOfItemsInSessionStorage();`

O método getNumberOfItemsInSessionStorage não aceita nenhum parâmetro, e retorna o número de itens no localStorage.

---

`setLocalStorageItem(key, value);`

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Qual o identificador do valor que será salvo.
**value** | `String/Number/Object` | Valor que será salvo no localStorage.

---

`getLocalStorageItem(key);`

O método setLocalStorageItem aceita um parâmetro `key`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Qual o identificador do valor que será salvo.

#### Retorno
`String/Number/Object` Retorna o valor que estiver na LocalStorage daquela key específica. Caso não encontre, o valor retornado é null.

---

`removeLocalStorageItem(key);`

O método removeLocalStorageItem aceita um parâmetro `key`.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**key** | `String` | Qual o identificador do valor que será removido da LocalStorage.

---

`clearLocalStorage();`

O método clearLocalStorage não aceita nenhum parâmetro e limpa o localStorage.

---

`getNumberOfItemsInLocalStorage();`

O método getNumberOfItemsInLocalStorage não aceita nenhum parâmetro, e retorna o número de itens no localStorage.
