(function() {
  'use strict'

  BrowseRecords.$inject = []

  function BrowseRecords(){
    this.records = []
    this.setRecords = setRecords
    this.getRecords = getRecords
    this.setCurrent = setCurrent
    this.getCurrent = getCurrent
    this.getPosition = getPosition
    this.getPrev = getPrev
    this.getNext = getNext
    this.setPage = setPage
    this.getPage = getPage
    this.reset = reset
    this.prev = 0
    this.current = 0
    this.next = 0
    this.page = 1
    function setRecords(rows, identifier) {
      rows.map(row => this.records.push(row[identifier]))
    }
    function getRecords() {
      return this.records
    }
    function setCurrent(id) {
      if (typeof id !== 'number') id = parseInt(id)
      let pos = this.records.indexOf(parseInt(id))
      if (pos > -1) {
        this.current = id
      }
    }
    function getCurrent() {
      return this.current
    }
    function getPosition() {
      if (!this.current) {
        console.error('Current position is undefined.')
        return false
      }
      let position = this.records.indexOf(this.current)
      if (position === -1) {
        console.error('Current position not found.')
        return false
      }
      return position
    }
    function getPrev() {
      let position = this.getPosition()
      return (position) ? this.records[position - 1] : false
    }
    function getNext() {
      let position = this.getPosition()
      return (position) ? this.records[position + 1] : false
    }
    function setPage(page) {
      this.page = page
    }
    function getPage() {
      return this.page
    }
    function reset() {
      this.records = []
      this.prev = 0
      this.current = 0
      this.next = 0
      this.page = 1
    }
  }
	angular.module('gumga.services.browserecords',[])
	.service('GumgaBrowseRecords',BrowseRecords);
})();
