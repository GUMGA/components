# Directive - gumgaPassword

### Descrição
A directive gumgaPassword é usada para adicionar ao formulário, um campo de senha com algumas validações que podem ser configuradas. Também podendo escolher se irá utilizar confirmação de senha ou não.

### Atributos
| Parametro | Tipo | Detalhe |
| - | - | - |
| **value** | `String` | Parâmetro obrigatório que irá conter uma variável para armazenar o valor digitado pelo usuário. |
| **contains-numbers** | `Boolean` | Parâmetro não obrigatório para fazer com que a senha possua números. |
| **contains-uppercase** | `Boolean` | Parâmetro não obrigatório para fazer com que a senha possua caracteres maiúsculos. |
| **contains-symbols** | `Boolean` | Parâmetro não obrigatório para fazer com que a senha possua caracteres especiais. |
| **confirmation** | `Boolean` | Parâmetro não obrigatório que cria ou não a confirmação de senha. |
| **value-min-length** | `Number` | Parâmetro não obrigatório para exigir um tamanho mínimo. |
| **value-max-length** | `Number` | Parâmetro não obrigatório para exigir um tamanho máximo. |
