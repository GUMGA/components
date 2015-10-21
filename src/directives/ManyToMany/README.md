# Directive - gumgaManyToMany (DEPRECATED)

### Deprecated

Novo componente utilizado para criar alertas


### Uso:
  ```html
    <gumga-many-to-many
          left-list="Array"
          right-list="Array"
          left-search="Function"
          right-search="Function"
          post-method="Function"
          on-list-change="Function"
          on-value-visualization-opened="Function"
          on-value-visualization-closed="Function"
          authorize-add="Boolean">
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

- **`left-list`:** Atributo *obrigatório* que irá conter um array que será a lista da esquerda. A lista da esquerda será filtrada e não terá valores que estão presentes na lista da direita.
- **`right-list`:** Atributo *obrigatório* que irá conter um array que será a lista direita.
- **`left-search`:** Atributo *obrigatório* que irá conter uma função que irá ser executada toda vez que o usuário digitar algo no input acima da lista. Essa função terá o valor do input como parâmetro. O parâmetro deverá ser este: `left-search="doSearch(text)"`
- **`right-search`:** Atributo *obrigatório* que irá conter uma função que irá ser executada toda vez que o usuário digitar algo no input acima da lista. Essa função terá o valor do input como parâmetro. O parâmetro deverá ser este: `right-search="doSearch(text)"`
- **`post-method`:**  Atributo *opcional* que irá conter uma  uma função que irá ser executada quando o usuário desejar adicionar um valor.
- **` on-list-change`:** Atributo *opcional* que irá conter uma função que irá ser executada quando o usuário tiver clicado em um registro e o mesmo tiver trocado de lista.
- **`on-value-visualization-opened`:** Atributo *opcional* que irá conter uma função que irá ser executada quando o usuário tiver aberto o modal
* para visualização de dados
- **`on-value-visualization-closed`:** Atributo *opcional* que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver fechado o modal.
- **`authorize-add`:** Atributo *opcional* que irá conter uma um booleano que irá fazer o controle para mostrar o botão de adicionar um registro.

- **`left-label`:** Atributo *opcional* que irá conter uma String que irá aparecer acima do input e da lista.
- **`right-label`:** Atributo *opcional* que irá conter uma String que irá aparecer acima do input e da lista.
