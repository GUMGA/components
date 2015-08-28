# v1.1.1

### BUGFIX

- Foi arrumado um erro no componente **GumgaTable** com relação ao botão limpar pesquisa. O componente estava limpando a query avançada e isto estava acarretando em um erro no framework Gumga, pois a query avançada não pode ser vazia. Ao invés disso, está sendo limpada apenas com uma query simples.

- No service **GumgaRest**, a função de `saveQuery` estava enviando um array ao invés de um JSON.

- No service **$$populateProvider**, a função `saveQuery` e `getQuery` estavam com o retorno errado.

- No componente **GumgaUpload**, quando estava dentro de um GumgaForm, estava com erro pois estava sem o atributo `name`.

### NEW FEATURES

# v1.1.0


### BUGFIX

- Foi arrumado um erro no componente **ManyToOne** com o postMethod assíncrono. Agora é necessário retornar a promise resolvida.
```js
$scope.post(){
// corpo da função
    return $http.post(url)
         .then(function(value){
             return value.data ;
         });
}
```
- No **GumgaRest**, o post da imagem a url estava fora dos padrões do framework.
- No **GumgaAddress**, quando o objeto que entrava na directive já estava populado, ele transformava todos os valores em `null`.
- No componente **GumgaNav**, o search estava travando quando clicava mais de uma vez no glyphicon.
- Correção de testes que estavam dando error.


### NEW FEATURES

- Documentação sendo gerada a partir de comentários
- Componente **GumgaForm**, para utilizar funções dentro do controlador.
- Componentes de validação de input.
- Componente **GumgaError** para mostrar os erros específicos do input.
- Componente **GumgaErrors** para mostrar todos os erros do formulário.
