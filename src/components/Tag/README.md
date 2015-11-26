# Componente - gumgaTag

### Descrição
O componente gumgaTag pode ser utilizado para atribuir tags genéricas e valoradas para o registro, sem alterar o modelo do registro. Este componente funciona apenas com o framework Gumga. Ele já está integrado com os componentes: `GumgaRest` e `GumgaController`.


### Atributos
Parametro             | Tipo        | Detalhe
---                   | ---         | ---
**selected-search**   | `Function`  | Função assíncrona que irá buscar as tags que já foram selecionadas para este registro.
**available-search**  | `Function`  | Função assíncrona que irá buscar as tags que estão disponíveis para serem selecionadas.
**ng-model**          | `Array`     | Array que irá conter as tags que foram selecionadas.

### Uso:
```html
<gumga-tag  selected-search="sample.methods.getSelectedTags(entity.id)"
            available-search="sample.methods.getAvailableTags()"
            ng-model="selectedTags">
</gumga-tag>
```

```js
// Controller da tela
```
