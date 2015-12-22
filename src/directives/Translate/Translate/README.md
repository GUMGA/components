# Directive - Translate

### Descrição
O componente **gumgaTranslate** recebe um valor por atributo, informando qual a linguagem a ser carregada, por exemplo, **pt-br**. Para que funcione, deve conter um arquivo JSON dentro do diretório *i18n/* com o nome da linguagem, por exemplo, */i18n/pt-br.json*.

*Nota: Atualmente este componente funciona como singleton, podendo haver apenas uma lingua por vez*


### Atributos

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **gumga-translate** | `String` | Nome da linguagem que será carregada, o nome do arquivo deve estar igual ao valor atribuído. |

### Uso:
```html
<div gumga-translate="pt-br">
...
</div>
```

```javascript
// pt-br.json
{
  "pedido": {
    "title": "Pedido"
    ,"menulabel": "Pedido"
    ,"edit": "Editar Pedido"
    ,"insert": "Inserir Pedido"
    ,"list": "Consulta Pedido"
    ,"id": "id"
    ,"numero": "Numero"
    ,"quando": "Quando"
    ,"cliente": "Cliente"
    ,"enderecodeentrega": "EnderecoDeEntrega"
    ,"produtos": "Produtos"
    ,"servicos": "Servicos"
  }
  ,"itempedidoproduto": {
    "title": "ItemPedidoProduto"
    ,"menulabel": "ItemPedidoProduto"
    ,"edit": "Editar ItemPedidoProduto"
    ,"insert": "Inserir ItemPedidoProduto"
    ,"list": "Consulta ItemPedidoProduto"
    ,"id": "id"
    ,"produto": "Produto"
    ,"quantidade": "Quantidade"
    ,"valor": "Valor"
    ,"entregas": "Entregas"
  }
}
```
