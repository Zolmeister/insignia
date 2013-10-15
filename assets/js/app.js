'use strict';


// Declare app level module which depends on filters, and services
angular.module('showcase', [
  'ngRoute',
  'ngAnimate',
  'ui.router',
  'MD5.service', 
  'gravatar.directive',
  'showcase.filters',
  'showcase.services',
  'showcase.directives',
  'showcase.controllers'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  
  $stateProvider
    .state('projectList', {
      url: '/',
      templateUrl: 'partials/projects.html',
      controller: 'ProjectsCtrl'
    })
    .state('project', {
      url: '/project/:title',
      templateUrl: 'partials/project-view.html',
      controller: 'ProjectViewCtrl'
    })
  
  /*$routeProvider.when('/', {
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsCtrl'
  }).when('/project/:title', {
    templateUrl: 'partials/project-view.html',
    controller: 'ProjectViewCtrl'
  }).otherwise({redirectTo: '/'});*/
}])
