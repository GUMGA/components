# GumgaQuery

### Uso

```html
<gumga-query search="foo(field, param)" advanced-search="foo(param)" search-text="Pesquisar">
  <search-field field="name" label="Nome" select="true" ></search-field>
  <search-field field="age"  label="Idade"></search-field>
</gumga-query>

```

### Descrição

O componente gumgaQuery é utilizado para realizar buscas, seja buscas simples ou avançadas. Para buscas avançadas, ele funciona como um wrapper do GumgaFilter. Para passar os atributos que poderão ser utilizados na busca, utilizamos tags internas a tag do componente.


### Parâmetros

- **search**: Parâmetro que irá conter uma função que será utilizada para executar a busca simples.Os parâmetros `field` e `param` são obrigatórios.
- **advancedSearch**: Parâmetro que irá conter uma função que será utilizada para executar a busca avançada. O parâmetro `param` é obrigatório.
- **searchText**: Parâmetro que irá conter uma string que será utilizada como label para o botão de pesquisa.

#### Parâmetros da tag search-field

- **field**: O parâmetro `field` irá conter uma string que será utilizada na hora de fazer a busca.
- **label**: O parâmetro `label` irá conter uma string que será utilizada para mostrar no componente.
- **select**: O parâmetro `select` irá conter um valor `booleano` que será utilizado para que o campo seja selecionado por padrão. Caso nenhum campo contenha o parâmetro `select`, o primeiro será selecionado por padrão.
