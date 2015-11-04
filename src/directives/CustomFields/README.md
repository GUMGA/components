# Directive - gumgaCustomFields

### Descrição
O componente **gumgaCustomFields** permite que o próprio usuário ou implantador adicione atributos dos tipos texto, lógico, numérico, data e seleção em classes previamente selecionadas pelo desenvolvedor. As customizações respeitam o Multitenacy e armazenam o dados em tabelas específicas.

*Nota: Como se trata de um componente específico, este é acoplado ao framework backend da Gumga, que ainda não é open-source.*

### Atributos

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **fields** | `Object` | Objeto JSON retornado pelo backend para renderização dos atributos genéricos |

### Uso:
```html
<gumga-custom-fields fields="custom"></gumga-custom-fields>
```

#### Exemplo de JSON retornado do backend
```js
$scope.custom = {
  "id":null,
  "oi":null,
  "gumgaCustomFields":{
    "tamanho":{
      "id":null,
      "oi":null,
      "field":{
        "id":2,
        "oi":null,
        "clazz":"br.com.empresa.piloto.domain.model.Marca",
        "name":"tamanho",
        "description":"Custom Number Field","active":true,
        "type":"NUMBER",
        "validationDescription":"Not empty"
        ,"validationScript":"true",
        "defaultValueScript":"13 / 2",
        "options":"",
        "visualizationOrder":2,
        "fieldGroup":"MAIN_FIELDS",
        "translateKey":"marca.tamanho"
      },
      "gumgaModelId":null,
      "textValue":null,
      "numberValue":6.5,
      "dateValue":null,
      "logicValue":null
    },
    "inicio":{
      "id":null,
      "oi":null,
      "field":{
        "id":4,
        "oi":null,
        "clazz":"br.com.empresa.piloto.domain.model.Marca",
        "name":"inicio",
        "description":"Custom Date Field","active":true,
        "type":"DATE",
        "validationDescription":"Not empty",
        "validationScript":"true",
        "defaultValueScript":"new Date()",
        "options":"",
        "visualizationOrder":0.0,
        "fieldGroup":"MAIN_FIELDS",
        "translateKey":"marca.inicio"
      },
      "gumgaModelId":null,
      "textValue":null,
      "numberValue":null,
      "dateValue":"2015-11-03T11:26:13Z",
      "logicValue":null
    },
  },
  "version":null,
  "nome":null,
  "location":null
};
```
