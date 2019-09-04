'use strict';

describe('myApp.home module', function() {

  beforeEach(module('myApp.home'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var homeCtrl = $controller('homeCtrl');
      expect(homeCtrl).toBeDefined();
    }));

  });
});