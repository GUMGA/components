# Directive - gumgaManyToOne (gumgaMask)

### Uso:
```html
  <input type="text" ng-model="cpf" gumga-mask gumga-mask-options gumga-mask-placeholder/>
```



### Descrição
A directive gumgaManyToOne pode ser utilizada para filtrar uma lista de registros dinâmicamente.  Ela também permite adicionar um registro caso a busca retorne uma lista vazia e permite também visualizar os atributos do registro selecionado.


### Atributos

- **`value`:** Atributo *obrigatório* que irá conter um objeto em que o bind será feito com o registro selecionado na lista.
- **`list`:** Atributo *obrigatório* que irá conter um array que irá conter os registros buscados.
- **`search-method`:** Atributo *obrigatório* que irá conter uma função que fará a busca na lista assíncronamente. `search-method="getSearch(param)"`
- **`post-method`:**  que irá conter uma função que dependendo do parâmetro `async`, chamará a função async com o parâmetro `post-method="post(value)"` e caso o parâmetro async não esteja presente  ou seja falso, fará um push na lista.
- **`field`:** Atributo *obrigatório* que irá conter o atributo do registro que está sendo procurado e o que estará na lista.
- **`authorize-add`:** Atributo *opcional* que irá conter um booleano que irá fazer o controle para mostrar o botão de adicionar um registro caso a busca não tenha retornado nenhum registro
- **`async`:** Atributo *opcional* que irá dizer caso componente fará um post chamando a função passada ou um push na lista. Por default, o valor é true.
- **`on-new-value-added`:** Atributo *opcional* que irá conter uma função que irá ser executada quando o usuário adicionar um novo valor.
- **`on-value-visualization-opened`:** Atributo *opcional* que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver aberto o moda para visualização de dados.
- **`on-value-visualization-closed`:** Atributo *opcional* que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver fechado o modal para visualização de dados.


/**
 * @ngdoc directive
 * @name gumga.core:
 * @restrict A
 * @description O componente **GumgaMask** serve para adicionar máscaras aos elementos inputs que se fazem necessário, como CPF, CNPJ, telefone e etc.
 *
 * @example
 * Um exemplo da directive gumgaTable funcionando pode ser encontrado [aqui](http://embed.plnkr.co/SALkp5bKRZ1aywsrpmEX).
 *  <pre>
 *  	<form class="" action="index.html" method="post">
 *  		<input type="text" name="name" value="" ng-model="cpf" gumga-mask="999.999.999-99" gumga-mask-options="maskOptions">
 *  	</form>
 *    <script type="text/javascript">
 *    $scope.maskOptions = {
 *    	maskDefinitions: {
 *    		'seuRegex': /[regex]/
 *    	},
 *    	clearOnBlur: false,
 *    	eventsToHandle: ['input', 'keyup', 'click', 'focus']
 *    };
 *    </script>
 *  </pre>
 *
 * @param {String} gumga-mask Por padrão o componente tem 3 tipos de regex aceitas, que são **9** (numéricos), **A** (alfanuméricos) e ** * ** (alfanuméricos)
 * @param {Object} gumga-mask-options Objeto em $scope com regex extras ou sobreescrever configurações default.
 * @param {String} gumga-mask-placeholder Trabalha em conjunto com o placeholder nativo, contudo, o **gumga-mask-placeholder** deve seguir o mesmo padrão
 * de caracteres do informado no **gumga-mask**. Enquanto o nativo fica ativo sem atividade no input, ao disparar o evento focus, o gumga-mask-placeholder
 * ficará ativo.
 */
