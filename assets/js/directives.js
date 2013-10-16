'use strict';

/* Directives */


angular.module('showcase.directives', ['MD5.service'])
  .directive('autoScrollTo', function() {
    return function(scope, $el, attrs){
      if(attrs.autoScrollTo === 'true') {
        
        // calculate after all re-paints
        window.setTimeout(function(){
          $('html, body').animate({
              scrollTop: $el.offset().top
          }, 500);
        }, 0)
        
      }
    }
  })
  .directive('emailLink', function(){
    return {
      scope:{'emailLink':'@emailLink' },
      link: function(scope, $el, attrs) {
        scope.$watch('emailLink', function decodeEmail() {
          var email =  scope.emailLink
          if(!email || email === 'undefined') return
          $el.attr('href', 'mailto:' + email)
          $el.text(email)
        })
      }
    }
  })
  .directive('linkify', function(){
    return {
      scope:{'linkify':'@linkify' },
      link: function(scope, $el, attrs) {
        scope.$watch('linkify', function() {
          var link = scope.linkify
          if(!link || link === 'undefined') return
          $el.attr('href', link)
          $el.text(link)
        })
      }
    }
  })

angular.module('gravatar.directive', ['MD5.service'])
  .directive('gravatarImage', ['MD5', function(MD5) {
    return {
      scope:{'gravatarImage':'@gravatarImage' },
      link: function(scope, $el, attrs) {
        scope.$watch('gravatarImage', function() {
          var email = scope.gravatarImage
          if(!email || email === 'undefined') return
          $el.attr('src', 'https://gravatar.com/avatar/' + MD5(email) + '?s=150')
        })
      }
    }
  }])
