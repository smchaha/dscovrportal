'use strict';

describe('Directive: scatterPlot', function () {

  // load the directive's module
  beforeEach(module('dscovrDataApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scatter-plot></scatter-plot>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scatterPlot directive');
  }));
});
