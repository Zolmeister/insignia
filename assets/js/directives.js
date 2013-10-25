'use strict';

/* Directives */


angular.module('insignia.directives', ['MD5.service'])
  .directive('autoScrollTo', function($window) {
    return function(scope, $el, attrs){
      if(attrs.autoScrollTo === 'true') {
        
        // calculate after all re-paints
        window.setTimeout(function(){
          $('html, body').animate({
              scrollTop: $el.offset().top
          }, 500);
          $('body').css('min-height', $('.projects').offset().top + $('.projects').height()+'px')
        }, 100)
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
  .directive('sortable', function() {
    return function(scope, $el, attrs) {
    var startIndex = null, startType = null
    scope.$on('rebindsort', bindSort)
    
    function bindSort(){
       var projects = _.map($el.find('.project'), $)

       $el.sortable({
          items: '.project'
        }).unbind('sortupdate').bind('sortupdate', function(e, ui) {
          
          _.each(projects, function($proj) {
            var proj = _.find(scope.projects, function(proj){
              return $proj.attr('_id') === proj.id
            })
            
            proj.index = $proj.index()
            proj.displayType = $proj.parent().attr('type')
          })
          
          scope.$broadcast('sortupdate')
        })
        
     }
      
     window.setTimeout(bindSort, 100)
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
