# Directive - gumgaFormClass

### Uso:
  ```html
  <form gumga-form name="SampleForm">
    <div gumga-form-class="nome">
      <input type="text" class="form-control" ng-model="user.nome" name="nome"/>
    </div>
  </form>
  ```
### Descrição
A directive gumgaFormClass é utilizada em conjunto com as directives de validação de input da gumga ou do Angular. Ela é utilizada para adicionar as cores no input de cordo com o seu estado atual (válido ou inválido).

#### Como utilizar
O componente gumgaFormClass deve ser incluído em uma tag div ao redor do input desejado e, além disto, **deve receber como atributo o mesmo nome do input**.

Caso queira que, ao invés do input voltar ao seu estado normal quando estiver válido, ele receba a cor verde, adicione o atributo `valid-green` na div junto com o `gumga-form-class`.


### Exemplos:

```html
<form gumga-form name="SampleForm">
  <div gumga-form-class="nome">
    <input type="text" class="form-control" ng-model="user.nome" name="nome"/>
  </div>
</form>
```

Com o atributo `valid-green`:

```html
<form gumga-form name="SampleForm">
  <div gumga-form-class="nome" valid-green>
    <input type="text" class="form-control" ng-model="user.nome" name="nome"/>
  </div>
</form>
```
