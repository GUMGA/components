# Directive - gumgaUpload

### Descrição
O componente gumgaUpload pode ser utilizado para fazer upload de imagens. O framework GUMGA usa um método de upload	de imagens que faz o upload do arquivo para uma pasta temporária e retorna um token. Quando o registro é salvo, o framework gumga faz o bind da string que está no atributo com o arquivo temporário.


### Atributos
Parametro | Tipo | Detalhe
--- | --- | ---
**model** | `Objet` |  Objeto que irá conter as informações da imagem.
**upload-method** | `Function` | Função que será executada para fazer o upload da imagem para o arquivo temporário.
**delete-method** | `Function` | Função que será executada para deletar a imagem do espaço temporário.
**tooltip-text** | `String` | Mensagem que irá aparecer no tooltip da imagem.

### Uso:
```html
<ANY gumga-upload
  model="{Objet}"
  upload-method="{Function}"
  delete-method="{Function}"
  tooltip-text="{String}">
</ANY>
```
