# Directive - gumgaAlert (DEPRECATED)

### Deprecated

Novo componente utilizado para criar alertas


### Uso:
  ```html
    <gumga-alert></gumga-alert>
  ```
  ```html
    <div gumga-alert></div>
  ```


### Descrição
O componente gumgaAlert serve para criar notificações growl-like e é baseada em eventos.
Para o funcionamento da directive, é necessário incluí-la apenas uma vez no seu código html (de preferência no index.html), para que os listeners sejam adicionados.

Para que o alerta seja utilizado, são utilizados quatro eventos:

 - `dangerMessage`: Utilizado para criar mensagens de erro.
 - `infoMessage`: Utilizado para criar mensagens de informação.
 - `successMessage`: Utilizado para criar mensagens de sucesso.
 - `warningMessage`: Utilizado para criar mensagens de aviso.

Para disparar o evento, utiliza-se os eventos padrões do AngularJS, como pode ser visto a seguir:

```js

$scope.$emit('dangerMessage',{title: 'Error' ,message: 'Error 404'});
$scope.$emit('successMessage',{title: 'Parabéns!' ,message: 'Sua solicitação foi aceita com sucesso!'});
$scope.$emit('warningMessage',{title: 'Cuidado!' ,message: 'A área que você está entrando é restrita.'});
$scope.$emit('infoMessage',{title: 'Salvar' ,message: 'Para salvar, entre em contato com o administrador.'});

```
