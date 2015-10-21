(function(){
  'use strict';
  
  Mask.$inject = ['$parse'];

  function Mask($parse) {
    function isFocused (elem) {
      return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
    }

    return {
      priority: 100,
      require: 'ngModel',
      restrict: 'A',
      scope: false,
      compile: function gumgaMaskCompilingFunction() {
        var options = {
          maskDefinitions: {
            // Numéricos
            '9': /\d/,
            // Alfa
            'A': /[a-zA-Z]/,
            // Alfanuméricos
            '*': /[a-zA-Z0-9]/
          },
          // Se true, limpa o campo caso inválido no evento onBlur
          clearOnBlur: true,
          // Eventos para processamento
          eventsToHandle: ['input', 'keyup', 'click', 'focus']
        };

        return function gumgaMaskLinkingFunction(scope, elm, attrs, ctrl) {
          var maskProcessed = false, eventsBound = false,
          maskCaretMap, maskPatterns, maskPlaceholder, maskComponents,
          minRequiredLength,
          value, valueMasked, isValid,
          originalPlaceholder = attrs.placeholder,
          originalMaxlength = attrs.maxlength,
          // // Variáveis usadas exclusivamente para eventos
          oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength;

          function initialize(maskAttr) {
            if (!angular.isDefined(maskAttr)) {
              return uninitialize();
            }
            processRawMask(maskAttr);
            if (!maskProcessed) {
              return uninitialize();
            }
            initializeElement();
            bindEventListeners();
            return true;
          }

          function initPlaceholder(placeholderAttr) {
            if (!placeholderAttr) {
              return;
            }

            maskPlaceholder = placeholderAttr;
            // Atualizamos o valor do input
            if (maskProcessed) {
              elm.val(maskValue(unmaskValue(elm.val())));
            }
          }

          function formatter(fromModelValue) {
            if (!maskProcessed) {
              return fromModelValue;
            }
            value = unmaskValue(fromModelValue || '');
            isValid = validateValue(value);
            ctrl.$setValidity('mask', isValid);
            return isValid && value.length ? maskValue(value) : undefined;
          }

          function parser(fromViewValue) {
            if (!maskProcessed) {
              return fromViewValue;
            }
            value = unmaskValue(fromViewValue || '');
            isValid = validateValue(value);
            ctrl.$viewValue = value.length ? maskValue(value) : '';
            ctrl.$setValidity('mask', isValid);
            if (value === '' && attrs.required) {
              ctrl.$setValidity('required', !ctrl.$error.required);
            }
            return isValid ? value : undefined;
          }

          var linkOptions = options;

          if (attrs.gumgaMaskOptions) {
            linkOptions = scope.$eval(attrs.gumgaMaskOptions);
            if (angular.isObject(linkOptions)) {
              linkOptions = (function(original, current) {
                for (var i in original) {
                  if (Object.prototype.hasOwnProperty.call(original, i)) {
                    if (current[i] === undefined) {
                      current[i] = angular.copy(original[i]);
                    } else {
                      angular.extend(current[i], original[i]);
                    }
                  }
                }
                return current;
              })(options, linkOptions);
            }
          } else {
            linkOptions = options;
          }

          attrs.$observe('gumgaMask', initialize);
          if (angular.isDefined(attrs.gumgaMaskPlaceholder)) {
            attrs.$observe('gumgaMaskPlaceholder', initPlaceholder);
          }
          else {
            attrs.$observe('placeholder', initPlaceholder);
          }
          var modelViewValue = false;
          attrs.$observe('modelViewValue', function(val) {
            if (val === 'true') {
              modelViewValue = true;
            }
          });
          scope.$watch(attrs.ngModel, function(val) {
            if (modelViewValue && val) {
              var model = $parse(attrs.ngModel);
              model.assign(scope, ctrl.$viewValue);
            }
          });
          ctrl.$formatters.push(formatter);
          ctrl.$parsers.push(parser);

          function uninitialize() {
            maskProcessed = false;
            unbindEventListeners();

            if (angular.isDefined(originalPlaceholder)) {
              elm.attr('placeholder', originalPlaceholder);
            } else {
              elm.removeAttr('placeholder');
            }

            if (angular.isDefined(originalMaxlength)) {
              elm.attr('maxlength', originalMaxlength);
            } else {
              elm.removeAttr('maxlength');
            }

            elm.val(ctrl.$modelValue);
            ctrl.$viewValue = ctrl.$modelValue;
            return false;
          }

          function initializeElement() {
            value = oldValueUnmasked = unmaskValue(ctrl.$modelValue || '');
            valueMasked = oldValue = maskValue(value);
            isValid = validateValue(value);
            var viewValue = isValid && value.length ? valueMasked : '';
            if (attrs.maxlength) { // Double maxlength to allow pasting new val at end of mask
              elm.attr('maxlength', maskCaretMap[maskCaretMap.length - 1] * 2);
            }
            if ( ! originalPlaceholder) {
              elm.attr('placeholder', maskPlaceholder);
            }
            elm.val(viewValue);
            ctrl.$viewValue = viewValue;
            ctrl.$setValidity('mask', isValid);
            // Não usando $setViewValue, então não sobreescreve
            // o valor do model sem interação do usuário.
          }

          function bindEventListeners() {
            if (eventsBound) {
              return;
            }
            elm.bind('blur', blurHandler);
            elm.bind('mousedown mouseup', mouseDownUpHandler);
            elm.bind(linkOptions.eventsToHandle.join(' '), eventHandler);
            elm.bind('paste', onPasteHandler);
            eventsBound = true;
          }

          function unbindEventListeners() {
            if (!eventsBound) {
              return;
            }
            elm.unbind('blur', blurHandler);
            elm.unbind('mousedown', mouseDownUpHandler);
            elm.unbind('mouseup', mouseDownUpHandler);
            elm.unbind('input', eventHandler);
            elm.unbind('keyup', eventHandler);
            elm.unbind('click', eventHandler);
            elm.unbind('focus', eventHandler);
            elm.unbind('paste', onPasteHandler);
            eventsBound = false;
          }

          function validateValue(value) {
            // Valida o tamanho mínimo requerido da máscara
            return value.length ? value.length >= minRequiredLength : true;
          }

          // Remove máscara
          function unmaskValue(value) {
            var valueUnmasked = '',
            maskPatternsCopy = maskPatterns.slice();
            // Processo para retirar componentes do valor
            value = value.toString();
            angular.forEach(maskComponents, function(component) {
              value = value.replace(component, '');
            });
            angular.forEach(value.split(''), function(chr) {
              if (maskPatternsCopy.length && maskPatternsCopy[0].test(chr)) {
                valueUnmasked += chr;
                maskPatternsCopy.shift();
              }
            });
            return valueUnmasked;
          }

          // Adiciona máscara
          function maskValue(unmaskedValue) {
            var valueMasked = '',
            maskCaretMapCopy = maskCaretMap.slice();

            angular.forEach(maskPlaceholder.split(''), function(chr, i) {
              if (unmaskedValue.length && i === maskCaretMapCopy[0]) {
                valueMasked += unmaskedValue.charAt(0) || '_';
                unmaskedValue = unmaskedValue.substr(1);
                maskCaretMapCopy.shift();
              }
              else {
                valueMasked += chr;
              }
            });
            return valueMasked;
          }

          // O atributo padrão placeholder funciona normalmente,
          // o atributo gumgaMaskPlaceholder define a máscara com o placeholder
          // e deve atender a quantidade de caracteres da máscara.
          function getPlaceholderChar(i) {
            var placeholder = angular.isDefined(attrs.gumgaMaskPlaceholder) ? attrs.gumgaMaskPlaceholder : attrs.placeholder;

            if (typeof placeholder !== 'undefined' && placeholder[i]) {
              return placeholder[i];
            } else {
              return '_';
            }
          }

          function getMaskComponents() {
            return maskPlaceholder.replace(/[_]+/g, '_').replace(/([^_]+)([a-zA-Z0-9])([^_])/g, '$1$2_$3').split('_');
          }

          function processRawMask(mask) {
            var characterCount = 0;

            maskCaretMap = [];
            maskPatterns = [];
            maskPlaceholder = '';

            if (typeof mask === 'string') {
              minRequiredLength = 0;

              var isOptional = false,
              numberOfOptionalCharacters = 0,
              splitMask = mask.split('');

              angular.forEach(splitMask, function(chr, i) {
                if (linkOptions.maskDefinitions[chr]) {

                  maskCaretMap.push(characterCount);

                  maskPlaceholder += getPlaceholderChar(i - numberOfOptionalCharacters);
                  maskPatterns.push(linkOptions.maskDefinitions[chr]);

                  characterCount++;
                  if (!isOptional) {
                    minRequiredLength++;
                  }
                }
                else if (chr === '?') {
                  isOptional = true;
                  numberOfOptionalCharacters++;
                }
                else {
                  maskPlaceholder += chr;
                  characterCount++;
                }
              });
            }
            // Posição do cursor imediatamente após última posição válida
            maskCaretMap.push(maskCaretMap.slice().pop() + 1);

            maskComponents = getMaskComponents();
            maskProcessed = maskCaretMap.length > 1 ? true : false;
          }

          function blurHandler() {
            // Se clearOnBlur for true em options,
            // limpa o campo caso esteja inválido.
            if (linkOptions.clearOnBlur) {
              oldCaretPosition = 0;
              oldSelectionLength = 0;
              if (!isValid || value.length === 0) {
                valueMasked = '';
                elm.val('');
                scope.$apply(function() {
                  ctrl.$setViewValue('');
                });
              }
            }
          }

          function mouseDownUpHandler(e) {
            if (e.type === 'mousedown') {
              elm.bind('mouseout', mouseoutHandler);
            } else {
              elm.unbind('mouseout', mouseoutHandler);
            }
          }

          elm.bind('mousedown mouseup', mouseDownUpHandler);

          function mouseoutHandler() {
            /*jshint validthis: true */
            oldSelectionLength = getSelectionLength(this);
            elm.unbind('mouseout', mouseoutHandler);
          }

          function onPasteHandler() {
            /*jshint validthis: true */
            setCaretPosition(this, elm.val().length);
          }

          function eventHandler(e) {
            /*jshint validthis: true */
            e = e || {};
            // Permite uma minificação mais eficiente
            var eventWhich = e.which,
            eventType = e.type;

            if (eventWhich === 16 || eventWhich === 91) {
              return;
            }

            var val = elm.val(),
            valOld = oldValue,
            valMasked,
            valUnmasked = unmaskValue(val),
            valUnmaskedOld = oldValueUnmasked,
            caretPos = getCaretPosition(this) || 0,
            caretPosOld = oldCaretPosition || 0,
            caretPosDelta = caretPos - caretPosOld,
            caretPosMin = maskCaretMap[0],
            caretPosMax = maskCaretMap[valUnmasked.length] || maskCaretMap.slice().shift(),
            selectionLenOld = oldSelectionLength || 0,
            isSelected = getSelectionLength(this) > 0,
            wasSelected = selectionLenOld > 0,
            // Case: Digitando um caracter para substituir uma seleção
            isAddition = (val.length > valOld.length) || (selectionLenOld && val.length > valOld.length - selectionLenOld),
            // Case: Delete e backspace se comportam de forma idêntica em uma seleção
            isDeletion = (val.length < valOld.length) || (selectionLenOld && val.length === valOld.length - selectionLenOld),
            isSelection = (eventWhich >= 37 && eventWhich <= 40) && e.shiftKey, // Arrow key codes

            isKeyLeftArrow = eventWhich === 37,
            // Necessária devido ao evento não fornecer um keycode
            isKeyBackspace = eventWhich === 8 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === -1)),
            isKeyDelete = eventWhich === 46 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === 0) && !wasSelected),
            // Lida com casos onde acento circunflexo é movido e colocado na frente da posição maskCaretMap inválido.
            // Logic abaixo assegura que, ao clicar ou posicionamento acento circunflexo para a esquerda, acento
            // circunflexo é movido para a esquerda até à direita directamente de caráter não-máscara.
            // Também aplicado para clicar uma vez que os usuários são (discutivelmente) mais propensos a voltar
            // atrás com um personagem ao clicar dentro de uma entrada cheia.
            caretBumpBack = (isKeyLeftArrow || isKeyBackspace || eventType === 'click') && caretPos > caretPosMin;

            oldSelectionLength = getSelectionLength(this);

            // Eventos que não requerem nenhuma ação
            if (isSelection || (isSelected && (eventType === 'click' || eventType === 'keyup'))) {
              return;
            }

            // Controle de valores
            // ==============

            // User attempted to delete but raw value was unaffected--correct this grievous offense
            // O usuário tentou apagar, mas valor bruto não foi afetado - corrigir este grave ofensa
            if ((eventType === 'input') && isDeletion && !wasSelected && valUnmasked === valUnmaskedOld) {
              while (isKeyBackspace && caretPos > caretPosMin && !isValidCaretPosition(caretPos)) {
                caretPos--;
              }
              while (isKeyDelete && caretPos < caretPosMax && maskCaretMap.indexOf(caretPos) === -1) {
                caretPos++;
              }
              var charIndex = maskCaretMap.indexOf(caretPos);
              // Strip out non-mask character that user would have deleted if mask hadn't been in the way.
              valUnmasked = valUnmasked.substring(0, charIndex) + valUnmasked.substring(charIndex + 1);
            }

            // Atualiza valor
            valMasked = maskValue(valUnmasked);

            oldValue = valMasked;
            oldValueUnmasked = valUnmasked;
            elm.val(valMasked);
            ctrl.$setViewValue(valUnmasked);

            // Posição do cursor
            // ===================

            // Caractere digitado a frente nos casos em que o primeiro caractere de entrada é um char máscara e o cursor
            // for colocado na posição 0.
            if (isAddition && (caretPos <= caretPosMin)) {
              caretPos = caretPosMin + 1;
            }

            if (caretBumpBack) {
              caretPos--;
            }

            caretPos = caretPos > caretPosMax ? caretPosMax : caretPos < caretPosMin ? caretPosMin : caretPos;

            while (!isValidCaretPosition(caretPos) && caretPos > caretPosMin && caretPos < caretPosMax) {
              caretPos += caretBumpBack ? -1 : 1;
            }

            if ((caretBumpBack && caretPos < caretPosMax) || (isAddition && !isValidCaretPosition(caretPosOld))) {
              caretPos++;
            }
            oldCaretPosition = caretPos;
            setCaretPosition(this, caretPos);
          }

          function isValidCaretPosition(pos) {
            return maskCaretMap.indexOf(pos) > -1;
          }

          function getCaretPosition(input) {
            if (!input)
            return 0;
            if (input.selectionStart !== undefined) {
              return input.selectionStart;
            } else if (document.selection) {
              if (isFocused(elm[0])) {
                // Maldito seja o IE
                input.focus();
                var selection = document.selection.createRange();
                selection.moveStart('character', input.value ? -input.value.length : 0);
                return selection.text.length;
              }
            }
            return 0;
          }

          function setCaretPosition(input, pos) {
            if (!input)
            return 0;
            if (input.offsetWidth === 0 || input.offsetHeight === 0) {
              return; // Inputs escondidos
            }
            if (input.setSelectionRange) {
              if (isFocused(elm[0])) {
                input.focus();
                input.setSelectionRange(pos, pos);
              }
            }
            else if (input.createTextRange) {
              // Maldito seja o IE
              var range = input.createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          }

          function getSelectionLength(input) {
            if (!input)
            return 0;
            if (input.selectionStart !== undefined) {
              return (input.selectionEnd - input.selectionStart);
            }
            if (document.selection) {
              return (document.selection.createRange().text.length);
            }
            return 0;
          }
        }
      }
    }
  }
  angular.module('gumga.directives.mask', [])
  .directive('gumgaMask', Mask);
})();
