# Directive - gumgaUpload

### Descrição
O componente gumgaUpload pode ser utilizado para fazer upload de imagens. O framework GUMGA usa um método de upload	de imagens que faz o upload do arquivo para uma pasta temporária e retorna um token. Quando o registro é salvo, o framework gumga faz o bind da string que está no atributo com o arquivo temporário.


Parametro | Tipo | Detalhe
------------- | -------------
model | Object | Objeto que irá conter as informações da imagem.

### Atributos
Parametro | Tipo | Detalhe
--- | --- | ---
**model** | `Objet` |  Objeto que irá conter as informações da imagem.
**upload-method** | `Function` | Função que será executada para fazer o upload da imagem para o arquivo temporário.
**delete-method** | `Function` | Função que será executada para deletar a imagem do espaço temporário.
**tooltip-text** | `String` | Mensagem que irá aparecer no tooltip da imagem.

### Uso:
```html
<gumga-nav
  title="Título"
  multi-entity="true'"
  put-url="http://url/logout"
  state="{String}"
</gumga-menu>
```

Veja um exemplo em funcionamento [aqui](http://embed.plnkr.co/PeJHAS6viutuekw614ZL/preview).
