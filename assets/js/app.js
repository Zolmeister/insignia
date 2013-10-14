'use strict';


// Declare app level module which depends on filters, and services
angular.module('showcase', [
  'ngRoute',
  'ngAnimate',
  'showcase.filters',
  'showcase.services',
  'showcase.directives',
  'showcase.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsCtrl'
  }).when('/project/:title', {
    templateUrl: 'partials/project-view.html',
    controller: 'ProjectViewCtrl'
  }).otherwise({redirectTo: '/'});
}]);
