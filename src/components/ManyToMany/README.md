# Directive - gumgaManyToMany

### Uso:
```html
<gumga-many-to-many
  left-search="Function"
  right-list="Array"
  right-search-field="String"
  post-method="Function"
  authorize-add="Boolean"
  on-list-change="Function"
  on-value-visualization-opened="Function"
  on-value-visualization-closed="Function"  
  text-heading-left="String"
  text-heading-right="String"
  text-moveall-left="String"
  text-moveall-right="String">
  <left-field>{{$value.name}}</left-field>
  <right-field>{{$value.name}}</right-field>
</gumga-many-to-many>
```

### Descrição
O componente gumgaManyToMany é um componente que é utilizado para mostrar duas listas lado a lado, e permitir que um registro seja trocado de uma lista para outra,
assim como também visualizado os seus valores(caso seja um objeto).
Para que o programador possa escolher como os valores serão demonstrados, foram desenvolvidas duas tags que devem estar dentro do componente manyToMany
```html
<left-field>{{$value.name}}</left-field>
<right-field>{{$value.name}}</right-field>
```

### Atributos

- **`left-search`:** Atributo *obrigatório* que irá conter uma funcão que irá retornar um array. A lista da esquerda será filtrada e não terá valores que estão presentes na lista da direita.
- **`right-list`:** Atributo *obrigatório* que irá conter um array que será a lista direita.
- **`right-search-field`:** Atributo *opcional* que irá conter uma string com o nome do atributo que será usado para filtrar a lista da direita.
- **`post-method`:**  Atributo *opcional* que irá conter uma  uma função que irá ser executada quando o usuário desejar adicionar um valor.
- **`on-list-change`:** Atributo *opcional* que irá conter uma função que irá ser executada quando o usuário tiver clicado em um registro e o mesmo tiver trocado de lista.
- **`on-value-visualization-opened`:** Atributo *opcional* que irá conter uma função que irá ser executada quando o usuário tiver aberto o modal
* para visualização de dados
- **`on-value-visualization-closed`:** Atributo *opcional* que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver fechado o modal.
- **`authorize-add`:** Atributo *opcional* que irá conter uma um booleano que irá fazer o controle para mostrar o botão de adicionar um registro.

- **`text-left-empty`:** Atributo *opcional* que irá conter uma String que irá aparecer quando a lista da esquerda for vazia.
- **`text-right-empty`:** Atributo *opcional* que irá conter uma String que irá aparecer quando a lista da direita for vazia.
- **`text-left-placeholder`:** Atributo *opcional* que irá conter uma String que irá aparecer na input da direita.
- **`text-right-placeholder`:** Atributo *opcional* que irá conter uma String que irá aparecer na input da direita.
- **`text-heading-left`:** Atributo *opcional* que irá conter uma String que irá aparecer como titulo da lista da esquerda.
- **`text-heading-right`:** Atributo *opcional* que irá conter uma String que irá aparecer como titulo da lista da direita.
- **`text-moveall-left`:** Atributo *opcional* que irá conter uma String que será aparecer no botão de mover todos os itens da esquerda.
- **`text-moveall-right`:** Atributo *opcional* que irá conter uma String que será aparecer no botão de mover todos os itens da direita.
