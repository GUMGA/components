# Directive - gumgaCustomFields

### Descrição
O componente **gumgaCustomFields** permite que o próprio usuário ou implantador adicione atributos dos tipos texto, lógico, numérico, data e seleção em classes previamente selecionadas pelo desenvolvedor. As customizações respeitam o Multitenacy e armazenam o dados em tabelas específicas.

*Nota: Como se trata de um componente específico, este é acoplado ao framework backend da Gumga, que ainda não é open-source.*

### Atributos

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **search** | `Function` | Parâmetro obrigatório que irá conter uma função que será utilizada para fazer a busca simples. Para receber o campo e a pesquisa que foi feita, basta passar os parâmetros field e param para a função. search-method="function(field,param)". |
| **on-search** | `Function` | Parâmetro não obrigatório que irá conter uma função que será chamada quando uma busca for executada. |

### Uso:
```html
<gumga-filter search= "{Function}" on-search="{Function}"></gumga-filter>
```
