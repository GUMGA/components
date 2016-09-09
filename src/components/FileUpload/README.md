# Directive - gumgaFileUpload

### Descrição
O componente gumgaFileUpload pode ser utilizado para fazer upload de arquivos. O framework GUMGA usa um método de upload de imagens que faz o upload do arquivo para uma pasta temporária e retorna um token. Quando o registro é salvo, o framework gumga faz o bind da string que está no atributo com o arquivo temporário.


### Atributos
Parametro               | Tipo       | Detalhe
---                     | ---        | ---
**attribute**           | `Object`   | Objeto que irá conter as informações do arquivo.
**accepted**            | `String`   | Formatos (extensões) aceitos para upload, separados por vírgula. *A verificação é feita via mimetype.*
**max-size**            | `Integer`  | Tamanho máximo em KB aceito por arquivo.
**on-upload-start**     | `Function` | Função que será disparada quando o upload iniciar. 
**on-upload-complete**  | `Function` | Função que será disparada quando o upload terminar.
**on-upload-abort**     | `Function` | Função que será disparada se o upload for abortado.
**on-upload-error**     | `Function` | Função que será disparada se houver algum erro.
**delete-method**       | `Function` | Função que será executada para deletar a imagem do espaço temporário.

### Uso:
```html
<gumga-file-upload
  attribute="files"
  accepted="jpeg,zip,rar,deb"
  max-size="1024"
  on-upload-start="uploadStart()"
  on-upload-complete="uploadComplete(e)"
  on-upload-abort="uploadAbort(e)"
  on-upload-error="uploadError(e)"
  delete-method="remove()">
</gumga-file-upload>
```

**Importante:** Caso tenha problemas com tipos jpg, coloque no atributo accept "*jpeg*".

```javascript
$scope.uploadStart = function() {}
$scope.uploadComplete = function(e) {}
$scope.uploadAbort = function(e) {}
$scope.uploadError = function(e) {}
```