# Directive - gumgaMimeTypeService

### Descrição
O service **GumgaMimeTypeService** é utilizado para listar e validar diferentes tipos de mídia.

### Métodos
Possui quatro métodos para listar, retornar e validar os tipos de mídia.

Método | Descrição
--- | ---
**getMimeTypes()** | Retorna um objeto (*JSON*) de mimetypes com suas respectivas listas (*array*) de possíveis extensões
**getExtensionsByMimeType(mimetype)** | Retorna uma lista (*array*) das possíveis extensões do mimetype.
**getExtensionByFileName(filename)** | Retorna a extensão (*string*), baseada no nome do arquivo.
**validate(mimetype, accepted)** | Retorna um *boolean* baseado no mimetype e um *array* de extensões válidas, ambos enviados via parâmetros

### Parâmetros
Parametro | Tipo | Detalhe
--- | --- | ---
**mimetype** | `String` | Uma `string` que irá conter o mimetype do arquivo.
**filename** | `String` | Uma `string` que irá conter o nome do arquivo para capturar sua extensão.
**accepted** | `Array` | Um `array` de extensões válidas para comparação com mimetype enviado.

