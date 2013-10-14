'use strict';

/* Directives */


angular.module('showcase.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('autoScrollTo', function() {
    return function(scope, el, attrs){
      if(attrs.autoScrollTo === 'true') {
        $('html, body').animate({
            scrollTop: $(el[0]).offset().top
        }, 500);
      }
    }
  })
