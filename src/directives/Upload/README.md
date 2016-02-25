# Directive - gumgaUpload

### Descrição
O componente gumgaUpload pode ser utilizado para fazer upload de imagens. O framework GUMGA usa um método de upload	de imagens que faz o upload do arquivo para uma pasta temporária e retorna um token. Quando o registro é salvo, o framework gumga faz o bind da string que está no atributo com o arquivo temporário.


### Atributos
Parametro | Tipo | Detalhe
--- | --- | ---
**attribute** | `Object` |  Objeto que irá conter as informações da imagem.
**upload-method** | `Function` | Função que será executada para fazer o upload da imagem para o arquivo temporário.
**delete-method** | `Function` | Função que será executada para deletar a imagem do espaço temporário.
**tooltip-text** | `String` | Mensagem que irá aparecer no tooltip da imagem.
**avatar** | `String` | Caminho da imagem que será mostrada antes do upload, a mesma deve ter 128 x 128px. 

### Uso:
```html
<ANY gumga-upload
  attribute="{Objet}"
  upload-method="{Function}"
  delete-method="{Function}"
  tooltip-text="{String}"
  avatar="{String}">
</ANY>
```
