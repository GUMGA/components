# Directive - gumgaNumber

### Descrição
O componente GumgaNumber é usado para formatar valores numéricos, é composto por outros sub-componentes que serão apresentados a seguir.

### Sub-componentes

| Componente              | Tipo                    | Detalhe |
| ---                     | ---                     | ---     |
| **integer-number**      | `atributo ou classe`    | Números inteiros. |
| **integer-places**      | `atributo`              | Número de casas do número. |
| **decimal-places**      | `atributo`              | Número de casas decimais após o ponto. |

### Uso:
```html

<input type="text" ng-model="number.integer" gumga-number integer-number>
<input type="text" ng-model="number.iplaces" gumga-number integer-places="2">
<input type="text" ng-model="number.dplaces" gumga-number decimal-places="2">

```
