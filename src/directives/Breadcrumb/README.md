# Directive - gumgaBreadcrumb

### Uso:
```html
<gumga-breadcrumb></gumga-breadcrumb>
```

### Descrição
O componente GumgaBreadcrumb serve para mostrar ao usuário a lista das páginas visitadas. Este componente atuamente
funciona caso exista dependência do [ui-router](https://github.com/angular-ui/ui-router).
O componente GumgaBreadcrumb ouve ao evento `breadChanged`, que recebe os states que estão sendo visitados. Uma das implementações possíveis para esse
evento breadChanged é a seguinte:
```js
$rootScope.breadcrumbs = [];
$rootScope.$on('$stateChangeSuccess', function (event, toState) {
  updateBreadcrumb(toState.name, toState.data.id);
});
function updateBreadcrumb(state, id) {
  function get(id) {
    for (var i = 0, len = $rootScope.breadcrumbs.length; i < len; i++) {
      if ($rootScope.breadcrumbs[i].id === id) {
        return i;
      }
    }
  }
  if (id && get(id) >= 0) {
    $rootScope.breadcrumbs.splice(get(id), $rootScope.breadcrumbs.length - get(id), {state: state, id: id});
  } else {
    $rootScope.breadcrumbs.push({state: state, id: id});
  }
  !id ? $rootScope.breadcrumbs = [] : angular.noop;
  $rootScope.$broadcast('breadChanged');
}
```
Este código foi colocado dentro do `run` do módulo principal da aplicação.
