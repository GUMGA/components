# Directive - gumgaFileUpload

### Descrição
O componente gumgaFileUpload pode ser utilizado para fazer upload de arquivos. O framework GUMGA usa um método de upload de imagens que faz o upload do arquivo para uma pasta temporária e retorna um token. Quando o registro é salvo, o framework gumga faz o bind da string que está no atributo com o arquivo temporário.


### Atributos
Parametro | Tipo | Detalhe
--- | --- | ---
**attribute**       | `Object`   | Objeto que irá conter as informações do arquivo.
**accepted**        | `String`   | Formatos (extensões) aceitos para upload, separados por vírgula. *A verificação é feita via mimetype.*
**max-size**        | `Integer`  | Tamanho máximo em KB aceito por arquivo. 
**upload-method**   | `Function` | Função que será executada para fazer o upload do arquivo temporário.
**delete-method**   | `Function` | Função que será executada para deletar a imagem do espaço temporário.

### Uso:
```html
<gumga-file-upload
  attribute="{Objet}"
  accepted="{String}"
  max-size="{Integer}"
  upload-method="{Function}"
  delete-method="{Function}">
</gumga-file-upload>
```
