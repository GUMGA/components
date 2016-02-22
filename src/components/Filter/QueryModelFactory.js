'use strict';

QueryModelFactory.$inject = [];

function QueryModelFactory(){

  function QueryModel(query = {}, active = true, initialState = 'NOTHING') {
    this.STATES = Object.freeze({
      NOTHING:                  1,  // 0000001
      ONLY_ATTRIBUTE:           2,  // 0000010
      ATTRIBUTE_AND_CONDITION:  4,  // 0000100
      EVERYTHING_NEEDED:        8,  // 0001000
      UPDATING_ATTRIBUTE:       16, // 0010000
      UPDATING_CONDITION:       32, // 0100000
      UPDATING_VALUE:           64  // 1000000
    })
    this.query                      = query
    this.active                     = active
    this.activeStates               = this.STATES[initialState]
  };

  // Functions

  QueryModel.prototype.addState = function (newState){
    this.activeStates |= this.STATES[newState]
    return this
  }
  QueryModel.prototype.removeState = function (stateToRemove){
    this.activeStates &= ~this.STATES[stateToRemove]
    return this
  }

  // Checking Functions

  QueryModel.prototype.isNOTHING  =function(){
     return (this.activeStates & this.STATES['NOTHING']) != 0
   }
  QueryModel.prototype.isONLY_ATTRIBUTE = function(){
     return (this.activeStates & this.STATES['ONLY_ATTRIBUTE']) != 0
   }
  QueryModel.prototype.isATTRIBUTE_AND_CONDITION = function(){
     return (this.activeStates & this.STATES['ATTRIBUTE_AND_CONDITION']) != 0
   }
  QueryModel.prototype.isEVERYTHING_NEEDED = function(){
     return (this.activeStates & this.STATES['EVERYTHING_NEEDED']) != 0
   }
  QueryModel.prototype.isUPDATING_ATTRIBUTE = function(){
     return (this.activeStates & this.STATES['UPDATING_ATTRIBUTE']) != 0
   }
  QueryModel.prototype.isUPDATING_CONDITION = function(){
     return (this.activeStates & this.STATES['UPDATING_CONDITION']) != 0
   }
  QueryModel.prototype.isUPDATING_VALUE = function(){
     return (this.activeStates & this.STATES['UPDATING_VALUE']) != 0
   }

   QueryModel.prototype.isBeingUpdated = function(){
     return this.isUPDATING_VALUE()
   }

  return {
    create(...param) {
      return new QueryModel(...param);
    }
  }
}

angular.module('gumga.filter.querymodel', [])
  .factory('QueryModelFactory', QueryModelFactory);
