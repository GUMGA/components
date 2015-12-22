# Directive - gumgaForm

### Uso:
  ```html
  <form gumga-form></form>
  ```
### Descrição
A directive gumgaForm é utilizada em conjunto com as directives de validação de input. Ela contém funções que serão usadas para manipular o formulário. Ela expõe no $scope um objeto GumgaForm para agrupar as funções em um lugar só.

#### Como utilizar
O componente GumgaForm deve ser incluído no elemento form, que necessita ter um atributo name. É necessário também que os inputs que serão utilizados tenham um atributo name, pois o controle deles é feito a partir deste atributo.

#### Métodos

`$scope.GumgaForm.getMessages(name,error)`
O método `getMessages` aceita dois parâmetros name e error, onde name é o nome do input que desejada recuperar a mensagem e o erro. Caso o parâmetro error não seja passado, é retornado o objeto com todas as mensagens do campo.

##### Parâmetros
 - **`String`** **`name`:** String que terá o nome do input para retornar os errors. Para adicionar a função, coloque o nome da função e o valor dele como `true`
 - **`String`** **`error`:** String que será terá o nome do erro que será retornado. Caso não seja passado este parâmetro, será retornado um objeto com todos os erros.

##### Retorno
 - **`[Object|String]`:** String que conterá a mensagem de erro ou o objeto com todas as mensagens de erro.

---

`$scope.GumgaForm.changeMessage(name,error,message)`
O método `changeMessage` aceita três parâmetros, name,error e message, onde name é o nome do input que desejada recuperar a mensagem, error é qual erro que a mensagem será alterada e message qual será a nova mensagem.

##### Parâmetros
 - **`String`** **`name`:** String que terá o nome do input para retornar os errors. Para adicionar a função, coloque o nome da função e o valor dele como `true`
 - **`String`** **`error`:** String que será terá o nome do erro que será retornado. Caso não seja passado este parâmetro, será retornado um objeto com todos os erros.
 - **`String`** **`message`:** String que será usada como mensagem de erro para a directive.

##### Retorno
 - **`Boolean`:** `true` caso a mensagem tenha sido alterada, `false` caso não.

---

`$scope.GumgaForm.setFormValid()`
O método `setFormValid` é utilizado para limpar todos os erros que estiverem ativos no formulário. Ele percorre o objeto de erro que o AngularJS cria automaticamente e valida todos os campos que estiverem com erro.

---

`$scope.GumgaForm.setFormPristine()`
O método setFormPristine é utilizado para colocar todos os campos em um estado de $pristine, ou seja, quando ainda não foram atualizados pelo usuário.

---

`$scope.GumgaForm.clearForm()`
O método `clearForm` é utilizado para limpar todos os campos do formulário e, além disso, colocar eles em um estado de `$pristine`.

---

`$scope.GumgaForm.getFormErrors()`
O método getFormErrors é utilizado para quando deseja-se obter todos os erros que estão presentes no formulário.

##### Retorno
 - **`Array`:** Lista que irá conter todos os erros que estão no formulário.
