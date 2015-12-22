# Directive - gumgaAlert

### Descrição
O service GumgaAlert é uma nova versão da directive {@link gumga.core:gumgaAlert} e é utilizado para criar notificações growl-like. Para utilizar o service, basta incluir GumgaAlert como dependência.

*Observação: Para utilização do service no config do módulo, utilizar `GumgaAlertProvider`*

### Métodos
O service GumgaAlert possui quatro métodos de criação de alerta, porém todos recebem o mesmo parâmetro. Foi optado por criar quatro métodos diferentes para aumentar a legibilidade.
- createWarningMessage(title,message,options)
- createDangerMessage(title,message,options)
- createSuccessMessage(title,message,options)
- createInfomessage(title,message,options)

### Atributos
Parametro | Tipo | Detalhe
--- | --- | ---
**title** | `String` |  Uma string que irá conter o título da mensagem que será criada.
**message** | `String` | Uma string que irá conter o corpo da mensagem que será criada.
**options** | `Object` | Um objeto com opções adicionais para o alerta. Como no exemplo abaixo.

```javascript
var config = {
  offset: 50, //Tamanho da distância entre o alerta e tela.
  timer: 100, //Tempo que irá demorar para a mensagem aparecer após
  delay: 3500,
  alowDismiss:true,
  animationEnter: 'animated bounceInRight',
  animationExit: 'animated bounceOutRight'
}
```
