# GumgaImageUpload

### Descrição


### Uso

```html
<gumga-image-upload
    images="images"
    accepted="png,jpg"
    result-image-size="640"
    max-size="1024"
    max-files="2"
    upload-method="upload(image)"
    remove-method="remove()">
</gumga-image-upload>

```


```
### Descrição
O componente gumgaImageUpload é utilizado para recortar e enviar fotos.

#### Parâmetros

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **images** | `String` | Nome do atributo onde serão atribuídos a lista de imagens.
| **accepted** | `String` | Formatos aceitos, separados por virgula.
| **result-image-size** | `Integer` | Tamanho em pixels da imagem resultante do recorte.
| **max-size** | `Integer` | Tamanho máximo de cada arquivo, em Kbytes.
| **max-files** | `Integer` | Quantidade de arquivos que podem ser enviados
| **upload-method** | `Function` | ...
| **remove-method** | `Function` | ...

