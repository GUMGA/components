describe("SERVICE: AddressService", function () {
  var AddressService;
  beforeEach(module('gumga.services.address'));

  beforeEach(inject(function (_GumgaAddressService_) {
    AddressService = _GumgaAddressService_;
  }))
  it('Should contain the right array in variable \'everyUf\'',function() {
      expect(AddressService.everyUf.length).toEqual(26);
  })
  it('Should contain the right array in variable \'everyLogradouro\'',function() {
    expect(AddressService.everyLogradouro.length).toEqual(44);
  })
  it('Should contain the right array in variable \'availableCountries\'',function () {
    expect(AddressService.availableCountries).toEqual(['Brasil']);
  })
  it('Should return the object formatted',function () {
    expect(AddressService.returnFormattedObject()).toEqual({
      zipCode : null,
      premisseType: null,
      premisse: null,
      number: null,
      information: null,
      neighbourhood: null,
      localization: null,
      state: null,
      country: null
    })
  })
});
