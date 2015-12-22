# Directive - gumgaTranslateTag

### Descrição
O componente **gumgaTranslateTag** recebe um valor por atributo, informando qual a linguagem a ser carregada, por exemplo, **pedido.enderecodeentrega**. Também tem a possibilidade de separar o valor com virgula, sendo que após a virgula, seja informado a linguagem alternativa para aquela string, por exemplo: **pedido.enderecodeentrega,en-us**.


### Atributos

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **gumga-translate-tag** | `String` | Nome da propriedade do JSON carregado que será substituído pelo seu valor. |

### Uso:
```html
<div gumga-translate="pt-br">
  <span gumga-translate-tag="pedido.title,en-us"></div>
  <span gumga-translate-tag="pedido.enderecodeentrega"></div>
</div>
```
