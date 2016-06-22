# GumgaImageUpload

## Descrição
O componente gumgaImageUpload é utilizado para enviar imagens, também pode ser usado para recortar partes de uma imagem antes do envio


### Uso

```html
<gumga-image-upload
    images="images"
    accepted="png,jpg"
    result-image-size="640"
    crop="false"
    max-size="1024"
    max-files="2"
    upload-method="upload(image)"
    remove-method="remove()">
</gumga-image-upload>

```

#### Parâmetros

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **images** | `String` | Nome do atributo onde serão atribuídos a lista de imagens.
| **accepted** | `String` | Formatos aceitos, separados por virgula.
| **result-image-size** | `Integer` | Tamanho em pixels da imagem resultante do recorte.
| **max-size** | `Integer` | Tamanho máximo de cada arquivo, em Kbytes.
| **max-files** | `Integer` | Quantidade de arquivos que podem ser enviados.
| **upload-method** | `Function` | Atributo obrigatório que deve conter uma função de tratamento do upload da imagem, e essa imagem deve ser retornado na resposta.
| **on-upload-success** | `Function` | Atributo opcional que deve conter uma função, que será executada quando o upload for concluído.
| **on-upload-error** | `Function` | Atributo opcional que deve conter uma função, que será executada caso ocorra um erro no upload.
| **remove-method** | `Function` | Atributo obrigatório que deve conter uma função para remover a imagem, caso o retorno seja OK, a imagem é removida da lista, e se ainda houver uma função no atributo on-remove-success, é retornado a resposta e o index da imagem na lista.
| **on-remove-success** | `Function` | Atributo opcional que deve conter uma função, que será executada quando a imagem for removida for concluído.
| **on-remove-error** | `Function` | Atributo opcional que deve conter uma função, que será executada caso ocorra um erro no upload.

