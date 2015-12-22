# Directive - gumgaAddress

### Uso:
```html
<gumga-address
  value="Object"
  name="String"
  title="String"
  country-state-city="Boolean"
  cep="Boolean"
  neighbourhood="Boolean"
  street="Boolean"
  street-number="Boolean"
  complement="Boolean"
  on-search-cep-start="Function"
  on-search-cep-success="Function"
  on-search-cep-error="Function">
</gumga-address>
```

### Descrição
O componente GumgaAddress recebe um objeto que será preenchido com o endereço, que pode ser pesquisado através do CEP (Utilizando um WebService GUMGA),
ou preenchido manualmente pelo usuário. Este objeto de entrada pode ser vazio ou preferivelmente no formato do objeto GUMGA. Além disso, o componente ainda possui um botão redireciona para o google maps para o endereço preenchido. Ele possui blocos de inputs, que são divididos da seguinte forma:

 - País, UF e Localidade
 - CEP
 - Bairro
 - Tipo logradouro, Logradouro, Número *ou*
 - Tipo logradouro, Logradouro
 - Complemento
 - Botão para Google Maps

### Atributos
| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **value** | `Object` | Atributo *obrigatório* que irá conter um objeto no qual os valores serão preenchidos. Caso o objeto seja vazio, o componente irá atribuir seus valores do mesmo jeito. |
| **name** | `String` | Atributo *obrigatório* que irá conter uma string que será utilizada pelo componente como identificador. Ele é necessário para caso seja instanciada duas directives no mesmo $scope. |
| **title** | `String` | Atributo opcional que irá conter uma string que será utilizada pelo componente como título no header do componente. |
| **cep** | `Boolean` | Atributo opcional que irá conter um booleano que será utilizado para remover ou adicionar o bloco de CEP. |
| **street** | `Boolean` | Atributo opcional que irá conter um booleano que será utilizado para remover ou adicionar o bloco de Logradouro. |
| **street-number** | `Boolean` | Atributo opcional que irá conter um booleano que será utilizado para remover ou adicionar o bloco de Logradouro com Número. |
| **complement** | `Boolean` | Atributo opcional que irá conter um booleano que será utilizado para remover ou adicionar o bloco de complemento. |
| **neighbourhood** | `Boolean` | Atributo opcional que irá conter um booleano que será utilizado para remover ou adicionar o bloco de bairro. |
| **country-state-city** | `Boolean` | Atributo opcional que irá conter um booleano que será utilizado para remover ou adicionar o bloco para cidade, estado e país. |
| **maps** | `Boolean` | Atributo opcional que irá conter um booleano que será utilizado para remover ou adicionar um botão com link externo para o Google Maps do endereço referenciado. |
| **on-search-cep-start** | `Function` | Atributo opcional que irá conter uma função que será executa assim que a busca pelo CEP começar. **Requer uso do atributo cep.** |
| **on-search-cep-success** | `Function` | Atributo opcional que irá conter uma função que será executa assim que a busca pelo CEP retornar com sucesso. Para que o desenvolvedor possa ver o valor de retorno da função que busca o CEP, ele deve passar um parâmetro `$value` para a função que estará no atributo, como por exemplo: `on-search-cep-success="foo($value)"`. Além disso, este atributo **requer uso do atributo cep.**. |
| **on-search-cep-error** | `Function` | Atributo opcional que irá conter uma função que será executa assim que a busca pelo CEP retornar com erro. Para que o desenvolvedor possa ver o valor de retorno da função que busca o CEP, ele deve passar um parâmetro `$value` para a função que estará no atributo, como por exemplo: `on-search-cep-error="foo($value)"`. |
