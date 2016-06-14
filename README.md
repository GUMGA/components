[![Stories in Ready](https://badge.waffle.io/GUMGA/components.png?label=ready&title=Ready)](https://waffle.io/GUMGA/components)
# Gumga Components

Os componentes da Gumga que estão neste repositório são os componentes utilizados no GumgaFramework.

## Pré-requisitos

- AngularJS
- Angular UI Bootstrap
- ngImgCrop (A partir da versão 3.0.0 deve-se adicionar dependências da lib ng-img-crop ao projeto, esta lib é usada no componente GumgaImageUpload, caso esteja usando a versão 2.11.6 e ocorra erro na injeção de dependência, também adicione a lib ng-img-crop ao projeto).



## Instalação:

`
bower install gumga-components
`

## Documentação:

A documentação dos componentes pode ser visualizada diretamente na pasta dos componentes, ou através dos seguintes links:

### Components
- [Confirm](src/components/Confirm)
- [FileUpload](src/components/FileUpload)
- [Query](src/components/Query)
- [Filter](src/components/Filter)
- [FormButtons](src/components/FormButtons)
- [List](src/components/List)
- [ManyToMany](src/components/ManyToMany)
- [ManyToOne](src/components/ManyToOne)
- [Number](src/components/Number)


### Filters

- [Translate](src/components/TranslateFilter)


### Directives

- [Address](src/directives/Address)
- [Alert](src/directives/Alert)
- [Breadcrumb](src/directives/Breadcrumb)
- [Counter](src/directives/Counter)
- [Confirm](src/components/Confirm)
- [CustomFields](src/directives/CustomFields)
- [Form](src/directives/Form)
- [Filter](src/directives/Filter)
- [Error](src/directives/Form/Error)
- [Errors](src/directives/Form/Errors)
- [Form](src/directives/Form/Form)
- [Max](src/directives/Form/Max)
- [Min](src/directives/Form/Min)
- [Pattern](src/directives/Form/Pattern)
- [Range](src/directives/Form/Range)
- [Required](src/directives/Form/Required)
- [Validate](src/directives/Form/Validate)
- [FormButtons](src/directives/FormButtons)
- [List](src/components/List)
- [Login](src/directives/Login)
- [ManyToMany](src/directives/ManyToMany)
- [ManyToOne](src/directives/ManyToOne)
- [Mask](src/directives/Mask)
- [Menu](src/directives/Menu)
- [Nav](src/directives/Nav)
- [OneToMany](src/directives/OneToMany)
- [Password](src/directives/Password)
- [Query](src/directives/Query)
- [Search](src/directives/Search)
- [Table](src/directives/Table)
- [Tag](src/componentes/Tag)
- [Translate](src/directives/Translate)
- [Upload](src/directives/Upload)

---

### Services

- [AddressService](src/services/AddressService)
- [Alert](src/services/Alert)
- [Base](src/services/Base)
- [Date](src/services/Date)
- [GumgaController](src/services/GumgaController)
- [Keyboard](src/services/Keyboard)
- [Notification](src/services/Notification)
- [PopulateProvider](src/services/PopulateProvider)
- [Rest](src/services/Rest)
- [Translate](src/services/Translate)
- [WebStorage](src/services/WebStorage)




#### Observação quanto ao uibDatepickerPopup


Para utilizar uma máscara junto ao uibDatepickerPopup, utilizamos a lib [vanilla-masker](https://github.com/BankFacil/vanilla-masker) para fazer a máscara e adicionamos um $delegate para alterar o componente, visto que ele é um componente externo a gumga.

```html
  <p class="input-group">
    <input type="text" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="date" is-open="isDatePickerOpen"/>
    <span class="input-group-btn">
      <button type="button" class="btn btn-default" ng-click="open()">
        <i class="glyphicon glyphicon-calendar"></i>
      </button>
    </span>
  </p>
```

```js
$scope.open = function() {
  $scope.isDatePickerOpen = !$scope.isDatePickerOpen;
};
```

Ao passar qual o valor requerido da máscara para o uib-datepicker-popup, ele irá adicionar a máscara a medida que o usuário digita o valor.
