(function(){
  'use strict';

  Utils.$inject = [];

  function Utils(){
    return {
      areNotEqualInArray: function (array, index) {
        var aux = array.filter(function (element) {
          return element == index;
        });
        return (aux.length < 1);
      },
      camelCase: function (string) {
        return string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
      },
      objInArray: function (array, field) {
        var arrayAux = array.filter(function (obj) {
          return obj.field == field;
        });
        return arrayAux.length > 0;
      },
      checkIndex: function (array, txt) {
        var flag = -1;
        array.forEach(function (obj, index) {
          if (obj.field == txt) {
            flag = index;
          }
        });
        return flag;
      },
      errorMessages: {
        max: "You've typed more than the maximum!",
        min: "You've typed less than the minimum!",
        req: "This field is required"
      }
    }
  }
  angular.module('gumga.services.utils',[])
  .factory('GumgaUtils',Utils);
})();
