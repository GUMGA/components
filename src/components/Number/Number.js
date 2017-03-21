(function () {

    if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function (stringToFind, stringToReplace) {
            if (stringToFind === stringToReplace) return this;
            var temp = this;
            var index = temp.indexOf(stringToFind);
            while (index != -1) {
                temp = temp.replace(stringToFind, stringToReplace);
                index = temp.indexOf(stringToFind);
            }
            return temp;
        };
    }


    controller.$inject = ['$filter', '$locale'];

    function controller($filter, $locale) {
        this.intN = undefined;
        this.decN = undefined;
        this.posN = undefined;
        this.percent = false;
        this.$filter = $filter;
        this.$locale = $locale;
        var __this = this;
        this.extractDecimalPlacesFromString = function (num) {
            var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            if (!match) {
                return 0;
            }
            var nrDigitsRightDecimalPoint = (match[1] ? match[1].length : 0);
            var nrDigitsScientificNotation = (match[2] ? +match[2] : 0);
            return Math.max(0, nrDigitsRightDecimalPoint - nrDigitsScientificNotation);
        }

        this.fromUser = function (ngModel, text) {
            if (!text) return 0;
            if (text == '-' && !__this.posN) return 0;
            if (!angular.isString(text)) text = text.toString();
            var x = text.replaceAll(__this.$locale.NUMBER_FORMATS.GROUP_SEP, '');
            if (__this.intN) {
                var index = x.indexOf(__this.$locale.NUMBER_FORMATS.DECIMAL_SEP);
                var partInteger = x.substr(0, index === -1 ? x.length : index);
                if (partInteger && partInteger.length > __this.intN) {
                    x = partInteger.substr(0, __this.intN);
                    ngModel.$viewValue = x;
                    ngModel.$render();
                }
            }
            if (__this.decN == 0) {
                ngModel.$viewValue = x.replaceAll(__this.$locale.NUMBER_FORMATS.DECIMAL_SEP, '');
                ngModel.$render();
            }
            if (__this.decN) {
                var index = x.indexOf(__this.$locale.NUMBER_FORMATS.DECIMAL_SEP);
                if (index > 0 && x.length > index + __this.decN + 1) {
                    x = x.substr(0, index + __this.decN + 1);
                    ngModel.$viewValue = x;
                    ngModel.$render();
                }
            }
            if (__this.posN) {
                if (x.charAt(0) == '-') {
                    x = x.substring(1, x.length)
                    ngModel.$viewValue = x
                    ngModel.$render()
                }
            }
            var y = x.replaceAll(__this.$locale.NUMBER_FORMATS.DECIMAL_SEP, '.');
            var n = Number(y);
            if (__this.percent) n = n / 100;
            return n;
        }

        this.toUser = function (n, decimalPlaces) {
            if (__this.percent) n = n * 100;
            return __this.$filter('number')(n, decimalPlaces || __this.decN);
        }
    }

    function link(scope, element, attr, controllers) {
        var specialKeys = ['Backspace', 'Del', 'Home', 'Tab', 'Left', 'Right', 'Up', 'Down', 'End'];
        var ngModel = controllers[0];
        var numberCtrl = controllers[1];

        ngModel.$parsers.push(function (text) {

            return numberCtrl.fromUser(ngModel, text);
        });
        ngModel.$formatters.push(numberCtrl.toUser.bind(numberCtrl));

        element.bind('blur', function () {
            element.val(numberCtrl.toUser(ngModel.$modelValue));
        });

        element.bind('focus', function () {
            var n = ngModel.$modelValue;
            var decimalPlaces = numberCtrl.extractDecimalPlacesFromString(n);
            element.val(numberCtrl.toUser(n, decimalPlaces));
        });

        element.bind('keypress', function (ev) {
            if (ev.keyCode == 13) return true;
            if (specialKeys.indexOf(ev.key) >= 0) {
                return true;
            }
            var char = String.fromCharCode(ev.which);
            var currentValue = element.val();
            var numberFormat = numberCtrl.$locale.NUMBER_FORMATS;
            if (char == '-' && currentValue.length == 0) {
                return true;
            } else if (char == numberFormat.GROUP_SEP) {
                return false;
            } else if (char == numberFormat.DECIMAL_SEP) {
                return currentValue.indexOf(numberFormat.DECIMAL_SEP) < 0;
            } else {
                return /[\d]/g.test(char);
            }
        });
    }


    angular.module('gumga.number', [])
        .directive('gumgaNumber', function () {
            return {
                restrict: 'AC',
                require: ['ngModel', 'gumgaNumber'],
                controller: controller,
                controllerAs: 'numberCtrl',
                link: link
            };
        })
        .directive('integerPlaces', function () {
            return {
                restrict: 'A',
                require: 'gumgaNumber',
                link: function ($scope, $element, $attrs, numberCtrl) {
                    numberCtrl.intN = $scope.$eval($attrs.integerPlaces);
                }
            }
        })
        .directive('decimalPlaces', function () {
            return {
                restrict: 'A',
                require: 'gumgaNumber',
                link: function ($scope, $element, $attrs, numberCtrl) {
                    numberCtrl.decN = $scope.$eval($attrs.decimalPlaces);
                }
            }
        })
        .directive('positiveNumber', function () {
            return {
                restrict: 'A',
                require: 'gumgaNumber',
                link: function ($scope, $element, $attrs, numberCtrl) {
                    numberCtrl.posN = $scope.$eval($attrs.positiveNumber) || true;
                }
            }
        })
        .directive('percentNumber', function () {
            return {
                restrict: 'A',
                require: 'gumgaNumber',
                link: function ($scope, $element, $attrs, numberCtrl) {
                    numberCtrl.percent = true;
                }
            }
        })
        .directive('integerNumber', function () {
            return {
                restrict: 'AC',
                require: 'gumgaNumber',
                link: function ($scope, $element, $attrs, numberCtrl) {
                    numberCtrl.decN = 0;
                }
            }
        });
})();
